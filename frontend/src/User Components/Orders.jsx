import React, { useEffect, useState } from 'react'
import { Breadcrumb, Empty  } from 'antd';
import ProductCard from './ProductCard';
import OrdersCard from './OrdersCard';
import axios from 'axios';
const Orders = ({uid}) => {
  const[orders,setOrders] =useState([])
  useEffect(()=>{
    axios.post("http://localhost:5675/orders",{uid}).then((res)=>{
          setOrders(res.data)
    })
  },[])
  return (
    <div>
      <div className="logo ms-5 mt-2">
          <Breadcrumb
            items={[
                {title:"Barath"},
                {title:"Bookings"}
            ]}
          />
        </div>
        <div className='d-flex gap-3 flex-wrap m-3 justify-content-center '>
          {
           orders.length> 0 ? orders.map((order,index)=>{
              return <OrdersCard key={index} uid={uid} orders={orders} setOrders={setOrders} order={order}/>
            }):
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{fontSize:"20px"}} className='mt-5'/>
          }
        </div>
    </div>
  )
}

export default Orders