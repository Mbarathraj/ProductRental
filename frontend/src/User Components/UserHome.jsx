import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './Sidebar';
import "./UserHome.css"
import Products from './Products';
import UserDashboard from './UserDashboard';
import Orders from './Orders';
import { useLocation, useNavigate } from "react-router-dom";
const UserHome = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const [uid,setUid]=useState()
    useEffect(() => {
        const id = location.state;
        setUid(id) 
        if (id == null) {
            navigate("/");
        }
    }, [location.state, navigate]);
    const [active,setActive]=useState("home")
  return (
    <div className='d-flex flex-column justify-content-between userhome'>
        <div className='main'>
         {active== "home" && <Products uid={uid}/>}
         {active == "profile" && <UserDashboard uid={uid}/>}
         {active=="orders" && <Orders uid={uid}/>}
        </div>
        <Sidebar active={active} setActive={setActive} />
    </div>
  )
}

export default UserHome