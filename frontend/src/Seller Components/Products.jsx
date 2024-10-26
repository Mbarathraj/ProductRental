import React, { useEffect, useState } from 'react';
import { Input, Space, Breadcrumb } from 'antd';
import ProductCard from './ProductCard';
const { Search } = Input;
import { PlusCircleTwoTone } from '@ant-design/icons';
import AddModal from './AddModal';

const Products = ({ uid, products, setProducts }) => {
  const [showAddModal, setAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on category
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="m-2 d-flex justify-content-between">
        <div className="logo ms-5">
          <Breadcrumb
            items={[
              { title: "Barath" },
              { title: "Home" }
            ]}
          />
        </div>
        <Search
          placeholder="Search by category"
          style={{
            width: 350,
          }}
          onChange={handleSearchChange}
        />
      </div>
      <div
  className='ms-3 m-2 d-flex align-items-center gap-2 justify-content-end'
  onClick={() => setAddModal(true)}
  style={{
    width:"200px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#f0f8ff", // Light background
    borderRadius: "8px", // Rounded corners
    padding: "10px 15px", // Adequate padding
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
  }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")} // Hover effect
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f8ff")} // Reset on leave
>
  <strong style={{ color: "#007bff" }}>Add Property</strong> {/* Primary text color */}
  <PlusCircleTwoTone  style={{ fontSize: "24px", color: "#007bff" }} /> {/* Icon color */}
</div>
      <div className="d-flex gap-3 flex-wrap justify-content-center mt-2">
        {filteredProducts.map((product, index) => (
          <ProductCard 
            key={index} 
            index={index} 
            product={product} 
            id={product.id} 
            uid={uid} 
            products={products} 
            setProducts={setProducts} 
          />
        ))}
      </div>
      <AddModal 
        onCancel={() => {}} 
        showAddModal={showAddModal} 
        setAddModal={setAddModal} 
        uid={uid} 
        setProducts={setProducts} 
        products={products} 
      />
    </div>
  );
};

export default Products;
