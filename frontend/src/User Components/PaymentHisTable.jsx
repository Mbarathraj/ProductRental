import React from 'react';
import { Table, Tag } from 'antd';

const PaymentHisTable = ({ paymentHistory }) => {
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

  return <Table dataSource={sortedPaymentHistory} columns={columns} />;
};

export default PaymentHisTable;
