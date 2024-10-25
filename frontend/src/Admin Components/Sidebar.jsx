import React from 'react'
import {
    HomeOutlined,
    IssuesCloseOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
const Sidebar = ({ active, setActive }) => {
  return (
    <div className="d-flex justify-content-center">
    <div className="d-flex justify-content-around mb-2 p-1 w-50 rounded-pill nav-item mt-2"
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
      <div
        style={{ color: active == "issues" ? "red" : "black" }}
        className="d-flex flex-column"
      >
        <div>
          <IssuesCloseOutlined
            style={{ fontSize: "20px", cursor: "pointer" }} onClick={()=> setActive("issues")}
          />
        </div>
        {active == "issues" && <h6>Issues</h6>}
      </div>
    </div>
  </div>
  )
}

export default Sidebar