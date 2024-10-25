import React, { useState } from 'react'
import { Input, Breadcrumb } from 'antd';
import ProductCard from './ProductCard';
const { Search } = Input;
const Products = ({uid,products,setProducts}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on category
  const filteredProducts = products.filter(product => 
    product.data.category.toLowerCase().includes(searchTerm.toLowerCase())
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
    </div>
  )
}

export default Products