import React, { useEffect } from 'react';
import { Card, Button, Select, Input, Table, Modal, Form, Space, Avatar, Tag, Tooltip } from 'antd';
import {
	UserAddOutlined,
	UserOutlined,
	ExclamationCircleOutlined,
	EditOutlined,
	CalendarOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { PageHeader } from 'antd';
import { useModel } from 'umi';
import type { IColumn } from '@/components/Table/typing';
import FormStaff from './FormStaff';
import { localStorageService } from '../../services/localStorageService';
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
const StaffManagement: React.FC = () => {
	const {
		staffs,
		setStaffs,
		isEdit,
		visible,
		setVisible,
		setIsEdit,
		setSelectedStaff,
		setFileList,
		setIsScheduleModalVisible,
		filterStatus,
		searchText,
		selectedStaff,
		setFilterStatus,
		setSearchText,
	} = useModel('QuanLiNhanVien.Staff');
	const [form] = Form.useForm();

	useEffect(() => {
		const loadedStaff = localStorageService.getStaffList();
		setStaffs(loadedStaff || []);
	}, []);

	const saveToLocalStorage = (updatedStaff: StaffManagement.Staff[]) => {
		localStorageService.setStaffList(updatedStaff);
		setStaffs(updatedStaff);
	};

	// Lọc danh sách nhân viên theo trạng thái và tìm kiếm
	const filteredStaff = staffs.filter((staff) => {
		const matchSearch =
			staff.name.toLowerCase().includes(searchText.toLowerCase()) ||
			staff.email.toLowerCase().includes(searchText.toLowerCase()) ||
			staff.phone.includes(searchText);

		if (filterStatus === 'all') return matchSearch;
		if (filterStatus === 'active') return matchSearch && staff.isActive;
		if (filterStatus === 'inactive') return matchSearch && !staff.isActive;

		return matchSearch;
	});

	const showModal = (staff?: StaffManagement.Staff) => {
		if (staff) {
			setSelectedStaff(staff);
			form.setFieldsValue({
				...staff,
				specialties: staff.specialties.join(', '),
			});
			setIsEdit(true);
		} else {
			setSelectedStaff(null);
			form.resetFields();
			setIsEdit(false);
		}
		setVisible(true);
	};
	const showScheduleModal = (staff: StaffManagement.Staff) => {
		setSelectedStaff(staff);
		setIsScheduleModalVisible(true);
	};
	const handleDeleteStaff = (staff: StaffManagement.Staff) => {
		confirm({
			title: 'Bạn có chắc chắn muốn xóa nhân viên này?',
			icon: <ExclamationCircleOutlined />,
			content: `Nhân viên: ${staff.name}`,
			onOk() {
				const updatedStaffs = staffs.filter((s) => s.id !== staff.id);
				saveToLocalStorage(updatedStaffs);
				setStaffs(updatedStaffs);
			},
			onCancel() {
				console.log('Hủy xóa nhân viên');
			},
		});
	};

	const handleCancel = () => {
		setVisible(false);
		form.resetFields();
		setFileList([]);
	};

	const handleSaveStaff = () => {
		form.validateFields().then((values) => {
			const newStaff: StaffManagement.Staff = {
				id: selectedStaff ? selectedStaff.id : Date.now().toString(),
				...values,
				specialties: values.specialties ? values.specialties.split(',').map((s: string) => s.trim()).filter(Boolean) : [],///
				isActive: Boolean(values.isActive),///dá
			};
			const updatedStaffs = isEdit
				? staffs.map((s) => (s.id === selectedStaff?.id ? newStaff : s))
				: [...staffs, newStaff];
			saveToLocalStorage(updatedStaffs);
			setStaffs(updatedStaffs);
			setVisible(false);
			form.resetFields();
		});
	};

	const columns: IColumn<StaffManagement.Staff>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 70,
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'name',
			key: 'name',
			width: 30,
			render: (text: string, record: StaffManagement.Staff) => (
				<Space>
					<Avatar icon={<UserOutlined />} />
					{text}
				</Space>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 30,
		},
		{
			title: 'Điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 30,
		},
		{
			title: 'Chuyên môn',
			dataIndex: 'specialties',
			key: 'specialties',
			width: 30,
			render: (specialties: string[]) => (
				<>
					{specialties.map((specialty) => (
						<Tag color='blue' key={specialty}>
							{specialty}
						</Tag>
					))}
				</>
			),
		},
		{
			title: 'Số lịch hẹn tối đa/ngày',
			dataIndex: 'maxAppointmentsPerDay',
			key: 'maxAppointmentsPerDay',
			width: 30,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			key: 'isActive',
			width: 30,
			render: (isActive: boolean) => (
				<Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Đang hoạt động' : 'Không hoạt động'}</Tag>
			),
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 30,
			render: (text: string, record: StaffManagement.Staff) => (
				<Space size='middle'>
					<Tooltip title='Sửa thông tin'>
						<Button
							type='primary'
							shape='circle'
							icon={<EditOutlined />}
							size='small'
							onClick={() => showModal(record)}
						/>
					</Tooltip>
					<Tooltip title='Quản lý lịch làm việc'>
						<Button
							type='default'
							shape='circle'
							icon={<CalendarOutlined />}
							size='small'
							onClick={() => showScheduleModal(record)}
						/>
					</Tooltip>
					<Tooltip title='Xóa nhân viên'>
						<Button
							type='default'
							danger
							shape='circle'
							icon={<DeleteOutlined />}
							size='small'
							onClick={() => handleDeleteStaff(record)}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div className='staff-management'>
			<PageHeader title='Quản lý nhân viên' />
			<Card>
				<div className='table-operations'>
					<div className='table-operations-left'>
						<Button type='primary' icon={<UserAddOutlined />} onClick={() => showModal()}>
							Thêm nhân viên mới
						</Button>
					</div>
					<div className='table-operations-right'>
						<Select defaultValue='all' onChange={setFilterStatus} style={{ width: 150, marginRight: 16 }}>
							<Option value='all'>Tất cả trạng thái</Option>
							<Option value='active'>Đang làm việc</Option>
							<Option value='inactive'>Ngừng làm việc</Option>
						</Select>
						<Search placeholder='Tìm kiếm nhân viên' allowClear onSearch={setSearchText} style={{ width: 250 }} />
					</div>
				</div>
				{/* <Table dataSource={data} columns={columns} /> */}
				<Table columns={columns} dataSource={filteredStaff} rowKey='id' pagination={{ pageSize: 10 }} />
			</Card>

			<Modal
				title={isEdit ? 'Cập nhật thông tin nhân viên' : 'Thêm nhân viên mới'}
				visible={visible}
				onCancel={handleCancel}
				onOk={handleSaveStaff}
				width={700}
				footer={false}
				// destroyOnClose
				// footer={false}
				// title={isEdit ? 'Edit User' : 'Add User'}
				// visible={visible}
				// onOk={() => {}}
				// onCancel={() => {
				// 	setVisible(false);
				// }}
			>
				<FormStaff form={form} onSave={handleSaveStaff} />
			</Modal>
		</div>
	);
};

export default StaffManagement;