import React, { useState } from 'react';
import { Modal, Select, message, Typography, List } from 'antd';
import type { Member, Club } from '@/types/quanlyclb';

const { Option } = Select;
const { Text } = Typography;

interface Props {
	open: boolean;
	onClose: () => void;
	selectedMembers: Member[];
	clubs: Club[];
	onChangeClub: (newClubId: string) => void;
}

const FormChangeMemberClub: React.FC<Props> = ({ open, onClose, selectedMembers, clubs, onChangeClub }) => {
	const [selectedClubId, setSelectedClubId] = useState<string | undefined>(undefined);

	const handleSubmit = () => {
		if (!selectedClubId) {
			message.error('Vui lòng chọn CLB muốn chuyển đến!');
			return;
		}

		onChangeClub(selectedClubId);
		message.success(`Đã chuyển ${selectedMembers.length} thành viên đến CLB mới.`);
		setSelectedClubId(undefined);
		onClose();
	};

	const handleCancel = () => {
		setSelectedClubId(undefined);
		onClose();
	};

	return (
		<Modal
			title='Chuyển CLB cho thành viên'
			open={open}
			onCancel={handleCancel}
			onOk={handleSubmit}
			okText='Xác nhận'
			cancelText='Hủy'
		>
			<Text>
				Bạn đang đổi CLB cho <strong>{selectedMembers.length}</strong> thành viên:
			</Text>
			<List
				size='small'
				bordered
				dataSource={selectedMembers}
				renderItem={(member) => <List.Item>{member.fullName}</List.Item>}
				style={{ marginTop: 16, maxHeight: 150, overflowY: 'auto' }}
			/>

			<div style={{ marginTop: 16 }}>
				<label>Chọn CLB mới:</label>
				<Select
					style={{ width: '100%', marginTop: 8 }}
					placeholder='Chọn CLB'
					value={selectedClubId}
					onChange={(value) => setSelectedClubId(value)}
				>
					{clubs.map((club) => (
						<Option key={club.id} value={club.id}>
							{club.name}
						</Option>
					))}
				</Select>
			</div>
		</Modal>
	);
};

export default FormChangeMemberClub;
