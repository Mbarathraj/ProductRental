import React, { useEffect, useState } from 'react'
import {Empty, Input} from "antd"
import axios from 'axios';
import SellersTable from './SellersTable';
const { Search } = Input;
const Sellers = () => {
  const [sellers,setSellers]=useState([])
  const [searchTerm,setSearchTerm]=useState("")
  useEffect(()=>{
    axios.post("http://localhost:5675/findrole",{role:"seller"}).then((res)=>{
      setSellers(res.data)
    })
  },[])
  //Filter orders based on search term
  const filteredSeller = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mt-5 ms-3">
    <div className="d-flex justify-content-between align-items-center">
      <h6> Sellers List:</h6>
      <Search
        placeholder="Search by Name"
        style={{ width: 350 }}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
    </div>
    <div className="mt-3">
      <SellersTable sellers={filteredSeller.length > 0 ? filteredSeller : sellers} />
    </div>
  </div>
  )
}

export default Sellers
