import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the ProductContext
const ProductContext = createContext();

// Create a Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5675/products").then((res)=>{
       setProducts(res.data)
    })
  },[]) 
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useProducts = () => useContext(ProductContext);
