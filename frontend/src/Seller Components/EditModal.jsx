import { Button, Form, Input, Modal, Select, Upload,message } from 'antd'
import React from 'react'
import axios from "axios";
const EditModal = ({onCancel,showEditModal,products,setProducts}) => {
const handleEdit=(data)=>{
  axios.post("http://localhost:5675/editProduct",{
    data,
    id:showEditModal?.product.id}).then(res => {
      if(res.data=="ok"){
        const updatedProduct = { ...showEditModal?.product, ...data };
      console.log('Updated Product:', updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === showEditModal?.product.id ? updatedProduct : product
      );
      setProducts(updatedProducts)
      message.success("Edited")
      onCancel()
      }
    })
  }
  return (
    <Modal
        open={showEditModal?.open}
        onCancel={onCancel}
        footer={false}
        title="Edit Details"
      >
        <Form
        initialValues={showEditModal?.product}
        onFinish={(data)=> handleEdit(data)}
        >
             <Form.Item
        name="name"
        label="Bike Name"
        rules={[{ required: true, message: 'Please input the bike name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="price_per_day"
        label="Price per Day"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
          name={["specifications","weight"]}
        label="Weight (kg)"
        rules={[{ required: true, message: 'Please input the weight!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
          name={["specifications","model"]}
        label="Model"
        rules={[{ required: true, message: 'Please input the model!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
          name={["specifications","color"]}
        label="Color"
        rules={[{ required: true, message: 'Please input the color!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["specifications","brand"]}
        label="Brand"
        rules={[{ required: true, message: 'Please input the brand!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Images">
        <Upload>
          <Button>Upload Images</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>


      </Modal>
  )
}

export default EditModal