import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Drawer,
  Button,
  Menu,
  Avatar,
  Input,
  Popover,
  Empty,
  Card,
  message as api
} from "antd";
import {
  DashboardOutlined,
  EditOutlined,
  HistoryOutlined,
  LogoutOutlined,
  PhoneOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import ProductsTable from "./ProductsTable";
import axios from "axios";
import PaymentsTable from "./PaymentsTable";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const SellerDashboard = ({ products, uid }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const navigate = useNavigate();
  const [active,setActive]=useState("dashboard")
  // Filter products based on search term
  const filteredOrders = products.filter(product =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const [message, setMessage] = useState(""); 
  const handleMessage=()=>{
    console.log(message)
      const issue={
        uid,
        message,
        role:"seller",
        date:new Date().toLocaleString()
      }
      axios.post("http://localhost:5675/postissue",issue).then((res)=>{
        if(res.data=="ok"){
          setMessageOpen(false)
          api.success("Send")
        }
      })
      setMessage("")
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <Breadcrumb items={[{ title: "Barath" }, { title: "Profile" }]} />
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
          <Menu mode="inline" defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<DashboardOutlined
            />
          }
          onClick={()=>{
            setActive("dashboard")
           }}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined />}
             onClick={()=>{
              setActive("payments")
             }}
            >
              Payments
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => {
              alert("Logging out...");
              navigate("/");
            }}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6>Your Properties:</h6>
              <Search
                placeholder="Search by category"
                style={{ width: 350 }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 mb-3">
              {[1, 2, 3, 4].map((card) => (
                <Card key={card} style={{ width: "100%", height: "100px", textAlign: "center", background: "#f5f5f5" }}>
                  <h5>Total Orders</h5>
                </Card>
              ))}
            </div>

            <div className="d-flex align-items-center mb-3">
              <Popover
                content={
                  <div className="d-flex flex-column">
                    <div style={{ height: "30px", width: "300px" }}></div>
                    <div>
                      <Input addonAfter={<SendOutlined 
                      onClick={()=>handleMessage()}
                      />} 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message" />
                    </div>
                    <div className="align-self-center mt-1">(OR)</div>
                    <div className="d-flex align-items-center gap-1">
                      <div className="border border-1 p-2 bg-success" style={{ borderRadius: "50%", color: "white" }}>
                        <PhoneOutlined />
                      </div>
                      +91 9876543210
                    </div>
                  </div>
                }
                title="Message"
                trigger="click"
                open={messageOpen}
                onOpenChange={setMessageOpen}
              >
                <Button type="primary" icon={<PhoneOutlined />} />
              </Popover>
            </div>

            {
               active=="dashboard" && (<div>
              {products.length > 0 ? (
                <ProductsTable orders={filteredOrders} />
              ) : (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No products found" />
                </div>
              )}
            </div>)
            }
             {
                 active=='payments' && 
                 <PaymentsTable uid={uid}/>
            }
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
        <p>Profile editing content goes here...</p>
      </Drawer>
    </Layout>
  );
};

export default SellerDashboard;
