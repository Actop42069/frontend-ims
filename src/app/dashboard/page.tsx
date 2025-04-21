'use client';

import React, { useState } from 'react';
import { 
  Typography, Row, Col, Card, Statistic, Tabs, DatePicker, 
  Select, Button, Table, Tag, Divider
} from 'antd';
import { 
  BarChartOutlined, LineChartOutlined, 
  RiseOutlined, ArrowUpOutlined,
  ShoppingOutlined, DollarOutlined, 
  UserOutlined, AppstoreOutlined
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
  { name: 'Aug', sales: 3490, revenue: 4300 },
  { name: 'Sep', sales: 3490, revenue: 4300 },
  { name: 'Oct', sales: 3490, revenue: 4300 },
  { name: 'Nov', sales: 3490, revenue: 4300 },
  { name: 'Dec', sales: 3490, revenue: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Home & Kitchen', value: 300 },
  { name: 'Beauty', value: 200 },
  { name: 'Books', value: 100 },
];

const COLORS = ['#01311F', '#C6AA58', '#D6BD74', '#015F3B', '#F3F2ED'];

const recentSalesData = [
  {
    key: '1',
    product: 'iPhone 13 Pro',
    category: 'Electronics',
    date: '2023-05-10',
    amount: 1099.00,
    status: 'Completed',
  },
  {
    key: '2',
    product: 'Nike Air Max',
    category: 'Clothing',
    date: '2023-05-09',
    amount: 129.99,
    status: 'Completed',
  },
  {
    key: '3',
    product: 'Coffee Maker',
    category: 'Home & Kitchen',
    date: '2023-05-08',
    amount: 79.95,
    status: 'Processing',
  },
  {
    key: '4',
    product: 'MacBook Pro',
    category: 'Electronics',
    date: '2023-05-07',
    amount: 1999.00,
    status: 'Completed',
  },
  {
    key: '5',
    product: 'Face Cream',
    category: 'Beauty',
    date: '2023-05-06',
    amount: 24.50,
    status: 'Pending',
  },
];

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text: string) => (
      <Tag color={text === 'Electronics' ? '#01311F' : 
                text === 'Clothing' ? '#C6AA58' : 
                text === 'Home & Kitchen' ? '#D6BD74' : 
                text === 'Beauty' ? '#015F3B' : '#F3F2ED'}>
        {text}
      </Tag>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text: number) => `$${text.toFixed(2)}`,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => (
      <Tag color={status === 'Completed' ? 'green' : 
                status === 'Processing' ? 'blue' : 'orange'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('week');
  
  const renderDashboardContent = () => (
    <>
      <div style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, fontFamily: 'var(--font-raleway)' }}>Dashboard</Title>
            <Text type="secondary">Overview of your store's performance</Text>
          </Col>
          <Col>
            <RangePicker style={{ marginRight: 16 }} />
            <Select 
              defaultValue="week" 
              onChange={value => setTimeRange(value)}
              style={{ width: 120 }}
            >
              <Option value="day">Today</Option>
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
            </Select>
          </Col>
        </Row>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={45600}
              precision={2}
              valueStyle={{ color: '#01311F' }}
              prefix={<DollarOutlined />}
              suffix=""
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined style={{ color: 'green' }} /> 12% from last {timeRange}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Orders"
              value={1250}
              valueStyle={{ color: '#C6AA58' }}
              prefix={<ShoppingOutlined />}
              suffix=""
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined style={{ color: 'green' }} /> 8% from last {timeRange}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Customers"
              value={845}
              valueStyle={{ color: '#015F3B' }}
              prefix={<UserOutlined />}
              suffix=""
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined style={{ color: 'green' }} /> 5% from last {timeRange}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Products"
              value={156}
              valueStyle={{ color: '#D6BD74' }}
              prefix={<AppstoreOutlined />}
              suffix=""
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <RiseOutlined style={{ color: 'green' }} /> 3 new this {timeRange}
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={<span><BarChartOutlined />Sales Overview</span>} 
          key="1"
        >
          <Card title="Monthly Revenue" style={{ marginBottom: 20 }}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#01311F' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #f0f0f0',
                      borderRadius: 4,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#01311F" />
                  <Bar dataKey="sales" fill="#C6AA58" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Sales Trend" style={{ height: '100%' }}>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#01311F" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Sales by Category" style={{ height: '100%' }}>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane 
          tab={<span><LineChartOutlined />Recent Transactions</span>} 
          key="2"
        >
          <Card title="Recent Sales">
            <Table 
              columns={columns} 
              dataSource={recentSalesData} 
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </>
  );

  return (
    <DashboardLayout>
      {renderDashboardContent()}
    </DashboardLayout>
  );
} 