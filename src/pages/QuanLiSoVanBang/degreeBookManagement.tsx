import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { VanBang } from '@/types/index';
import FormDegreeBook from './form';
const DegreeBookManagement: React.FC = () => {
	const {
		isDetail,
		setEdit,
		setIsDetail,
		isModalVisible,
		setIsModalVisible,
		degreeBooks,
		setDegreeBooks,
		getDataDegreeBook,
		selectedBook,
		setSelectedBook,
	} = useModel('degreebook');
	// const { degree, setDegree, degreeList, setDegreeList, getDataDegree } = useModel('degree');
	const [form] = Form.useForm();

	useEffect(() => {
		getDataDegreeBook();
	}, []);

	const handleAddNew = () => {
		setIsModalVisible(true);
		setEdit(false);
	};

	const handleViewDetails = (record: VanBang.DegreeBook) => {
		setSelectedBook(record);
		setIsDetail(true);
	};

	const handleEdit = (record: VanBang.DegreeBook) => {
		setSelectedBook(record);
		setIsModalVisible(true);
		setEdit(true);
	};

	// const handleModalOk = () => {
	// 	setIsModalVisible(false);
	// 	setSelectedBook(null);
	// 	form.submit();
	// };

	const handleModalCancel = () => {
		setIsModalVisible(false);
		// setSelectedBook(null);
	};

	const columns: ColumnsType<VanBang.DegreeBook> = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{
			title: 'Năm',
			dataIndex: 'year',
			align: 'center',
			key: 'year',
			sorter: (a, b) => a.year - b.year,
		},

		{
			title: 'Số lượng văn bằng',
			dataIndex: 'currentSequenceNumber',
			key: 'currentSequenceNumber',
			align: 'center',
		},

		{
			title: 'Hành động',
			key: 'actions',
			align: 'center',
			render: (_, record) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Chỉnh sửa
					</Button>
					<Button
						style={{ marginLeft: 10 }}
						onClick={() => {
							const dataLocal: any = JSON.parse(localStorage.getItem('degreeBooks') as any);
							const updatedBooks = dataLocal.filter((item: any) => item.id !== record.id);
							localStorage.setItem('degreeBooks', JSON.stringify(updatedBooks));
							getDataDegreeBook();
						}}
						type='primary'
					>
						Delete
					</Button>
					<Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>
						Xem chi tiết
					</Button>
				</Space>
			),
		},
	];

	return (
		<div>
			<h1>Quản lý sổ văn bằng</h1>
			<Button type='primary' icon={<PlusOutlined />} onClick={handleAddNew} style={{ marginBottom: 16 }}>
				Thêm sổ mới
			</Button>
			<Table columns={columns} dataSource={degreeBooks} rowKey='id' pagination={{ pageSize: 10 }} />
			<Modal
				destroyOnClose
				footer={false}
				title={selectedBook ? 'Chỉnh sửa sổ văn bằng' : 'Thêm sổ văn bằng'}
				visible={isModalVisible}
				onOk={() => {}}
				onCancel={handleModalCancel}
			>
				<FormDegreeBook />
			</Modal>
			<Modal
				title={`Chi tiết sổ văn bằng - Năm ${selectedBook?.year}`}
				visible={isDetail}
				onCancel={handleModalCancel}
				footer={null}
			>
				<p>Danh sách văn bằng trong sổ:</p>
				{/* Render danh sách văn bằng  */}
				{/* {selectedBook ? (
					<Table dataSource={degreeList.filter((vb) => vb.so_van_bang_id === selectedBook.id)} rowKey='entryNumber'>
						<Table.Column title='Số vào sổ' dataIndex='entryNumber' key='entryNumber' />
						<Table.Column title='Số hiệu văn bằng' dataIndex='degreeNumber' key='degreeNumber' />
						<Table.Column title='Năm' dataIndex='year' key='year' />
					</Table>
				) : (
					<p>Chưa có văn bằng nào trong sổ này.</p>
				)} */}
			</Modal>
		</div>
	);
};

export default DegreeBookManagement;
