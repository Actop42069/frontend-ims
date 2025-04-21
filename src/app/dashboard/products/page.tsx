'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, Button, Table, Tag, Space, Modal, 
  Form, Input, InputNumber, Select, message, Popconfirm, Upload
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  UploadOutlined, SearchOutlined
} from '@ant-design/icons';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Product, productService } from '../../services/product.service';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Sample categories for dropdown (in a real app, these would come from a category service)
const categories = [
  { value: 1, label: 'Electronics' },
  { value: 2, label: 'Clothing' },
  { value: 3, label: 'Home & Kitchen' },
  { value: 4, label: 'Beauty' },
  { value: 5, label: 'Books' },
];

export default function ProductsPage() {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Column definitions for the table
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <a onClick={() => showEditModal(record)}>{text}</a>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (text: string) => (
        <Tag color={
          text === 'Electronics' ? '#01311F' : 
          text === 'Clothing' ? '#C6AA58' : 
          text === 'Home & Kitchen' ? '#D6BD74' : 
          text === 'Beauty' ? '#015F3B' : '#F3F2ED'
        }>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'volcano'}>
          {isActive ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title={`${record.isActive ? 'Deactivate' : 'Activate'} this product?`}
            onConfirm={() => handleToggleStatus(record.productId)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { background: '#01311F', borderColor: '#01311F' } }}
          >
            <Button 
              type="text" 
              danger={record.isActive}
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Show modal for adding new product
  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Show modal for editing existing product
  const showEditModal = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.categoryId,
      isActive: product.isActive,
      imageUrl: product.imageUrl,
    });
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (editingProduct) {
        // Update existing product
        await productService.updateProduct(editingProduct.productId, values);
      } else {
        // Add new product
        await productService.createProduct(values);
      }
      
      setIsModalVisible(false);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Form validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle product status toggle
  const handleToggleStatus = async (productId: number) => {
    try {
      await productService.toggleProductStatus(productId);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontFamily: 'var(--font-raleway)' }}>Products</Title>
        <Text type="secondary">Manage inventory products</Text>
      </div>
      
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddModal}
          style={{ background: '#01311F', borderColor: '#01311F' }}
        >
          Add Product
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={products}
        rowKey="productId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      {/* Add/Edit Product Modal */}
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading} 
            onClick={handleFormSubmit}
            style={{ background: '#01311F', borderColor: '#01311F' }}
          >
            {editingProduct ? 'Update' : 'Add'}
          </Button>,
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isActive: true }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: 'Please enter product price' }]}
          >
            <InputNumber 
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
              placeholder="0.00"
            />
          </Form.Item>
          
          <Form.Item
            name="quantity"
            label="Quantity in Stock"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber 
              min={0}
              style={{ width: '100%' }}
              placeholder="0"
            />
          </Form.Item>
          
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              {categories.map(category => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          {editingProduct && (
            <Form.Item name="isActive" label="Status">
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
          )}
          
          <Form.Item
            name="imageUrl"
            label="Image URL"
          >
            <Input placeholder="Enter product image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
} 