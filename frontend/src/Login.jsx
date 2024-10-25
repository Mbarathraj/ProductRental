import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input,message } from "antd";
import axios from "axios";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    axios.post("http://localhost:5675/login", values).then((res) => {
      console.log(res.data)
      if (res.data.role == "user") navigate("/user", { state: res.data.id });
      if (res.data.role == "seller")
        navigate("/seller", { state: res.data.id });
      if (res.data.role == "admin") navigate("/barathadmin", { state: res.data.id });
      if(res.data=="no user") messageApi.error("No User Found")
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-black"
      style={{ height: "100vh" }}
    > {contextHolder}
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
          height: "350px",
        }}
      >
        <h5 className="mb-4 text-white">Login</h5>
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
            type="password"
            placeholder="Password"
            className="p-2"
            required
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button className="mt-2" type="primary" htmlType="submit">
              Log in
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

export default Login;
