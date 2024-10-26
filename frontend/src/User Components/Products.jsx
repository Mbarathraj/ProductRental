import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Input, Breadcrumb, Row, Col } from 'antd';
const { Search } = Input;
import { useProducts } from './ProductContext';

const Products = ({ uid }) => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on category
  const filteredProducts = products.filter(product => 
    product.data.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <Breadcrumb
          items={[
            { title: "Barath" },
            { title: "Home" }
          ]}
        />
        <Search
          placeholder="Search by category"
          style={{ width: 300 }}
          onChange={handleSearchChange}
          enterButton
        />
      </div>
      <div className="d-flex justify-content-center gap-5 flex-wrap">
        {filteredProducts.map((product, index) => (
          <div key={index}>
            <ProductCard 
              index={index} 
              product={product.data} 
              id={product.id} 
              uid={uid} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
