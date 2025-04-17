import { Button, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';
import React, { useEffect } from 'react';
import type { ApplicationForm } from '@/types/QuanLiCauLacBo';
import { v4 as uuidv4 } from 'uuid';
import {
	getApplicationForms,
	updateApplicationForms,
	addApplicationForms,
} from '@/services/QuanLiCauLacBo/applicationFormService';
const { Option } = Select;

const FormInput = () => {
	const [form] = Form.useForm();
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
		applicationForm,
		setApplicationForm,
		currentApplicationForm,
		fetchApplications,
		fetchHistory,
	} = useModel('QuanLiCauLacBo.applicationform');

	const { clubs, fetchClub } = useModel('QuanLiCauLacBo.clubs');

	useEffect(() => {
		fetchClub();
		fetchApplications();
	}, []);

	useEffect(() => {
		if (currentApplicationForm) {
			form.setFieldsValue(currentApplicationForm);
		} else {
			form.resetFields();
		}
	}, [currentApplicationForm]);

	const handleSubmit = () => {
		form.validateFields().then(async (values: any) => {
			const formData: ApplicationForm = { ...values, id: currentApplicationForm?.id || uuidv4() };

			if (currentApplicationForm) {
				updateApplicationForms(formData);
				message.success('Cập nhật câu lạc bộ thành công!');
			} else {
				addApplicationForms(formData);
				message.success('Thêm câu lạc bộ mới thành công!');
			}
			setIsModalVisible(false);
			fetchApplications();
		});
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit}>
			<Form.Item name='fullName' label='Họ Tên' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='email' label='Email' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='phone' label='Số Điện Thoại' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='gender' label='Giới Tính' rules={[{ required: true }]}>
				<Select placeholder='Chọn giới tính'>
					<Option value='Nam'>Nam</Option>
					<Option value='Nữ'>Nữ</Option>
					<Option value='Khác'>Khác</Option>
				</Select>
			</Form.Item>
			<Form.Item name='address' label='Địa Chỉ' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='strengths' label='Điểm Mạnh' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			{/* nên kiểm tra xem clubs có được truyền vào hay là một mảng rỗng, nếu không sẽ gây lỗi  */}
			<Form.Item name='clubId' label='Câu lạc bộ muốn đăng ký' rules={[{ required: true }]}>
				<Select placeholder='Chọn một câu lạc bộ'>
					{clubs && clubs.length > 0 ? (
						clubs.map((item) => (
							<Option key={item.id} value={item.id}>
								{item.name}
							</Option>
						))
					) : (
						<Option disabled>Không có câu lạc bộ nào</Option>
					)}
				</Select>
			</Form.Item>
			<Form.Item name='reason' label='Lý Do Đăng Ký' rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name='status' label='Trạng Thái' rules={[{ required: true }]}>
				<Select placeholder='Chọn trạng thái'>
					<Option value='Pending'>Pending</Option>
					<Option value='Approved'>Approved</Option>
					<Option value='Rejected'>Rejected</Option>
				</Select>
			</Form.Item>
			<Form.Item name='note' label='Ghi Chú'>
				<Input />
			</Form.Item>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button htmlType='submit' type='primary'>
					{currentApplicationForm ? 'Lưu' : 'Thêm Đơn'}
				</Button>
				<Button onClick={() => setIsModalVisible(false)}>Đóng</Button>
			</div>
		</Form>
	);
};

export default FormInput;
