'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthCard } from '../../components/auth/AuthCard';
import { authService, ForgotPasswordRequest } from '../../services/auth.service';
import styles from '../../components/auth/auth.module.css';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values: ForgotPasswordRequest) => {
    setLoading(true);
    try {
      await authService.forgotPassword(values);
      // On successful request, redirect to login page after message display
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      // Error is already handled in the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password">
      <p style={{ marginBottom: '24px', textAlign: 'center' }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <Form
        form={form}
        name="forgotPassword"
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

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className={styles.submitButton}
            size="large"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>

      <Divider className={styles.divider} />

      <div className={styles.links}>
        <p>
          Remember your password?{' '}
          <Link href="/auth/login">
            Back to Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
} 