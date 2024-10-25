import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  DatePicker,
  Descriptions,
  Form,
  Image,
  Input,
  message,
  Modal,
  Rate,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  DollarOutlined,
  HeartOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
import { useLocation } from "react-router-dom";
const ShowProducts = () => {
  const location = useLocation();
  const { product, id, index,uid } = location.state;
  return (
    <div
      className="container d-flex flex-column justify-content-between"
      style={{ height: "100vh" }}
    >
      <div className="d-flex mt-3 gap-1 flex-column">
        <div className="d-flex">
          <Carousel
            arrows
            infinite={true}
            className="custom-carousel p-4 border border-1"
            style={{
              width: "400px",
              "--slick-active-dot-bg": "#000000",
              "--slick-dot-bg": "#ccc",
              "--slick-arrow-color": "#000000",
            }}
          >
            {product &&
              product.images.map((url, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <Image
                    src={url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={`Product image ${index + 1}`}
                  />
                </div>
              ))}
          </Carousel>

          <Card
            className="product-details flex-grow-1"
            style={{ height: "400px", overflow: "auto" }}
          >
            <Space>
              <DollarOutlined />
              <Text strong style={{ fontSize: "20px" }}>
                Price per day:
              </Text>
              <Text
                className="text-success"
                style={{ fontWeight: 700, fontSize: "20px" }}
              >
                ${product.price_per_day}
              </Text>
            </Space>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Descriptions title="Specifications" column={3} bordered>
                <Descriptions.Item label="Brand">
                  {product.specifications.brand}
                </Descriptions.Item>
                <Descriptions.Item label="Color">
                  {product.specifications.color}
                </Descriptions.Item>
                <Descriptions.Item label="Model">
                  {product.specifications.model}
                </Descriptions.Item>
                <Descriptions.Item label="Weight">
                  {product.specifications.weight + "kg"}
                </Descriptions.Item>
              </Descriptions>

              <div>
                <Title level={4}>Description</Title>
                <Text>{product.description}</Text>
              </div>

              <Space>
                <TagOutlined />
                <Text strong>Category:</Text>
                <Tag color="blue">{product.category}</Tag>
              </Space>

              <Space align="center">
                <Text strong>Overall Rating:</Text>
                <Rate allowHalf defaultValue={4.5} disabled />
                <Text>({"rating"})</Text>
              </Space>
            </Space>
          </Card>
        </div>
        <div className="mt-1">
          <h5>Reviews:</h5>
          <div
            style={{
              maxHeight: "200px",
              overflow: "scroll",
              overflowX: "hidden",
            }}
            className="d-flex flex-column gap-3 p-4"
          >
            {product.ratings &&
              product.ratings.map((rating, index) => {
                return (
                  <div className="border-bottom border-1" key={index}>
                    <div className="d-flex gap-1 align-items-center">
                      <UserOutlined
                        style={{ fontSize: "21px" }}
                        className="border rounded-5 p-3"
                      />{" "}
                      <div>
                        <strong className="me-2">{rating.rateby}</strong>
                        <Rate
                          allowHalf
                          disabled
                          value={rating.star}
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                    <div className="ms-5 mt-2 mb-2">{rating.review}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;
