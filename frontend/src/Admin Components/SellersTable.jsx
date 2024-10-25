import React from 'react'
import { Empty, Table } from 'antd';
const SellersTable = ({sellers}) => {
    const columns = [
        {
          title: 'ID',
          dataIndex: 'uid',
          key: 'uid',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
      ];
  return (
    <Table
    dataSource={sellers}
    columns={columns}
    rowKey="id" // Assuming 'id' is unique for each user
    pagination={{
        pageSize:10,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30']
    }} // Set to true if you want pagination
    locale={{
      emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Users Found" />,
    }}
  />
  )
}

export default SellersTable