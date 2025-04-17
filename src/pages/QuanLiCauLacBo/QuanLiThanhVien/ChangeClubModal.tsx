import React, { useState } from 'react';
import { Form, Select, Button, Modal, message } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { Club } from '@/types/QuanLiCauLacBo';
import { Model } from '@/.umi/plugin-model/Provider';

const { Option } = Select;

interface ChangeClubModalProps {
	visible: boolean;
	clubs: Club[];
	count: number;
	onCancel: () => void;
	onSubmit: (targetClubId: string) => void;
}

const ChangeClubModal: React.FC<ChangeClubModalProps> = ({ visible, clubs, count, onCancel, onSubmit }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			setLoading(true);
			await onSubmit(values.targetClubId);
			form.resetFields();
		} catch (error) {
			message.error('Lỗi khi gửi form');
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};

	return (
		<Modal
			title={`Chuyển ${count} thành viên sang câu lạc bộ khác`}
			visible={visible}
			onCancel={handleCancel}
			footer={[
				<Button key='cancel' onClick={handleCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' icon={<SwapOutlined />} loading={loading} onClick={handleSubmit}>
					Chuyển câu lạc bộ
				</Button>,
			]}
		>
			<Form form={form} layout='vertical'>
				<Form.Item
					name='targetClubId'
					label='Chọn câu lạc bộ đích'
					rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ đích' }]}
				>
					<Select placeholder='Chọn câu lạc bộ muốn chuyển đến'>
						{clubs.map((club) => (
							<Option key={club.id} value={club.id}>
								{club.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<p>
					{count} thành viên đã chọn sẽ được chuyển sang câu lạc bộ mới. Hành động này sẽ cập nhật thông tin thành viên
					và không thể hoàn tác.
				</p>
			</Form>
		</Modal>
	);
};

export default ChangeClubModal;
