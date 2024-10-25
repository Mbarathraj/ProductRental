import React, { useState } from 'react'
import { Avatar, Button, Card, message } from 'antd';
const { Meta } = Card;
import { EditOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import ShowProductDetails from './ShowProductDetails';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './ProductContext';
import axios from 'axios';
const OrdersCard = ({orders,setOrders,order,uid}) => {
    const navigate=useNavigate()
    const {products,setProducts}=useProducts()
    const handleCancel =()=>{
      console.log(order.id)
      axios.post("http://localhost:5675/toUnBook",{
        id:order.id,
        uid,
        product: order
      }).then((res)=>{
        if(res.data=="ok"){
          setProducts(products.map((product) => 
            product.id === order.id ? { ...product, ...product.data.booked= false} : product
          ));
          setOrders(orders.filter(ord=> ord.id!=order.id))
        message.success("Canceled")
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
      <div className='d-flex justify-content-center align-items-center' style={{width:"300px",height:"200px"}}>
      <img
        alt="example"
        src={order.images[0]}
        width={200}
      />
      </div>
    }
    actions={[
      <div className='d-flex align-items-center gap-3 ms-4'>
       <img src="https://cdn-icons-png.flaticon.com/128/567/567600.png" alt="" style={{width:"18px",height:"18px"}}/>
       ${order.price_per_day}
      </div>,
      <div style={{color:"red"}}
      onClick={handleCancel}
      >
        Cancel
      </div>

    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={order.specifications.brand}
      description={order.description}
    />
  </Card>
    </div>
  )
}

export default OrdersCard