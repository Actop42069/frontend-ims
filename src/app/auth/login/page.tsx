'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthCard } from '../../components/auth/AuthCard';
import { authService, LoginRequest } from '../../services/auth.service';
import { useAuth } from '../../contexts/auth.context';
import styles from '../../components/auth/auth.module.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      login(response);
      message.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      // Error is already handled in the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login to Your Account">
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
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
          name="password"
          className={styles.formItem}
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Password" 
            size="large" 
          />
        </Form.Item>

        <Form.Item className={styles.forgotPassword}>
          <Link href="/auth/forgot-password">
            Forgot password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className={styles.submitButton}
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider className={styles.divider}>OR</Divider>

      <div className={styles.links}>
        <p>
          Don't have an account?{' '}
          <Link href="/auth/signup">
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
} 