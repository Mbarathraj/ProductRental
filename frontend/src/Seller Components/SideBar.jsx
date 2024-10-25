import React from 'react'
import {
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
const SideBar = ({ active, setActive }) => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div className="d-flex justify-content-around mb-2 p-1 w-25 rounded-pill nav-item mt-2"
      >
        <div
          style={{ color: active == "profile" ? "red" : "black" }}
          className="d-flex flex-column"
        >
          <div>
            <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }}  onClick={()=> setActive("profile")}/>
          </div>
          {active == "profile" && <h6>Profile</h6>}
        </div>
        <div
          style={{ color: active == "home" ? "red" : "black"}}
          className="d-flex flex-column"
        >
          <div>
            <HomeOutlined style={{ fontSize: "20px", cursor: "pointer" }}  onClick={()=> setActive("home")}/>
          </div>
          {active=="home" && <h6>Home</h6>}
        </div>
     
      </div>
    </div>
  )
}

export default SideBar