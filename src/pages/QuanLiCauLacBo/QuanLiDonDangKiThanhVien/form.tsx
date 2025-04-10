import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';
import React, { useEffect } from 'react';
import type { ApplicationForm } from '@/types/QuanLiCauLacBo';
import { v4 as uuidv4 } from 'uuid';
import { getApplicationForms } from '@/services/QuanLiCauLacBo/clubManagementService';
const { Option } = Select;

const FormInput = () => {
	const [form] = Form.useForm();
	const { applicationForm, setApplicationForm, isEdit, setIsModalVisible, currentapplicationForm } =
		useModel('QuanLiCauLacBo.clubs');

	useEffect(() => {
		if (currentapplicationForm) {
			form.setFieldsValue(currentapplicationForm);
		} else {
			form.resetFields();
		}
	}, [currentapplicationForm]);

	const handleSubmit = (values: ApplicationForm) => {
		const updated = isEdit
			? applicationForm.map((item) => (item.id === currentapplicationForm?.id ? values : item))
			: [{ ...values, id: values.id || Date.now().toString() }, ...applicationForm];

		localStorage.setItem('applicationForm', JSON.stringify(updated));
		setApplicationForm(updated);
		form.resetFields();
		setIsModalVisible(false);

		getApplicationForms();
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
			<Form.Item name='clubId' label='CLB Muốn Đăng Ký' rules={[{ required: true }]}>
				<Select placeholder='Chọn CLB'>
					<Option value='clb1'>CLB1</Option>
					<Option value='clb2'>CLB2</Option>
					<Option value='clb3'>CLB3</Option>
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
					{isEdit ? 'Lưu' : 'Thêm Đơn'}
				</Button>
				<Button onClick={() => setIsModalVisible(false)}>Đóng</Button>
			</div>
		</Form>
	);
};

export default FormInput;
