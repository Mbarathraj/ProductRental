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
      <div className='ms-3 m-2 d-flex align-items-center gap-2 justify-content-end' style={{ fontSize: "20px", cursor: "pointer" }}>
        <strong>Add Product</strong>
        <PlusCircleTwoTone onClick={() => setAddModal(true)} />
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
