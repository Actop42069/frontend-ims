'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthCard } from '../../components/auth/AuthCard';
import { authService, SignupRequest } from '../../services/auth.service';
import styles from '../../components/auth/auth.module.css';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values: SignupRequest) => {
    setLoading(true);
    try {
      await authService.signup(values);
      // On successful signup, redirect to login page
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      // Error is already handled in the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create an Account">
      <Form
        form={form}
        name="signup"
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          className={styles.formItem}
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="First Name" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          className={styles.formItem}
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Last Name" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="email"
          className={styles.formItem}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          className={styles.formItem}
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input 
            prefix={<PhoneOutlined />} 
            placeholder="Phone Number" 
            size="large" 
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className={styles.submitButton}
            size="large"
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <Divider className={styles.divider}>OR</Divider>

      <div className={styles.links}>
        <p>
          Already have an account?{' '}
          <Link href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
} 