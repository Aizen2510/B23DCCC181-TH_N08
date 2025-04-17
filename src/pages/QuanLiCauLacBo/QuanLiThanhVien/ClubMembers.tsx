import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, message, Modal, Space, Popconfirm, Col, Row, Badge } from 'antd';
import FormMember from './FormMember';
import { v4 as uuidv4 } from 'uuid';
import type { Member } from '@/types/QuanLiCauLacBo';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, ExportOutlined, SwapOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteMember, changeMembersClub } from '@/services/QuanLiCauLacBo/memberService';
import { getClubNameById } from '@/services/QuanLiCauLacBo/clubManagementService';
import type { ColumnsType } from 'antd/es/table';
import ChangeClubModal from './ChangeClubModal';
import exportMembersToExcel from '../../../utils/excelExport';
const { Option } = Select;
const { confirm } = Modal;
interface MemberListProps {
	clubId?: string;
}

const ClubMembers: React.FC<MemberListProps> = ({ clubId: initialClubId }) => {
	const {
		isModalVisible,
		setIsModalVisible,
		isDetail,
		setIsDetail,
		isLoading,
		setLoading,
		searchText,
		setSearchText,
		members,
		setMembers,
		admin,
		setAdmin,
		currentAdmin,
		setCurrentAdmin,
		selectedMembers,
		setSelectedMembers,
		selectedClubFilter,
		setSelectedClubFilter,
		selectedRowKeys,
		setSelectedRowKeys,
		isChangeClubModalVisible,
		setIsChangeClubModalVisible,
		fetchMembers,
		getApprovedMembersByClub,
	} = useModel('QuanLiCauLacBo.members');
	const { fetchClub, selectedClubId, setSelectedClubId, clubs } = useModel('QuanLiCauLacBo.clubs');

	useEffect(() => {
		fetchClub();
	}, []);

	useEffect(() => {
		fetchMembers();
	}, [selectedClubId]);

	const handleSearch = (value: string) => {
		setSearchText(value);
	};

	const handleClubFilterChange = (value: string) => {
		setSelectedClubId(value);
	};

	const handleExportExcel = () => {
		if (members.length === 0) {
			message.warning('Không có dữ liệu để xuất');
			return;
		}

		const currentClub = clubs.find((club) => club.id === selectedClubId);
		const filename = currentClub ? `Thành viên CLB ${currentClub.name}.xlsx` : 'Danh sách thành viên.xlsx';

		try {
			exportMembersToExcel(members, clubs, filename);
			message.success(`Đã xuất file ${filename}`);
		} catch (error) {
			message.error('Không thể xuất file Excel');
		}
	};

	const handleChangeClubClick = () => {
		if (selectedRowKeys.length === 0) {
			message.warning('Vui lòng chọn ít nhất một thành viên');
			return;
		}
		setIsChangeClubModalVisible(true);
	};

	const handleChangeClub = async (targetClubId: string) => {
		if (!targetClubId) {
			message.error('Vui lòng chọn câu lạc bộ đích');
			return;
		}

		try {
			await changeMembersClub(selectedRowKeys as string[], targetClubId);
			message.success(`Đã chuyển ${selectedRowKeys.length} thành viên sang câu lạc bộ mới`);
			setSelectedRowKeys([]);
			setIsChangeClubModalVisible(false);
			fetchMembers();
		} catch (error) {
			message.error('Không thể chuyển câu lạc bộ');
		}
	};

	const filteredMembers = members.filter(
		(member) =>
			searchText === '' ||
			member.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			member.email.toLowerCase().includes(searchText.toLowerCase()) ||
			member.phone.includes(searchText),
	);

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedKeys: React.Key[]) => {
			setSelectedRowKeys(selectedKeys);
		},
	};

	const columns: ColumnsType<Member> = [
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
			key: 'fullName',
			sorter: (a: Member, b: Member) => a.fullName.localeCompare(b.fullName),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			key: 'gender',
			render: (gender: string) => {
				switch (gender) {
					case 'Male':
						return 'Nam';
					case 'Female':
						return 'Nữ';
					default:
						return 'Khác';
				}
			},
			filters: [
				{ text: 'Nam', value: 'Male' },
				{ text: 'Nữ', value: 'Female' },
				{ text: 'Khác', value: 'Other' },
			],
			onFilter: (value: string | number | boolean, record: Member) => record.gender === value,
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'clubId',
			key: 'clubId',
			render: (clubId: string) => getClubNameById(clubId),
			// Only show this column when no club is selected
			hidden: !!selectedClubId,
		},
		{
			title: 'Sở trường',
			dataIndex: 'strengths',
			key: 'strengths',
			ellipsis: true,
		},
		{
			title: 'Ngày tham gia',
			dataIndex: 'joinedAt',
			key: 'joinedAt',
			render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
			sorter: (a: Member, b: Member) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
		},
	].filter((column) => !(column as any).hidden);

	return (
		<div>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col>
					<Input
						placeholder='Tìm kiếm theo tên, email, SĐT'
						onChange={(e) => handleSearch(e.target.value)}
						suffix={<SearchOutlined />}
						allowClear
					/>
				</Col>
				<Col span={8}>
					<Select
						placeholder='Chọn câu lạc bộ'
						style={{ width: '100%' }}
						value={selectedClubId}
						onChange={handleClubFilterChange}
						allowClear
					>
						{clubs.map((club) => (
							<Option key={club.id} value={club.id}>
								{club.name}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={8}>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
						<Badge count={selectedRowKeys.length} offset={[-8, 0]}>
							<Button onClick={handleChangeClubClick} icon={<SwapOutlined />} disabled={selectedRowKeys.length === 0}>
								Chuyển CLB
							</Button>
						</Badge>
						<Button
							type='primary'
							icon={<ExportOutlined />}
							onClick={handleExportExcel}
							disabled={members.length === 0}
						>
							Xuất Excel
						</Button>
					</div>
				</Col>
			</Row>

			<Table
				dataSource={filteredMembers}
				columns={columns}
				rowKey='id'
				loading={isLoading}
				pagination={{ pageSize: 10 }}
				rowSelection={rowSelection}
			/>

			<ChangeClubModal
				visible={isChangeClubModalVisible}
				clubs={clubs.filter((club) => club.id !== selectedClubId)}
				count={selectedRowKeys.length}
				onCancel={() => setIsChangeClubModalVisible(false)}
				onSubmit={handleChangeClub}
			/>
		</div>
	);
};

export default ClubMembers;
