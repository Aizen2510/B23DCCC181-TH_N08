import React, { useState } from 'react';
import { Form, Input, Button, Table, Card, Space, Typography, Select, DatePicker } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TraCuu } from '@/types/index';
import { useModel } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const TraCuuVanBang: React.FC = () => {
	const {
		searchResults,
		searchPerformed,
		searchCertificates,
		isLoading,
		setIsLoading,
		degreeBooks,
		selectedBookId,
		setSelectedBookId,
	} = useModel('degreebook');
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const handleSearch = async (values: TraCuu.SearchParams) => {
		setLoading(true);
		try {
			await searchCertificates(values);
		} catch (error) {
			console.error('Error searching certificates:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleReset = () => {
		form.resetFields();
	};

	const columns: ColumnsType<TraCuu.SearchResult> = [
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'Mã sinh viên',
			dataIndex: 'studentId',
			key: 'studentId',
		},
		{
			title: 'Mã văn bằng',
			dataIndex: 'graduationBookId',
			key: 'graduationBookId',
		},
		{
			title: 'Số vào sổ',
			dataIndex: 'sequenceNumber',
			key: 'sequenceNumber',
		},
		{
			title: 'Số quyết định',
			dataIndex: 'decisionNumber',
			key: 'decisionNumber',
		},
		{
			title: 'Năm tốt nghiệp',
			dataIndex: 'graduationYear',
			key: 'graduationYear',
		},
	];

	return (
		<div className='search-certificate-container'>
			<Title level={3}>Tra cứu văn bằng</Title>

			<Card className='search-form-card'>
				<Form form={form} name='search-certificate-form' layout='vertical' onFinish={handleSearch}>
					<div className='search-form-row'>
						<Form.Item name='keyword' label='Từ khóa chung' style={{ width: '100%' }}>
							<Input placeholder='Nhập từ khóa tìm kiếm' />
						</Form.Item>
					</div>

					<div className='search-form-row'>
						<Form.Item name='studentId' label='Mã sinh viên'>
							<Input placeholder='Nhập mã sinh viên' />
						</Form.Item>

						<Form.Item name='fullName' label='Họ tên'>
							<Input placeholder='Nhập họ tên' />
						</Form.Item>
					</div>

					<div className='search-form-row'>
						<Form.Item name='graduationBookId' label='Mã văn bằng'>
							<Input placeholder='Nhập mã văn bằng' />
						</Form.Item>

						<Form.Item name='decisionNumber' label='Số quyết định'>
							<Input placeholder='Nhập số quyết định' />
						</Form.Item>

						<Form.Item name='graduationYear' label='Năm tốt nghiệp'>
							<Select placeholder='Chọn năm tốt nghiệp' value={selectedBookId} onChange={setSelectedBookId} allowClear>
								{degreeBooks.map((book) => (
									<Select.Option key={book.id} value={book.id || ''}>
										{book.year}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</div>

					<div className='search-form-buttons'>
						<Space>
							<Button type='primary' htmlType='submit' icon={<SearchOutlined />} loading={loading}>
								Tìm kiếm
							</Button>
							<Button onClick={handleReset} icon={<ReloadOutlined />}>
								Làm mới
							</Button>
						</Space>
					</div>
				</Form>
			</Card>

			<div className='search-results-container'>
				{searchPerformed && (
					<>
						<Title level={4}>Kết quả tìm kiếm ({searchResults.length})</Title>
						<Table
							columns={columns}
							dataSource={searchResults}
							rowKey='id'
							pagination={{ pageSize: 10 }}
							loading={loading}
						/>
					</>
				)}
			</div>

			<style>
				{`
        .search-form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .search-form-row > * {
          flex: 1;
        }

        .search-form-buttons {
          display: flex;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .search-results-container {
          margin-top: 24px;
        }
        `}
			</style>
		</div>
	);
};

export default TraCuuVanBang;
