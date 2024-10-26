import React, { useEffect, useState } from "react";
import {
  Layout,
  Breadcrumb,
  Drawer,
  Input,
  Popconfirm,
  Popover,
  Modal,
  Empty,
  Avatar,
  Button,
  Menu,
  Card,
  message as api
} from "antd";
import {
  DashboardOutlined,
  EditOutlined,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  PhoneOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axios from "axios";
import OrdersTable from "./OrdersTable";
import ProductCard from "./ProductCard";
import { useProducts } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import PaymentHisTable from "./PaymentHisTable";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const UserDashboard = ({ uid }) => {
  const navigate=useNavigate()
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [wishListOpen, setWishListOpen] = useState(false);
  const { products } = useProducts();
  const [paymentHistory,setPaymentHistory]=useState([])
  const [active,setActive]=useState("")
  useEffect(() => {
    axios.post("http://localhost:5675/orders", { uid }).then((res) => {
      setOrders(res.data);
    });
    axios.post("http://localhost:5675/paymenthistory",{uid})
    .then(res =>{
        setPaymentHistory(res.data)
    })
  }, [uid]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [message, setMessage] = useState(""); 

  const handleMessage=()=>{
      const issue={
        uid,
        message,
        role:"user",
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
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}
             onClick={()=> setActive("")}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined />}
            onClick={()=> setActive("payment")}
            >
              Payment History
            </Menu.Item>
            <Menu.Item key="3" icon={<HeartOutlined />} onClick={() => setWishListOpen(true)}>
              Wishlist
            </Menu.Item>
            <Popconfirm
              title="Logout"
              placement="bottomRight"
              description="Are you sure to logout?"
              onConfirm={() => {
                // Logout Code here
              }}
              okText="Yes"
              cancelText="No"
            >
              <Menu.Item key="3"  
              onClick={()=>{
                  navigate("/")
              }}
              className="ms-3"icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Popconfirm>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6>Recent Bookings:</h6>
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
              
            <div className="mb-3">
              Issues Box: &nbsp;
              <Popover
                content={
                  <div className="d-flex flex-column">
                    <div style={{ height: "20px", width: "300px" }}></div>
                    <div>
                      <Input addonAfter={<SendOutlined onClick={()=>handleMessage()}/>} 
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
            active!="payment" ?
            <div>
              {filteredOrders.length > 0 ? (
                <OrdersTable orders={filteredOrders} />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No orders found" />
              )}
            </div>
            :
            <div>
              <PaymentHisTable paymentHistory={paymentHistory}/>
            </div> 
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
      <Modal
        centered
        closable={true}
        footer={false}
        open={wishListOpen}
        title={"Wishlist"}
        width={1000}
        onCancel={() => setWishListOpen(false)}
      >
        <div className="d-flex flex-wrap gap-3">
          {products && products.map((product, index) => (
            <ProductCard key={index} index={index} product={product.data} id={product.id} uid={uid} />
          ))}
        </div>
      </Modal>
    </Layout>
  );
};

export default UserDashboard;
