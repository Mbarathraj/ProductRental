import React from 'react';
import { Table, Badge } from 'antd';

const ProductsTable = ({ orders }) => {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Model',
      dataIndex: ["specifications","model"],
      key: 'model',
    },
    {
      title: 'Booked',
      dataIndex:"booked",
      key: 'booked',
      render: (booked) => !booked ? "Not Yet":"Booked"
    },
    // {
    //   title: 'Status',
    //   key: 'status',
    //   render: () => (
    //     <Badge
    //       count={"Success"}
    //       style={{
    //         backgroundColor: "#52c41a",
    //       }}
    //     />
    //   ),
    // },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (startdate) => (startdate ? new Date(startdate).toLocaleString() : 'N/A'),
    },
    {
      title: 'End Date',
      dataIndex: 'enddate',
      key: 'enddate',
      render: (enddate) => (enddate ? new Date(enddate).toLocaleString() : 'N/A'),
    },
  ];

  return (
    <Table
      dataSource={orders}
      columns={columns}
      rowKey={(order) => order.id} // Assuming each order has a unique id
      pagination={{ pageSize: 10,
        pageSizeOptions:true,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30']
       }} // Customize pagination as needed
      bordered
    />
  );
};

export default ProductsTable;
