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
  SendOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from 'moment';
import { useLocation } from "react-router-dom";
import { useProducts } from "./ProductContext";
import axios from "axios";
import PaymentModal from "../Payments/PaymentModal ";
const { TextArea } = Input;
const { Title, Text } = Typography;
const ShowProductDetails = () => {
  const { products, setProducts } = useProducts();
  const [form] = Form.useForm();
  const location = useLocation();
  const { product, id, index, uid } = location.state;
  const [bookingModal, setBookingModal] = useState(false);
  const [review, setReview] = useState("");
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
  const [sdate, setSDate] = useState("");
  const [edate, setEDate] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [starValue, setStarValue] = useState(0);

  const onChange = (newValue) => {
    setStarValue(newValue);
    console.log("Rated:", newValue);
  };
  // Function to handle payment success
  const handlePaymentSuccess = () => {
    console.log("Payment was successful!");
    setPaymentModalOpen(false); // Close the payment modal
  };

  const handleBookNow = () => {
    setTotalPrice(totalPrice); 
    setPaymentModalOpen(true); 
  };
  const calculatePrice = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const interval = endDate - startDate;
      const days = Math.ceil(interval / (1000 * 60 * 60 * 24)); 
      let additionalCost = 0;
      if (days === 0) {
        additionalCost = originalPrice; 
      } else if (days === 1) {
        additionalCost = 2 *originalPrice;
      } else {
        additionalCost = (days+1) * originalPrice;
      }
      setTotalPrice(additionalCost);
    }
    
  };
  const handleStartChange = (date) => {
    if (date) {
      setSDate(date.toLocaleString());
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
      setEDate(date.toLocaleString());
      const newEnd = date.valueOf();
      setEdt(newEnd);
      calculatePrice(sdt, newEnd); // Pass the current start date and new end date
    } else {
      setEdt(null);
      setTotalPrice(originalPrice); // Reset total price if date is cleared
    }
  };

  const handleSubmit = (values) => {
    product.booked = true;
    product.bookedby = uid;
    product.startdate = sdate;
    product.enddate = edate;
    handleBookNow();
  };

  const handleReviews = (product) => {
    if (!review) return message.warning("Input is required");
    if (starValue == 0 || !starValue)
      return message.warning("Rating also Required");
    const newReview = {
      rateby: uid,
      review,
      star: 3,
      date: new Date().toLocaleString(),
    };
    const data = products.map((prod) => {
      return {
        data:
          prod.id == products[index].id
            ? { ...prod.data, ...prod.data.ratings.push(newReview) }
            : prod.data,
        id,
      };
    });
    product.ratings.push(newReview);
    axios
      .post("http://localhost:5675/postreview", { ratings: newReview, id })
      .then((res) => {
        console.log(res.data);
        setProducts(data);
      });
    setReview("");
    setStarValue(0);
  };

  useEffect(() => {
    if (products[index]?.data?.booked) {
      setBookingModal(false);
    }
  }, [products[index]?.data?.booked]);

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
                <Descriptions.Item label="Nearby">
                  {product.specifications.nearby}
                </Descriptions.Item>
                <Descriptions.Item label="Squarefeet">
                  {product.specifications.squarefeet}
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {product.location.city}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {product.location.address}
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
            </Space>
          </Card>
        </div>
        <div className="mt-1">
          <h5>Reviews:</h5>
          <div
            className="p-3 w-25 justify-content-center"
            style={{
              borderRadius: "8px",
              backgroundColor: "#f7f7f7",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <TextArea
              onChange={(e) => setReview(e.target.value)}
              value={review}
              style={{
                minHeight: "60px",
                maxHeight: "100px",
                resize: "none",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                outline: "none",
                marginRight: "12px",
              }}
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Type your message..."
            />
            <div className="m-2">
              <Rate
                onChange={setStarValue}
                value={starValue}
                allowHalf
                style={{ marginBottom: "8px" }}
                className="me-5"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleReviews(product)}
                style={{ alignSelf: "flex-end" }}
              >
                Send
              </Button>
            </div>
          </div>
          <div
            style={{
              maxHeight: "200px",
              overflow: "scroll",
              overflowX: "hidden",
            }}
            className="d-flex flex-column gap-3 p-4"
          >
            {product.ratings && 
  product.ratings
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, most recent first
    .map((rating, index) => (
      <div className="border-bottom border-1 mb-3 pb-3" key={index}>
        <div className="d-flex align-items-start">
          <UserOutlined
            style={{ fontSize: "24px", color: "#1890ff" }} // Slightly larger icon with color
            className="border rounded-circle p-2"
          />
          <div className="ms-3">
            <strong className="d-block">{rating.rateby}</strong>
            <Rate
              allowHalf
              disabled
              value={rating.star}
              style={{ fontSize: "16px", color: "#fadb14" }} // Adjusted star color
            />
            &nbsp; &nbsp;
            <span className="text-muted" style={{ fontSize: "14px" }}>
              {new Date(rating.date).toLocaleDateString()} {/* Formatted date */}
            </span>
          </div>
        </div>
        <div className="ms-5 mt-2 text-muted" style={{ fontStyle: "italic" }}>
          {rating.review}
        </div>
      </div>
    ))}

          </div>
        </div>
      </div>
      <div className="d-flex mb-5 align-self-end gap-2 p-2">
        <Button>
          <HeartOutlined /> Wishlist
        </Button>
        <Button
          type="primary"
          onClick={() => !products[index].data.booked && setBookingModal(true)}
        >
          {products[index] && products[index].data.booked
            ? "Booked"
            : "Book Now"}
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
              disabledDate={(current) => current && current < moment().startOf('day')}
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
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
          </Form.Item>

          <Form.Item>Price: ${totalPrice && totalPrice}</Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Book
            </Button>
          </Form.Item>
        </Form>

        {paymentModalOpen && (
          <PaymentModal
            isOpen={paymentModalOpen}
            setPaymentModalOpen={setPaymentModalOpen}
            onRequestClose={(boolean) => setPaymentModalOpen(false)}
            totalPrice={totalPrice}
            product={product}
            products={products}
            setProducts={setProducts}
            uid={uid}
            id={id && id}
            index={index}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default ShowProductDetails;
