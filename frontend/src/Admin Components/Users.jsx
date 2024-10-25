import React, { useEffect, useState } from 'react'
import {Empty, Input,Table} from "antd"
import UsersTable from './UsersTable';
import axios from 'axios';
const { Search } = Input;
const Users = () => {
    const [users,setUsers]=useState([])
    
  const [searchTerm,setSearchTerm]=useState("")
  useEffect(()=>{
    axios.post("http://localhost:5675/findrole",{role:"user"}).then((res)=>{
      setUsers(res.data)
    })
  },[])
     // Filter orders based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mt-5 ms-3">
    <div className="d-flex justify-content-between align-items-center">
      <h6>Users List</h6>
      <Search
        placeholder="Search by Name"
        style={{ width: 350 }}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
    </div>
    <div className="mt-3">
      <UsersTable users={filteredUsers.length > 0 ? filteredUsers : users} />
    </div>
  </div>
  )
}

export default Users