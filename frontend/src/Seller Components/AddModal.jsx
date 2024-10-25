import { Checkbox, message, Modal, Switch } from "antd";
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
  const [loading, setLoading] = useState(false); // Loading state

  const handleCategoryChange = (value) => {
    if (value === "other") {
      setCustomCategory("other"); // Reset the custom input if "Other" is selected
    } else {
      setCustomCategory(value); // Set to the selected category
    }
  };

  const handleFinish = async (values) => {
    values.sellerid = uid;
    values.bookedby = "";
    values.booked = false;
    values.ratings=[]

    // Create an array to hold the URLs
    const imageUrls = [];

    try {
      setLoading(true); // Set loading to true before making the request

      // Upload each image to Firebase Storage
      for (const file of fileList) {
        const imageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(imageRef, file.originFileObj);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url); // Push the URL to the array
      }

      // Add image URLs to the product values
      values.images = imageUrls;

      // Make the POST request to your backend
      const res = await axios.post("http://localhost:5675/addproduct", { values });

      if (res.data === "ok") {
        setProducts([...products, values]); // Add new product to state
        message.success("Product added successfully!");
        setAddModal(false);
        form.resetFields(); // Reset the form fields
        setFileList([]); // Reset the file list
      }
    } catch (error) {
      message.error("Failed to add product. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Add Product"
      open={showAddModal}
      footer={false}
      onCancel={() => setAddModal(false)}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please input the product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea style={{ resize: "none", height: "80px" }} />
        </Form.Item>

        <Form.Item
          name="price_per_day"
          label="Price per Day"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select onChange={handleCategoryChange}>
            <Option value="car">Car</Option>
            <Option value="bike">Bike</Option>
            <Option value="watch">Watch</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {customCategory === "other" && (
          <Form.Item
            name="customCategory"
            label="Please specify the category"
            rules={[{ required: true, message: 'Please specify if "Other" is selected!' }]}
          >
            <Input
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category"
            />
          </Form.Item>
        )}

        <Form.Item name="booked" label="Booked" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          name={["specifications", "weight"]}
          label="Weight (kg)"
          rules={[{ required: true, message: "Please input the weight!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name={["specifications", "model"]}
          label="Model"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["specifications", "color"]}
          label="Color"
          rules={[{ required: true, message: "Please input the color!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["specifications", "brand"]}
          label="Brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["location", "address"]}
          label="Address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["location", "city"]}
          label="City"
          rules={[{ required: true, message: "Please input the city!" }]
          }
        >
          <Input />
        </Form.Item>

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
