import { Checkbox, message, Modal, Switch, Row, Col } from "antd";
import React, { useState } from "react";
import { Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { storage } from './firebase'; // Adjust the import based on your structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const { Option } = Select;

const AddModal = ({ showAddModal, setAddModal, uid, products, setProducts }) => {
  const [form] = Form.useForm();
  const [customCategory, setCustomCategory] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [other, setOther] = useState("");

  const handleCategoryChange = (value) => {
    if (value === "other") {
      setCustomCategory("other");
    } else {
      setCustomCategory(value);
    }
  };

  const handleFinish = async (values) => {
    values.sellerid = uid;
    values.bookedby = "";
    values.booked = false;
    values.ratings = [];

    const imageUrls = [];

    try {
      setLoading(true);

      for (const file of fileList) {
        const imageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(imageRef, file.originFileObj);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      values.images = imageUrls;

      const res = await axios.post("http://localhost:5675/addproduct", { values });

      if (res.data === "ok") {
        setProducts([...products, values]);
        message.success("Product added successfully!");
        setAddModal(false);
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      message.error("Failed to add product. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Add Product"
      open={showAddModal}
      width={1000}
      footer={false}
      onCancel={() => setAddModal(false)}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Property Name"
          rules={[{ required: true, message: "Please input the product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea style={{ resize: "none", height: "80px" }} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price_per_day"
              label="Price per Day"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select onChange={handleCategoryChange}>
                <Option value="house">House</Option>
                <Option value="land">Land</Option>
                <Option value="shop">Shop</Option>
                <Option value="apartments">Apartments</Option>
                <Option value="aland">Agricultural Land</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {customCategory === "other" && (
          <Form.Item
            name="category"
            label="Please specify the category (Don't leave this input field as 'Other'; specify the category of your property.)"
            rules={[{ required: true, message: 'Please specify if "Other" is selected!' }]}
          >
            <Input
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Enter custom category"
            />
          </Form.Item>
        )}

        {/* <Form.Item name="booked" label="Booked" valuePropName="checked">
          <Switch />
        </Form.Item> */}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["specifications", "nearby"]}
              label="Nearby"
              rules={[{ required: true, message: "Please input the weight!" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["specifications", "squarefeet"]}
              label="Squarefeet"
              rules={[{ required: true, message: "Please input the Squarefeet!" }]}
            >
              <Input type="number"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["location", "address"]}
              label="Address"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["location", "city"]}
              label="City"
              rules={[{ required: true, message: "Please input the city!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="images"
          required
          label="Upload Images (You can upload multiple images)"
        >
          <Upload 
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
