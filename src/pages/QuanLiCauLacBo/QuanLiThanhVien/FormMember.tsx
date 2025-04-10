import React, { useState } from 'react';
import { Input, Select, Button, message } from 'antd';
import type { Member } from '@/types/QuanLiCauLacBo';
import { useModel } from 'umi';
const { Option } = Select;

const clubs = ['CLB Bóng đá', 'CLB Âm nhạc', 'CLB Tin học']; // Tuỳ chỉnh danh sách CLB

const FormMember: React.FC<{
	onSave: (member: Member) => void;
	member?: Member;
}> = ({ onSave, member }) => {
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

	// const handleSave = () => {
	// 	if (!id || !fullName || !email || !phone || !clubId) {
	// 		message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
	// 		return;
	// 	}

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
	z``;
	// 	onSave(newMember);
	// };

	return (
		<div>
			<div>
				<label>Mã thành viên:</label>
				<Input
					placeholder='Nhập mã thành viên'
					value={id}
					onChange={(e) => setId(e.target.value)}
					disabled={!!member}
				/>
			</div>

			<div>
				<label>Họ tên:</label>
				<Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
			</div>

			<div>
				<label>Email:</label>
				<Input value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>

			<div>
				<label>Số điện thoại:</label>
				<Input value={phone} onChange={(e) => setPhone(e.target.value)} />
			</div>

			<div>
				<label>Giới tính:</label>
				<Select value={gender} onChange={setGender} style={{ width: '100%' }}>
					<Option value='Male'>Nam</Option>
					<Option value='Female'>Nữ</Option>
					<Option value='Other'>Khác</Option>
				</Select>
			</div>

			<div>
				<label>Địa chỉ:</label>
				<Input value={address} onChange={(e) => setAddress(e.target.value)} />
			</div>

			<div>
				<label>Sở trường:</label>
				<Input value={strengths} onChange={(e) => setStrengths(e.target.value)} />
			</div>

			<div>
				<label>CLB:</label>
				<Select placeholder='Chọn CLB' value={clubId} onChange={setClubId} style={{ width: '100%' }}>
					{clubs.map((club) => (
						<Option key={club} value={club}>
							{club}
						</Option>
					))}
				</Select>
			</div>

			<div style={{ marginTop: 16 }}>
				<Button type='primary' onClick={handleSave}>
					Lưu
				</Button>
			</div>
		</div>
	);
};

export default FormMember;
