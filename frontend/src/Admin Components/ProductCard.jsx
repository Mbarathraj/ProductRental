import React from "react";
import { Avatar, Card, Form, message, Modal, Tag } from "antd";
import {
    DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import axios from "axios";
const ProductCard = ({ index, product, id, uid, products, setProducts }) => {
    const handleDelete=(product)=>{
        console.log(product.id)
        axios.post("http://localhost:5675/admindelete",{id:product.id}).then(res =>{
            const update=products.filter((prod)=> prod.id!=product.id)
            setProducts(update)
            message.success("Deleted")
         })
    }
  return (
    <div>
      {product && (
        <Card
          style={{
            width: 300,
          }}
          cover={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "300px", height: "200px" }}
            >
              <img
                alt="example"
                src={product && product.data.images[0]}
                style={{
                  width: "100%", // Make image responsive
                  height: "100%", // Set height to fill the container
                  objectFit: "cover", // Maintain aspect ratio and cover the area
                }}
              />
            </div>
          }
          actions={[
            <div className="text-success" style={{ fontWeight: "700" }}>
              ${product.data.price_per_day}
            </div>,
            <div>
              <DeleteFilled
                onClick={() => handleDelete(product)}
                style={{ fontSize: "20px",color:"red" }}
              />
            </div>,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title={product.data.specifications.name}
            description={product.data.description}
          />
        </Card>
      )}
    </div>
  );
};

export default ProductCard;
