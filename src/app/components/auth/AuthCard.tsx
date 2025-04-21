'use client';

import React from 'react';
import { Card } from 'antd';
import styles from './auth.module.css';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <div className={styles.authContainer}>
      <Card
        title={<h1 className={styles.cardTitle}>{title}</h1>}
        bordered={false}
        className={styles.authCard}
      >
        {children}
      </Card>
    </div>
  );
}; 