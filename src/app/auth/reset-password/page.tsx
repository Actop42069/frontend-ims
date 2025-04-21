'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthCard } from '../../components/auth/AuthCard';
import { authService, ResetPasswordRequest } from '../../services/auth.service';
import styles from '../../components/auth/auth.module.css';

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      return;
    }

    setLoading(true);
    try {
      const resetRequest: ResetPasswordRequest = {
        token,
        password: values.password,
        confirmPassword: values.confirmPassword
      };
      
      await authService.resetPassword(resetRequest);
      // On successful reset, redirect to login page after message display
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
    <AuthCard title="Reset Password">
      <p style={{ marginBottom: '24px', textAlign: 'center' }}>
        Enter your new password.
      </p>
      
      <Form
        form={form}
        name="resetPassword"
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="password"
          className={styles.formItem}
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 8, message: 'Password must be at least 8 characters' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="New Password" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          className={styles.formItem}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm Password" 
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
            Update Password
          </Button>
        </Form.Item>
      </Form>

      <Divider className={styles.divider} />

      <div className={styles.links}>
        <p>
          <Link href="/auth/login">
            Back to Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
} 