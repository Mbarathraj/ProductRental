import React, { useState } from 'react';
import { Avatar, Card, Tag } from 'antd';
const { Meta } = Card;
import { EditOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import ShowProductDetails from './ShowProductDetails';
import { useProducts } from './ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ index, product, id, uid }) => {
  const { products } = useProducts();
  const [wishlist, setWishList] = useState(false);
  const navigate = useNavigate();

  // Function to format the description
  const formatDescription = (description) => {
    const words = description.split(' ');
    return words.length >=7 ? words.slice(0, 7).join(' ') + '...' : description;
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <div className="d-flex justify-content-center align-items-center" style={{ width: "300px", height: "200px", overflow: "hidden" }}>
            <img
              alt="example"
              onClick={() => {
                navigate("/user/showproduct", {
                  state: {
                    product: product,
                    id: id,
                    uid,
                    index,
                  },
                });
              }}
              src={product.images[0]}
              style={{
                width: "100%", // Make image responsive
                height: "100%", // Set height to fill the container
                objectFit: "cover", // Maintain aspect ratio and cover the area
              }}
            />
          </div>
        }
        actions={[
          <>
            {wishlist ? (
              <HeartFilled onClick={() => setWishList(!wishlist)} />
            ) : (
              <HeartOutlined onClick={() => setWishList(!wishlist)} />
            )}
          </>,
          <div className="d-flex align-items-center gap-3 ms-4 text-success" style={{ fontWeight: "700" }}>
            ${product.price_per_day}
          </div>,
          <div>
            {products[index].data.booked ? "Booked" : "Not Yet"}
          </div>,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={product.name}
          description={formatDescription(product.description)}
        />
      </Card>
    </>
  );
};

export default ProductCard;
