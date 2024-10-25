import React from 'react';
import { Table, Tag } from 'antd';

const PaymentHisTable = () => {
  const data = [
    {
      key: '1',
      date: '2024-10-01',
      status: 'Completed',
      paymentId: 'PAY123456',
    },
    {
      key: '2',
      date: '2024-10-05',
      status: 'Pending',
      paymentId: 'PAY123457',
    },
    {
      key: '3',
      date: '2024-10-10',
      status: 'Failed',
      paymentId: 'PAY123458',
    },
    // Add more entries as needed
  ];

  const columns = [
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
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default PaymentHisTable;
