import React, { useState, useEffect } from 'react';
import {
	Table,
	Button,
	Space,
	Input,
	Modal,
	Form,
	DatePicker,
	Switch,
	Upload,
	message,
	Popconfirm,
	Typography,
	Tag,
	Avatar,
	Row,
	Col,
} from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	UploadOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from 'umi';
import { Club, Member } from '@/types/QuanLiCauLacBo';
// import { useNavigate } from 'react-router-dom';

import { getClubs, addClub, updateClub, deleteClub } from '@/services/QuanLiCauLacBo/clubManagementService';
import FormClub from './Form';
const { Title, Text } = Typography;
const { Search } = Input;
const ClubList: React.FC = () => {
	const {
		clubs,
		setClubs,
		isLoading,
		setLoading,
		setSearchText,
		filteredClubs,
		setIsModalVisible,
		setCurrentClub,
		currentClub,
		isModalVisible,
		fetchClub,
		searchText,
		applyFilters,
		isEdit,
	} = useModel('QuanLiCauLacBo.clubs');

	const [form] = Form.useForm();
	// const navigate = useNavigate();

	useEffect(() => {
		fetchClub();
	}, []);

	// Cập nhật bộ lọc và tìm kiếm
	useEffect(() => {
		applyFilters(clubs, searchText);
	}, [searchText, clubs]);

	const showModal = (club?: Club) => {
		setCurrentClub(club || null);

		setIsModalVisible(true);
	};

	const handleDelete = (id: string) => {
		deleteClub(id);
		message.success('Xóa câu lạc bộ thành công!');
		fetchClub();
	};
	const viewMembers = (id: string) => {
		// navigate(`/quan-li-cau-lac-bo/thanh-vien/${id}`);
	};
	const columns: ColumnsType<Club> = [
		{
			title: 'Ảnh đại diện',
			dataIndex: 'avatarUrl',
			key: 'avatarUrl',
			render: (text: string) => <Avatar src={text} size={50} />,
		},
		{
			title: 'Tên câu lạc bộ',
			dataIndex: 'name',
			key: 'name',
			sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'establishedDate',
			key: 'establishedDate',
			sorter: (a: Club, b: Club) => moment(a.establishedDate).unix() - moment(b.establishedDate).unix(),
		},
		{
			title: 'Chủ nhiệm CLB',
			dataIndex: 'leader',
			key: 'leader',
			sorter: (a: Club, b: Club) => a.leader.localeCompare(b.leader),
		},
		{
			title: 'Hoạt động',
			dataIndex: 'isActive',
			key: 'isActive',
			render: (active: boolean) =>
				active ? <Tag color='green'>Đang hoạt động</Tag> : <Tag color='red'>Ngừng hoạt động</Tag>,
			sorter: (a: Club, b: Club) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1),
			filters: [
				{ text: 'Đang hoạt động', value: true },
				{ text: 'Ngừng hoạt động', value: false },
			],
			onFilter: (value: string | number | boolean, record: Club) => record.isActive === Boolean(value),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (text: string, record: Club) => (
				<Space size='small'>
					<Button type='primary' icon={<EditOutlined />} onClick={() => showModal(record)} size='small' />
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa câu lạc bộ này?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button type='primary' danger icon={<DeleteOutlined />} size='small' />
					</Popconfirm>
					<Button type='default' icon={<EyeOutlined />} onClick={() => viewMembers(record.id)} size='small' />
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '14px' }}>
			<Row gutter={[16, 16]} align='middle'>
				<Col span={12}>
					<Title level={2}>Quản Lý Câu Lạc Bộ</Title>
				</Col>
				<Col span={12} style={{ textAlign: 'right' }}>
					<Space>
						<Input
							placeholder='Tìm kiếm theo tên CLB hoặc chủ nhiệm'
							// value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							style={{ width: 300 }}
							prefix={<SearchOutlined />}
							allowClear
						/>
						<Button type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
							Thêm câu lạc bộ mới
						</Button>
					</Space>
				</Col>
			</Row>

			<Table
				columns={columns}
				dataSource={filteredClubs}
				rowKey='id'
				loading={isLoading}
				pagination={{ pageSize: 10 }}
				expandable={{
					expandedRowRender: (record) => (
						<div style={{ margin: 0 }}>
							<Text strong>Mô tả:</Text>
							<div dangerouslySetInnerHTML={{ __html: record.description }} />
						</div>
					),
				}}
			/>

			{/* Add/Edit Club Modal */}
			<Modal
				title={currentClub ? 'Chỉnh sửa câu lạc bộ' : 'Thêm câu lạc bộ mới'}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onOk={() => {}}
				footer={null}
				width={800}
			>
				<FormClub initialValues={currentClub} />
			</Modal>

			{/* Club Members Modal */}
			{/* <Modal
        title="Danh sách thành viên"
        visible={showMembers}
        onCancel={() => setShowMembers(false)}
        footer={null}
        width={1000}
      >
        <ClubMembers clubId={selectedClubId} />
      </Modal> */}
		</div>
	);
};
export default ClubList;
