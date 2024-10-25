import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Spin, Empty, Card, Breadcrumb } from 'antd';
import axios from 'axios';

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5675/getissues")
      .then(res => {
        const sortedIssues = res.data.sort((a, b) => {
          const dateA = new Date(a.date.split('/').reverse().join('-'));
          const dateB = new Date(b.date.split('/').reverse().join('-'));
          return dateB - dateA; // Sort in descending order
        });
        setIssues(sortedIssues);
      })
      .catch(error => {
        console.error("Error fetching issues:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleView(record)}>View</a>
          <a onClick={() => handleResolve(record)}>Resolve</a>
        </Space>
      ),
    },
  ];

  const handleView = (issue) => {
    // Logic to view issue details (e.g., show a modal)
    console.log("Viewing issue:", issue);
  };

  const handleResolve = (issue) => {
    // Logic to resolve the issue (e.g., show a confirmation modal)
    console.log("Resolving issue:", issue);
  };

  return (
    <div className="p-6 container">
      <div className="logo ms-5">
          <Breadcrumb
            items={[
              { title: "Barath" },
              { title: "Issues" }
            ]}
          />
        </div>
        <div className='mt-5'>
      {loading ? (
        <Spin size="large" />
      ) : issues.length > 0 ? (
        <Table columns={columns} dataSource={issues}
        pagination={{pageSize:10,
          showSizeChanger:true,
          pageSizeOptions:["10","20","30","40"]
        }} rowKey="uid" />
      ) : (
        <Empty description="No issues found" />
      )}
      </div>
    </div>
  );
}
