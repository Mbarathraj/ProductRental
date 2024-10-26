import React from "react";
import { Table, Badge } from "antd";

const OrdersTable = ({ orders }) => {
  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Nearby',
      dataIndex: ["specifications","nearby"],
      key: 'nearby',
    },
    {
      title: 'City',
      dataIndex: ["location","city"],
      key: 'city',
    },
    {
      title: 'Address',
      dataIndex: ["location","address"],
      key: 'address',
    },
    {
      title: 'Payment Status',
      key: 'paymentStatus',
      render: () => (
        <Badge
          count={"Success"}
          style={{ backgroundColor: "#52c41a" }}
        />
      ),
    },
    {
      title: 'Booked At',
      dataIndex: 'startdate',
      key: 'bookedAt',
      render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
    },
    {
      title: 'Validity Until',
      dataIndex: 'enddate',
      key: 'validityUntil',
      render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
    },
  ];

  return (
    <Table
      dataSource={orders}
      columns={columns}
      rowKey={(record, index) => index} // Using index as key; ideally, you would use a unique identifier
      pagination={{ pageSize: 5 }} // Adjust page size as needed
      bordered
    />
  );
};

export default OrdersTable;
