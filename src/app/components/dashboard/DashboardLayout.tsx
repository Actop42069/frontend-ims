'use client';

import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth.context';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const items = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: '/dashboard/categories',
      icon: <AppstoreOutlined />,
      label: <Link href="/dashboard/categories">Categories</Link>,
    },
    {
      key: '/dashboard/products',
      icon: <ShoppingOutlined />,
      label: <Link href="/dashboard/products">Products</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          height: '100vh',
          position: 'fixed',
          left: 0,
          overflow: 'auto',
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ 
          padding: collapsed ? '16px 8px' : '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          height: '64px',
        }}>
          {!collapsed && (
            <Title level={4} style={{ margin: 0, color: '#01311F', fontFamily: 'var(--font-raleway)' }}>
              Roots IMS
            </Title>
          )}
          {collapsed && (
            <DashboardOutlined style={{ fontSize: '20px', color: '#01311F' }} />
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          style={{ 
            border: 'none',
            backgroundColor: 'transparent',
            padding: '8px 0',
          }}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          background: '#fff', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 24px',
          height: '64px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}>
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 48, height: 48 }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  }
                }}>
                  <Avatar 
                    style={{ 
                      backgroundColor: '#01311F',
                      marginRight: '8px',
                    }}
                    icon={<UserOutlined />}
                  />
                  <Text style={{ marginRight: '8px' }}>
                    {user.firstName} {user.lastName}
                  </Text>
                </div>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content style={{ 
          margin: '24px',
          minHeight: 'calc(100vh - 112px)',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout; 