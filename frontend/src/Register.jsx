import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Select,message  } from "antd";
const { Option } = Select;
import axios from 'axios'

const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate=useNavigate()
    const [clientReady, setClientReady] = useState(false);
    // To disable submit button at the beginning.
    useEffect(() => {
      setClientReady(true);
    }, []);
    const onFinish = (values) => {
        if(values.password!=values.cpassword){
           return messageApi.info("Pasword Doesn't match");
        }
        if(values.password.length<6) return messageApi.info("password should be more the 6") 
          axios.post("http://localhost:5675/register",values).then((res) =>{
            if(res.data=="ok"){
              messageApi.success("Registered SuccessFully")
              navigate("/")
            }
          })
    };
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-black"
        style={{ height: "100vh" }}
      >
        {contextHolder}
        <Form
          form={form}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}
          className="p-4"
          style={{
            width: "450px",
            boxShadow:
              "rgba(255, 25, 255, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
          }}
        >
          <h5 className="mb-4 text-white">Register</h5>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
            type="text"
              prefix={<UserOutlined />}
              placeholder="Username"
              className="p-2"
              required
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
            type="email"
              prefix={<MailOutlined />}
              placeholder="Email"
              className="p-2"
              required
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="text"
              placeholder="Password"
              className="p-2"
              required
            />
          </Form.Item>
          <Form.Item
            name="cpassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
              className="p-2"
              required
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your Role!",
              },
            ]}
          >
            <Select placeholder="Role">
                <Option value="seller">
                 Seller
                </Option>
                <Option value="user">User</Option>
              </Select>
            
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button className="mt-2" type="primary" htmlType="submit">
                Register
              </Button>
            )}
          </Form.Item>
          <div className="d-flex w-100 justify-content-between">
            <p className="text-white" style={{ fontSize: "18px" }}>
              Do not have an account?
            </p>
            <Link to={"/register"} style={{ fontSize: "18px" }}>
              Register
            </Link>
          </div>
        </Form>
      </div>
    );
}

export default Register