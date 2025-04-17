import React, { useState } from 'react';
import { Input, Select, Button, message, Form } from 'antd';
import type { Member } from '@/types/QuanLiCauLacBo';
import { useModel } from 'umi';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

const clubs = ['CLB Bóng đá', 'CLB Âm nhạc', 'CLB Tin học']; // Tuỳ chỉnh danh sách CLB

const FormMember: React.FC<{
	onSave: (member: Member) => void;
	member?: Member;
}> = ({ onSave, member }) => {
	const {
		isEdit,
		setEdit,
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
	} = useModel('QuanLiCauLacBo.members');

	const [form] = useForm();

	// const handleSave = () => {
	// 	const newMember: Member = {
	// 		id,
	// 		fullName,
	// 		email,
	// 		phone,
	// 		gender,
	// 		address,
	// 		strengths,
	// 		clubId,
	// 		joinedAt: member?.joinedAt || new Date().toISOString().split('T')[0],
	// 	};

	// 	onSave(newMember);
	// };

	return (
		<Form form={form} layout='vertical'>
			<Form.Item name='fullName' label='Họ và tên' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='email' label='Email'>
				<Input />
			</Form.Item>
			<Form.Item name='phone'></Form.Item>
			<Form.Item name='gender'></Form.Item>
			<Form.Item name='address'></Form.Item>
			<Form.Item name='strengths'></Form.Item>
			<Form.Item name='clubId'></Form.Item>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Lưu' : 'Thêm thành viên'}
				</Button>
				<Button onClick={() => setIsModalVisible(false)}>Đóng</Button>
			</div>
		</Form>
		// <div>
		// 	<div>
		// 		<label>Mã thành viên:</label>
		// 		<Input
		// 			placeholder='Nhập mã thành viên'
		// 			value={id}
		// 			onChange={(e) => setId(e.target.value)}
		// 			disabled={!!member}
		// 		/>
		// 	</div>

		// 	<div>
		// 		<label>Họ tên:</label>
		// 		<Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
		// 	</div>

		// 	<div>
		// 		<label>Email:</label>
		// 		<Input value={email} onChange={(e) => setEmail(e.target.value)} />
		// 	</div>

		// 	<div>
		// 		<label>Số điện thoại:</label>
		// 		<Input value={phone} onChange={(e) => setPhone(e.target.value)} />
		// 	</div>

		// 	<div>
		// 		<label>Giới tính:</label>
		// 		<Select value={gender} onChange={setGender} style={{ width: '100%' }}>
		// 			<Option value='Male'>Nam</Option>
		// 			<Option value='Female'>Nữ</Option>
		// 			<Option value='Other'>Khác</Option>
		// 		</Select>
		// 	</div>

		// 	<div>
		// 		<label>Địa chỉ:</label>
		// 		<Input value={address} onChange={(e) => setAddress(e.target.value)} />
		// 	</div>

		// 	<div>
		// 		<label>Sở trường:</label>
		// 		<Input value={strengths} onChange={(e) => setStrengths(e.target.value)} />
		// 	</div>

		// 	<div>
		// 		<label>CLB:</label>
		// 		<Select placeholder='Chọn CLB' value={clubId} onChange={setClubId} style={{ width: '100%' }}>
		// 			{clubs.map((club) => (
		// 				<Option key={club} value={club}>
		// 					{club}
		// 				</Option>
		// 			))}
		// 		</Select>
		// 	</div>

		// 	<div style={{ marginTop: 16 }}>
		// 		<Button type='primary' onClick={handleSave}>
		// 			Lưu
		// 		</Button>
		// 	</div>
		// </div>
	);
};

export default FormMember;
