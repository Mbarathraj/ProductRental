import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  Breadcrumb,
  Drawer,
  Button,
  Layout,
  Menu,
  Avatar,
} from "antd";
import {
  DashboardOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  UserSwitchOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Sellers from "./Sellers";
import Users from "./Users";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, setRole] = useState("seller");
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo">
          <Breadcrumb items={[{ title: "Barath" }, { title: "Profile" }]} />
        </div>
      </Header>
      <Layout>
        <Sider width={250} className="site-layout-background">
          <div style={{ height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Avatar
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              size={100}
              className="mb-2"
            />
            <p>Barathraj M</p>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserSwitchOutlined />} onClick={() => setRole("seller")}>
              Sellers
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} onClick={() => setRole("user")}>
              Users
            </Menu.Item>
            <Menu.Item key="4"  icon={<LogoutOutlined  />} onClick={()=>{
              alert("hi")
              navigate("/")
            }}> 
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            <div className="d-flex gap-2 w-100 mt-2">
              {[1, 2, 3, 4].map((card) => (
                <div 
                  key={card} // Unique key for each card
                  className="p-2 border border-1 flex-grow-1 rounded-3" 
                  style={{ height: "100px", background: "#f5f5f5" }}
                >
                  Total Orders
                </div>
              ))}
            </div>
            {role === "seller" ? <Sellers /> : <Users />}
          </Content>
        </Layout>
      </Layout>
      <Drawer
        title="Edit Profile"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        extra={
          <Button type="primary" onClick={() => setDrawerOpen(false)} icon={<SaveOutlined />}>
            Save
          </Button>
        }
      >
        <p>Profile editing form goes here...</p>
      </Drawer>
    </Layout>
  );
};

export default AdminDashboard;
