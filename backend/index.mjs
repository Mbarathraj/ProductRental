import express, { raw } from "express";
import cors from "cors";
import multer from "multer";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDocs, collection, getFirestore, addDoc,query,doc,where, updateDoc, arrayUnion, getDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QDXE1B4RWPMVvRR9PqGd24dXSCLjG0COi0ehFAik2olQuf4D6Q8UGvE0vOXH4TSBuZuJOoSvnQD8A9oS9ks1SDw00jj4XUMzK');
const app = express();
app.use(cors());
const PORT = 5675;
app.use(express.json());

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg5WGdxCn3506DdfT7CDa-7W9QjWDGczA",
  authDomain: "product-rental.firebaseapp.com",
  projectId: "product-rental",
  storageBucket: "product-rental.appspot.com",
  messagingSenderId: "308148629040",
  appId: "1:308148629040:web:a1f1d871d5f51e28afc7f5",
  measurementId: "G-DX8MQ8W97L",
};

initializeApp(firebaseConfig);
const DB = getFirestore();
const userCollection = collection(DB, "users");
const productCollection = collection(DB, "products");
const auth = getAuth();

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const id = user.uid;
      console.log(id)
     const q= query(userCollection,where("uid","==",id)) 
     getDocs(q).then((snap)=>{
        const {role}=snap.docs[0].data()
        const id=snap.docs[0].id
        res.send({role,id})
     }).catch((err)=> res.send("no user"))
    })
    .catch((error) => {
      res.send("no user")
    });
});

app.post("/register", (req, res) => {
  const { email, password, name, role } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((res1) => {
      addDoc(userCollection, {
        email,
        password,
        name,
        role,
        uid: res1.user.uid,
      }).then((user) => {
        res.send("ok")});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

app.get("/products", (req, res) => {
  getDocs(productCollection).then((snap) => {
    const datas = snap.docs;
    const resData=datas.map((data)=> {
     return {
      "data": data.data(),
      "id":data.id
     }
    })
    res.send(resData)
  });
});
app.post("/admindelete",(req,res)=>{
  const {id} = req.body
  const docRef=doc(DB,"products",id)
  deleteDoc(docRef).then(()=> res.send("ok")).catch((err)=> res.send("error"))
})
app.post("/productsbyid", async(req, res) => {
  const { uid } = req.body; 
    if (uid) {
        try {
            const q = query(productCollection, where("sellerid", "==", uid)); // Use uid here
            const snap = await getDocs(q);
            const products = snap.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
            res.json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});

app.post("/editproduct",async(req,res)=>{
  const {id,data} =req.body
  console.log(id,data)
  try{
    const q=doc(DB,"products",id)
    updateDoc(q,{
      data
    }).then((s)=> res.send("ok"))
  }
  catch(error){
    console.log("error")
  }
})

app.post("/deleteproduct",(req,res)=>{
  console.log(req.body.id)
   const docRef=doc(DB,"products",req.body.id)
   deleteDoc(docRef).then(() => res.send("ok") )
})
app.post("/orders",(req,res)=>{
  const uid=req.body.uid
  console.log(uid)
  const docRef=doc(DB,"users",uid)
  getDoc(docRef).then((snap)=>{
    const {orders}=snap.data()
     res.send(orders)
  }).catch(err => console.log(err))
})

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
//   },
// });
// // Multer
// const upload = multer({ storage });

// // Define the POST route for /seller
// app.post('/seller', upload.array('images'), (req, res) => {
//   const files = req.files;
  
//   if (!files || files.length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   try {
//     // Handle the uploaded files
//     res.status(200).json({
//       message: 'Files uploaded successfully',
//       files: files.map(file => file.filename),
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).send('Error processing files');
//   }
// });

app.post("/toBook", async (req, res) => {
  const { id, uid ,product} = req.body;
  console.log(id,uid,product)
  try {
    console.log("User ID:", uid);
    // Update the product to mark it as booked
    const productDocRef = doc(DB, "products", id);
    await updateDoc(productDocRef, {
      booked: true
    });
    console.log("com[ldkjgfhggh")
    // Update the user's orders
    const userDocRef = doc(DB, "users", uid);
    product.id=id
    await updateDoc(userDocRef, {
      orders: arrayUnion(product)
    });
    res.send("ok");
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).send("Error processing request");
  }
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  console.log(req.body)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/payment-intent', async (req, res) => {
  const clientSecret="pi_3QDXgBB4RWPMVvRR0XeOuCVx_secret_xkrTvadrhESNUIHWtmuQE0nlQ"
  const paymentIntentId = clientSecret.split('_secret')[0]; // Get the ID before '_secret'

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.send(paymentIntent);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/addproduct",(req,res)=>{
  console.log(req.body.values)
  addDoc(productCollection,req.body.values).then(()=> res.send("ok"))
})

app.post("/toUnBook", async (req, res) => {
  const { id, uid ,product} = req.body;
  try {
    console.log("User ID:", uid);
    // Update the product to mark it as booked
    const productDocRef = doc(DB, "products", id);
    await updateDoc(productDocRef, {
      booked: false
    });
    // Update the user's orders
    const userDocRef = doc(DB, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const currentOrders = userDocSnap.data().orders || [];
      console.log(currentOrders)
      // Filter out the order that matches the name
      const updatedOrders = currentOrders.filter(order => order.id !== id);

      // Update the Firestore document with the new orders array
      await updateDoc(userDocRef, {
        orders: updatedOrders
      });

      console.log(`Removed order with name: ${id}`);
      res.send("ok");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).send("Error processing request");
  }
});


app.post("/findrole",async (req,res)=>{
    const q=query(userCollection,where("role","==",req.body.role))
    getDocs(q).then((snap)=> {
      const datas = snap.docs.map(data => {
       const {name,uid,role,email}= data.data()
       return {name,uid,role,email}
      });
      res.send(datas)
    })
})
const issueCollection=collection(DB,"issues")
app.post("/postissue",(req,res)=>{
     addDoc(issueCollection,req.body).then(()=> res.send("ok"))
})

app.get("/getissues",(req,res)=>{
  getDocs(issueCollection).then((snap)=>{
    const datas=snap.docs.map(doc => doc.data())
    res.send(datas)
  })
})
const paymentColletion=collection(DB,"payments")
app.post("/addpayment",(req,res)=>{
  addDoc(paymentColletion,req.body.paymentDetails).then(()=> res.send("ok")).catch(err => res.send("Error"))
})
app.listen(PORT, () => {
  console.log("Port is running on ", PORT);
});
