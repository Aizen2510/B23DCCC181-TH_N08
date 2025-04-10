import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, message, Modal, Space, Popconfirm } from 'antd';
import FormMember from './FormMember';
import { v4 as uuidv4 } from 'uuid';
import type { Member } from '@/types/QuanLiCauLacBo';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteMember } from '@/services/QuanLiCauLacBo/clubManagementService';
const { Option } = Select;

interface ClubMembersProps {
	clubId: string;
	viewMode?: 'all' | 'approved'; // 'all' hiển thị tất cả đơn, 'approved' chỉ hiển thị thành viên đã được duyệt
}

const ClubMembers: React.FC = () => {
	const {
		members,
		setMembers,
		selectedMembers,
		setSelectedMembers,
		setIsModalVisible,
		search,
		selectedClubFilter,
		sortBy,
		setSearch,
		setSelectedClubFilter,
		setSortBy,
		isModalVisible,
	} = useModel('QuanLiCauLacBo.clubs');

	useEffect(() => {
		localStorage.setItem('members', JSON.stringify(members));
	}, [members]);

	const handleSave = (member: Member) => {
		const exists = members.some((m) => m.id === member.id);
		if (!selectedMembers && exists) {
			message.error('Mã thành viên đã tồn tại!');
			return;
		}

		setMembers((prev) => (selectedMembers ? prev.map((m) => (m.id === member.id ? member : m)) : [...prev, member]));

		setIsModalVisible(false);
		// setSelectedMembers();
	};

	const showModal = (member?: Member) => {
		setSelectedMembers(member || null);

		setIsModalVisible(true);
	};

	const handleDelete = (id: string) => {
		deleteMember(id);
		message.success('Xóa câu lạc bộ thành công!');
		// fetchClub();
	};

	const filtered = members
		.filter((m) => m.fullName.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search))
		.filter((m) => (selectedClubFilter ? m.clubId === selectedClubFilter : true))
		.sort((a, b) => {
			if (sortBy === 'joinedAt') {
				return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
			}
			return a.fullName.localeCompare(b.fullName);
		});

	return (
		<div>
			<Button type='primary' onClick={() => setIsModalVisible(true)}>
				Thêm thành viên
			</Button>

			<Input
				placeholder='Tìm kiếm theo mã hoặc tên thành viên'
				onChange={(e) => setSearch(e.target.value)}
				style={{ margin: '8px 0' }}
			/>

			<Select
				onChange={setSelectedClubFilter}
				placeholder='Lọc theo CLB'
				style={{ width: 200, marginRight: 8 }}
				allowClear
			>
				<Option value=''>Tất cả CLB</Option>
				<Option value='CLB Bóng đá'>CLB Bóng đá</Option>
				<Option value='CLB Âm nhạc'>CLB Âm nhạc</Option>
				<Option value='CLB Tin học'>CLB Tin học</Option>
			</Select>

			<Select onChange={(value) => setSortBy(value)} value={sortBy} style={{ width: 180 }}>
				<Option value='joinedAt'>Ngày tham gia</Option>
				<Option value='fullName'>Tên thành viên</Option>
			</Select>

			<Table
				dataSource={filtered.map((m) => ({ ...m, key: m.id }))}
				columns={[
					{ title: 'Mã thành viên', dataIndex: 'id' },
					{ title: 'Họ tên', dataIndex: 'fullName' },
					{ title: 'Email', dataIndex: 'email' },
					{ title: 'Điện thoại', dataIndex: 'phone' },
					{ title: 'Giới tính', dataIndex: 'gender' },
					{ title: 'CLB', dataIndex: 'clubId' },
					{ title: 'Ngày tham gia', dataIndex: 'joinedAt' },
					{
						title: 'Hành động',
						render: (_: any, record: Member) => (
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
							</Space>
						),
					},
				]}
			/>

			{isModalVisible && (
				<Modal
					visible={true}
					onCancel={() => {
						setIsModalVisible(false);
						// setSelectedMembers(false);
					}}
					footer={null}
				>
					<FormMember onSave={handleSave} member={selectedMembers || undefined} />
				</Modal>
			)}
		</div>
	);
};

export default ClubMembers;
