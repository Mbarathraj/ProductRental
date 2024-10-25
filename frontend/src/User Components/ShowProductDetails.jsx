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
import { useLocation } from "react-router-dom";
import { useProducts } from './ProductContext';
import axios from "axios";
import PaymentModal from "../Payments/PaymentModal ";

const { Title, Text } = Typography;
const ShowProductDetails = () => {
  const {products,setProducts} = useProducts();
  const [form] = Form.useForm();
  const location = useLocation();
  const { product, id, index,uid } = location.state;
  const [bookingModal, setBookingModal] = useState(false);
  const originalPrice = product.price_per_day;
  const contentStyle = {
    margin: 0,
    height: "150px",
    color: "#000000",
    lineHeight: "160px",
    textAlign: "center",
    background: "#008000",
  };
  const [totalPrice, setTotalPrice] = useState(product.price_per_day);
  const [sdt, setSdt] = useState(null);
  const [edt, setEdt] = useState(null);
  const[sdate,setSDate]=useState("")
  const[edate,setEDate]=useState("")
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // Function to handle payment success
  const handlePaymentSuccess = () => {
    // Add logic to update your state or handle post-payment tasks
    console.log("Payment was successful!");
    setPaymentModalOpen(false); // Close the payment modal
    // You may also want to refresh the product details or update bookings here
  };

  const handleBookNow = () => {
    // Logic to calculate totalPrice based on the selected dates
    // For demonstration, setting a dummy value
    setTotalPrice(totalPrice); // Set the total price dynamically
    setPaymentModalOpen(true); // Open the payment modal
  };
  const calculatePrice = (start, end) => {
    if (start && end) {
      const interval = end - start;
      const additionalCost = Math.ceil(interval / (10000 * 60 * 60)) ; // $10 per hour
      setTotalPrice(originalPrice + additionalCost);
    }
  };
  const handleStartChange = (date) => {
    if (date) {
      setSDate(date.toLocaleString())
      const newStart = date.valueOf();
      setSdt(newStart);
      calculatePrice(newStart, edt); // Pass the new start date and current end date
    } else {
      setSdt(null);
      setTotalPrice(originalPrice); // Reset total price if date is cleared
    }
  };

  const handleEndChange = (date) => {
   
    if (date) {
      setEDate(date.toLocaleString())
      const newEnd = date.valueOf();
      setEdt(newEnd);
      calculatePrice(sdt, newEnd); // Pass the current start date and new end date
    } else {
      setEdt(null);
      setTotalPrice(originalPrice); // Reset total price if date is cleared
    }
  };

  console.log({paymentModalOpen})

  const handleSubmit = (values) => {
    product.booked=true
    product.bookedby=uid
    product.startdate=sdate
    product.enddate=edate
    handleBookNow()
  };
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
      <div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <Image 
          src={url} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
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
      <div className="d-flex mb-5 align-self-end gap-2 p-2">
        <Button>
          <HeartOutlined /> Wishlist
        </Button>
        <Button
          type="primary"
          onClick={() => ! products[index].data.booked && setBookingModal(true)}
        >
          {console.log(products[index])}
          { products[index] && products[index].data.booked ? "Booked" : "Book Now"}
        </Button>
      </div>
      <Modal
        centered
        open={bookingModal}
        onCancel={() => setBookingModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Start Date and Time"
            name="startDateTime"
            rules={[
              {
                required: true,
                message: "Please select the start date and time!",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="form-control"
              onChange={handleStartChange}
            />
          </Form.Item>

          <Form.Item
            label="End Date and Time"
            name="endDateTime"
            rules={[
              {
                required: true,
                message: "Please select the end date and time!",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="form-control"
              onChange={handleEndChange}
            />
          </Form.Item>

          <Form.Item>Price: ${ totalPrice && totalPrice}</Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Book
            </Button>
          </Form.Item>
        </Form>

{paymentModalOpen && (
        <PaymentModal
        isOpen={paymentModalOpen}
        setPaymentModalOpen={setPaymentModalOpen}
        onRequestClose={(boolean) => {
          setPaymentModalOpen(false)
          if(boolean) setBookingModal(false)
        }}
        totalPrice={totalPrice}
        product={product}
        products={products}
        setProducts={setProducts}
        uid={uid}
        id={id && id}
        index={index}
        setBookingModal={setBookingModal}
        onPaymentSuccess={handlePaymentSuccess}
      />)}
      </Modal>
    </div>
  );
};

export default ShowProductDetails;
