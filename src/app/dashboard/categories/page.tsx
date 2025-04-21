'use client';

import React, { useState } from 'react';
import { 
  Typography, Button, Table, Tag, Space, Modal, 
  Form, Input, Select, message, Popconfirm
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Category status enum
enum CategoryStatus {
  Active = 0,
  Inactive = 1,
  Discontinued = 2
}

// Interface for Category model
interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  status: CategoryStatus;
  isActive: boolean;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}

// Sample data for categories
const initialCategories: Category[] = [
  {
    categoryId: 1,
    categoryName: 'Electronics',
    description: 'Electronic devices and accessories',
    status: CategoryStatus.Active,
    isActive: true,
    lastUpdatedAt: '2023-05-10T10:30:00',
    lastUpdatedBy: 'admin'
  },
  {
    categoryId: 2,
    categoryName: 'Clothing',
    description: 'Apparel and fashion items',
    status: CategoryStatus.Active,
    isActive: true,
    lastUpdatedAt: '2023-05-09T14:20:00',
    lastUpdatedBy: 'admin'
  },
  {
    categoryId: 3,
    categoryName: 'Home & Kitchen',
    description: 'Home goods and kitchen appliances',
    status: CategoryStatus.Active,
    isActive: true,
    lastUpdatedAt: '2023-05-08T09:15:00',
    lastUpdatedBy: 'admin'
  },
  {
    categoryId: 4,
    categoryName: 'Beauty',
    description: 'Beauty and personal care products',
    status: CategoryStatus.Active,
    isActive: true,
    lastUpdatedAt: '2023-05-07T16:45:00',
    lastUpdatedBy: 'admin'
  },
  {
    categoryId: 5,
    categoryName: 'Books',
    description: 'Books and educational resources',
    status: CategoryStatus.Inactive,
    isActive: false,
    lastUpdatedAt: '2023-05-06T11:10:00',
    lastUpdatedBy: 'admin'
  }
];

export default function CategoriesPage() {
  // State
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Columns for the categories table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      sorter: (a: Category, b: Category) => a.categoryId - b.categoryId,
    },
    {
      title: 'Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a: Category, b: Category) => a.categoryName.localeCompare(b.categoryName),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: Category) => (
        <Tag color={
          record.status === CategoryStatus.Active ? 'green' : 
          record.status === CategoryStatus.Inactive ? 'orange' : 'red'
        }>
          {CategoryStatus[record.status]}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: CategoryStatus.Active },
        { text: 'Inactive', value: CategoryStatus.Inactive },
        { text: 'Discontinued', value: CategoryStatus.Discontinued }
      ],
      onFilter: (value: number, record: Category) => record.status === value,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      render: (text: string) => new Date(text).toLocaleString(),
      sorter: (a: Category, b: Category) => new Date(a.lastUpdatedAt).getTime() - new Date(b.lastUpdatedAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.categoryId)}
            okText="Yes"
            cancelText="No"
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              {record.isActive ? 'Delete' : 'Restore'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Show modal for adding a new category
  const showAddModal = () => {
    form.resetFields();
    setModalTitle('Add New Category');
    setEditingCategory(null);
    setIsModalVisible(true);
  };

  // Show modal for editing an existing category
  const showEditModal = (category: Category) => {
    form.setFieldsValue({
      categoryName: category.categoryName,
      description: category.description,
      status: category.status,
    });
    setModalTitle('Edit Category');
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      setTimeout(() => {
        if (editingCategory) {
          // Update existing category
          const updatedCategories = categories.map(cat => 
            cat.categoryId === editingCategory.categoryId 
              ? { 
                  ...cat, 
                  ...values, 
                  lastUpdatedAt: new Date().toISOString(),
                  lastUpdatedBy: 'current_user'
                } 
              : cat
          );
          setCategories(updatedCategories);
          message.success('Category updated successfully!');
        } else {
          // Add new category
          const newCategory: Category = {
            categoryId: Math.max(...categories.map(c => c.categoryId)) + 1,
            categoryName: values.categoryName,
            description: values.description,
            status: values.status,
            isActive: values.status === CategoryStatus.Active,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: 'current_user'
          };
          setCategories([...categories, newCategory]);
          message.success('Category added successfully!');
        }
        
        setLoading(false);
        setIsModalVisible(false);
      }, 500);
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  // Handle category deletion
  const handleDelete = (categoryId: number) => {
    const updatedCategories = categories.map(cat => 
      cat.categoryId === categoryId 
        ? { 
            ...cat, 
            isActive: !cat.isActive,
            status: cat.isActive ? CategoryStatus.Inactive : CategoryStatus.Active,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: 'current_user'
          } 
        : cat
    );
    setCategories(updatedCategories);
    message.success(`Category ${categories.find(c => c.categoryId === categoryId)?.isActive ? 'deactivated' : 'activated'} successfully!`);
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, fontFamily: 'var(--font-raleway)' }}>Categories</Title>
        <Text type="secondary">Manage product categories</Text>
      </div>
      
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddModal}
        >
          Add Category
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={categories}
        rowKey="categoryId"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={modalTitle}
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
          >
            {editingCategory ? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="e.g. Electronics" maxLength={100} />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea 
              placeholder="Enter category description" 
              rows={4}
              maxLength={500}
              showCount
            />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
            initialValue={CategoryStatus.Active}
          >
            <Select placeholder="Select status">
              <Option value={CategoryStatus.Active}>Active</Option>
              <Option value={CategoryStatus.Inactive}>Inactive</Option>
              <Option value={CategoryStatus.Discontinued}>Discontinued</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
} 