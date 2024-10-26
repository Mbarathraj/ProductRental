import React, { useState } from "react";
import {
  HomeOutlined,
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
          style={{ color: active == "orders" ? "red" : "black" }}
          className="d-flex flex-column"
        >
          <div>
            <ShoppingCartOutlined
              style={{ fontSize: "20px", cursor: "pointer" }} onClick={()=> setActive("orders")}
            />
          </div>
          {active == "orders" && <h6>Bookings</h6>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
