import React, { useState } from "react";
import { Avatar, Card, Form, message, Modal, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import EditModal from "./EditModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const ProductCard = ({ index, product, id, uid, products, setProducts }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState({});
  const handleEdit = (product) => {
    setShowEditModal({ open: true, product });
  };
  const handleDelete = (product) => {
    console.log(product);
    axios
      .post("http://localhost:5675/deleteproduct", { id: product.id })
      .then((res) => {
        if (res.data == "ok") {
          message.success("Deleted");
          const data = products.filter((prod) => prod.id != product.id);
          setProducts(data);
        }
      });
  };
  const formatDescription = (description) => {
    const words = description.split(" ");
    return words.length >= 7
      ? words.slice(0, 7).join(" ") + "..."
      : description;
  };
  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "300px", height: "200px", overflow: "hidden" }} // Add overflow hidden
          >
            <img
              alt="example"
              src={product && product.images[0]}
              style={{
                width: "100%", // Make image responsive
                height: "100%", // Set height to fill the container
                objectFit: "cover", // Maintain aspect ratio and cover the area
              }}
              onClick={() => {
                navigate("/seller/showproducts", {
                  state: {
                    product: product,
                    id: id,
                    uid,
                    index,
                  },
                });
              }}
            />
          </div>
        }
        actions={[
          <div className="text-success" style={{ fontWeight: "700" }}>
            ${product.price_per_day}
          </div>,
          <div>
            <EditOutlined
              onClick={() => handleEdit(product)}
              style={{ fontSize: "20px" }}
            />
          </div>,
          <div>
            <DeleteOutlined
              onClick={() => handleDelete(product)}
              style={{ fontSize: "20px" }}
            />
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={product.name}
          description={formatDescription(product.description)}
        />
      </Card>
      <EditModal
        onCancel={() => setShowEditModal({})}
        showEditModal={showEditModal}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default ProductCard;
