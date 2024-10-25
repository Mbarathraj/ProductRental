import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import SellerDashboard from './SellerDashboard';
import Products from './Products';
import SideBar from './SideBar';
import "./SellerHome.css"
import axios from 'axios';
const SellerHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products,setProducts]=useState([])
   
    const [uid,setUid]=useState()
    useEffect(() => {
        const id = location.state; // Assuming state contains the ID
        console.log(id);
        setUid(id) 
        // Check if id is null or undefined
        if (id == null) {
            navigate("/");
        }
        axios.post("http://localhost:5675/productsbyid",{uid})
      .then(res => setProducts(res.data))
    }, [location.state, navigate,uid]); 
    const [active,setActive]=useState("home")
  return (
    <div className=' d-flex flex-column justify-content-between sellerhome'>
    <div className='main'>
     {active== "home" && <Products uid={uid} products={products} setProducts={setProducts}/>}
     {active == "profile" && <SellerDashboard uid={uid} products={products}/>}
    </div>
    <SideBar active={active} setActive={setActive} />
</div>
  )
}

export default SellerHome