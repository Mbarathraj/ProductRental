import React, { useState } from "react";
import { Avatar, Card, Form, message, Modal, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import EditModal from "./EditModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const ProductCard = ({ index, product, id, uid, products, setProducts }) => {
  const navigate=useNavigate()
  const [showEditModal, setShowEditModal] = useState({});
  const handleEdit = (product) => {
    setShowEditModal({open:true, product});
  };
  const handleDelete=(product)=>{
    console.log(product)
    axios.post("http://localhost:5675/deleteproduct",{id:product.id}).then((res)=>{
      if(res.data=="ok"){
        message.success("Deleted")
        const data=products.filter((prod)=> prod.id!=product.id)
        setProducts(data)
      }
})
  }
  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "300px", height: "200px" }}
          >
            <img alt="example" src={product && product.images[0]} width={200}
             onClick={()=>{
              navigate("/seller/showproducts",{state:{
                product:product,
                id:id,
                uid,
                index
              }})}}
            />
          </div>
        }
        actions={[
          <div className="text-success" style={{ fontWeight: "700" }}>
            ${product.price_per_day}
          </div>,
          <div>
            <EditOutlined
              onClick={() => handleEdit(product)}
              style={{ fontSize: "20px" }}
            />
          </div>,
          <div>
            <DeleteOutlined
              onClick={() => handleDelete(product)}
              style={{ fontSize: "20px" }}
            />
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={product.specifications.brand}
          description={product.description}
        />
      </Card>
     <EditModal onCancel={()=>setShowEditModal({})} showEditModal={showEditModal} products={products} setProducts={setProducts}/>
    </div>
  );
};

export default ProductCard;
