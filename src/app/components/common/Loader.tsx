'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoaderProps {
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullPage = false }) => {
  const antIcon = (
    <LoadingOutlined 
      style={{ 
        fontSize: 40, 
        color: '#C6AA58',
        filter: 'drop-shadow(0 0 8px rgba(198, 170, 88, 0.3))'
      }} 
      spin 
    />
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(243, 242, 237, 0.85)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Spin indicator={antIcon} />
          <div style={{ 
            marginTop: '20px', 
            color: '#01311F', 
            fontWeight: 500,
            fontFamily: 'var(--font-raleway)',
            fontSize: '18px',
            letterSpacing: '0.5px'
          }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return <Spin indicator={antIcon} />;
};

export default Loader; 