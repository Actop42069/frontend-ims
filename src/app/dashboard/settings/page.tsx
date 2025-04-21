'use client';

import React from 'react';
import { Typography, Card, Tabs, Form, Input, Button, Switch, Select, Divider, Space } from 'antd';
import { SaveOutlined, UserOutlined, SettingOutlined, LockOutlined, BellOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export default function SettingsPage() {
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();

  const handleGeneralSubmit = (values: any) => {
    console.log('General form values:', values);
  };

  const handleSecuritySubmit = (values: any) => {
    console.log('Security form values:', values);
  };

  const handleNotificationsSubmit = (values: any) => {
    console.log('Notifications form values:', values);
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontFamily: 'var(--font-raleway)' }}>Settings</Title>
        <Text type="secondary">Manage your account and application settings</Text>
      </div>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><UserOutlined />Profile</span>}
            key="1"
          >
            <Form
              form={generalForm}
              layout="vertical"
              onFinish={handleGeneralSubmit}
              initialValues={{
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+1 234 567 8900',
                company: 'Acme Inc.',
                timeZone: 'America/New_York',
                language: 'en-US'
              }}
            >
              <Title level={4}>Profile Information</Title>
              <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                Update your personal information and preferences
              </Text>
              
              <div style={{ maxWidth: 600 }}>
                <Form.Item label="Profile Picture">
                  <div style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    backgroundColor: '#01311F', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 40,
                    color: '#fff',
                    marginBottom: 16
                  }}>
                    JD
                  </div>
                  <Button>Change Picture</Button>
                </Form.Item>
                
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="company"
                  label="Company"
                >
                  <Input />
                </Form.Item>
                
                <Divider />
                
                <Form.Item
                  name="timeZone"
                  label="Time Zone"
                >
                  <Select>
                    <Option value="America/New_York">Eastern Time (ET)</Option>
                    <Option value="America/Chicago">Central Time (CT)</Option>
                    <Option value="America/Denver">Mountain Time (MT)</Option>
                    <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="language"
                  label="Language"
                >
                  <Select>
                    <Option value="en-US">English (US)</Option>
                    <Option value="es-ES">Spanish</Option>
                    <Option value="fr-FR">French</Option>
                    <Option value="de-DE">German</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><LockOutlined />Security</span>}
            key="2"
          >
            <Form
              form={securityForm}
              layout="vertical"
              onFinish={handleSecuritySubmit}
            >
              <Title level={4}>Security Settings</Title>
              <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                Update your password and security preferences
              </Text>
              
              <div style={{ maxWidth: 600 }}>
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password />
                </Form.Item>
                
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                
                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                
                <Divider />
                
                <Form.Item
                  name="twoFactorAuth"
                  label="Two-Factor Authentication"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Update Security Settings
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><BellOutlined />Notifications</span>}
            key="3"
          >
            <Form
              form={notificationsForm}
              layout="vertical"
              onFinish={handleNotificationsSubmit}
              initialValues={{
                emailNotifications: true,
                productUpdates: true,
                securityAlerts: true,
                marketingEmails: false
              }}
            >
              <Title level={4}>Notification Preferences</Title>
              <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                Configure how you receive notifications and updates
              </Text>
              
              <div style={{ maxWidth: 600 }}>
                <Form.Item
                  name="emailNotifications"
                  label="Email Notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="productUpdates"
                  label="Product Updates"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="securityAlerts"
                  label="Security Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="marketingEmails"
                  label="Marketing Emails"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Notification Settings
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><SettingOutlined />System</span>}
            key="4"
          >
            <Title level={4}>System Settings</Title>
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              Configure application settings
            </Text>
            
            <Space direction="vertical" style={{ width: '100%', maxWidth: 600 }}>
              <Card title="Data Management" size="small">
                <p>Export or import your inventory data</p>
                <Space>
                  <Button>Export Data</Button>
                  <Button>Import Data</Button>
                </Space>
              </Card>
              
              <Card title="API Access" size="small">
                <p>Manage your API keys and access</p>
                <Button>Manage API Keys</Button>
              </Card>
              
              <Card title="System Maintenance" size="small">
                <p>Clean up the database and optimize performance</p>
                <Button>Run Maintenance</Button>
              </Card>
            </Space>
          </TabPane>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
} 