import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Products from "./Products";
import AdminDashboard from "./AdminDashboard";
import Issues from "./Issues";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./AdminHome.css"
const AdminHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [uid, setUid] = useState();
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("home");
  
  useEffect(() => {
    const id = location.state;
    console.log(id);
    if (id == null) {
      navigate("/");
    }
    axios
      .get("http://localhost:5675/products")
      .then((res) => setProducts(res.data));
  }, [location.state, navigate]);
  return (
    <div className=" d-flex flex-column justify-content-between adminhome">
      <div className="main">
        {active == "home" && (
          <Products uid={uid} products={products} setProducts={setProducts} />
        )}
        {active == "profile" && <AdminDashboard uid={uid} />}
        {active == "issues" && <Issues uid={uid} />}
      </div>
      <Sidebar active={active} setActive={setActive} />
    </div>
  );
};

export default AdminHome;
