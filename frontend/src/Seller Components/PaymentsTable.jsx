import React, { useEffect, useState } from 'react';
import { Empty, Table, Tag } from 'antd';
import axios from 'axios';

const PaymentsTable = ({uid}) => {
    const [paymentHistory,setPaymentHistory]=useState([])
    useEffect(()=>{
        axios.post("http://localhost:5675/sellergetpayments",{uid}).then(res=>{
          setPaymentHistory(res.data)
        })
      },[])
  // Sort payment history by date in descending order
  const sortedPaymentHistory = [...paymentHistory].sort((a, b) => {
    return new Date(b.date) - new Date(a.date); // Sort by date, most recent first
  });

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
        title:'Paid By',
        dataIndex:'paymentBy',
        key:"paidby"
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color;
        switch (text) {
          case 'Completed':
            color = 'green';
            break;
          case 'Pending':
            color = 'orange';
            break;
          case 'Failed':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        return (
          <Tag key={text} color='white' style={{ backgroundColor: "#52c41a" }}>
            $&nbsp;{text}
          </Tag>
        );
      },
    },
  ];

  return (
    paymentHistory.length>0 ? <Table dataSource={sortedPaymentHistory} columns={columns} />:(
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Payments found" />
  ))
};

export default PaymentsTable;
