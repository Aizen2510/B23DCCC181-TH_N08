import { Button, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';
import { BieuMau } from '@/types';

const { Option } = Select;

const FormConfig = () => {
	const {
		getCertificateTemplateField,
		isEdit,
		isModalVisible,
		setIsModalVisible,
		fields,
		setFields,
		selectedField,
		setSelectedField,
		addField,
		updateField,
	} = useModel('degreebook');
	const [form] = Form.useForm();
	const handleSubmit = () => {
		form.validateFields().then(async (values: any) => {
			const newField: BieuMau.CertificateTemplateField = {
				...values,
				id: selectedField?.id || `${fields.length + 1}`,
			};

			if (selectedField) {
				await updateField(newField);
				message.success('Cập nhật quyết định thành công');
			} else {
				await addField(newField);
				message.success('Thêm quyết định thành công');
			}
			setIsModalVisible(false);
			form.resetFields();
		});
	};

	return (
		<Form
			// initialValues={{
			// 	name: selectedField?.name || '',
			// 	type: selectedField?.dataType || undefined,
			// }}
			form={form}
			layout='vertical'
			onFinish={handleSubmit}
		>
			<Form.Item label='Tên trường' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Kiểu dữ liệu'
				name='dataType'
				rules={[{ required: true, message: 'Vui lòng chọn loại dữ liệu!' }]}
			>
				<Select>
					<Option value='String'>String</Option>
					<Option value='Number'>Number</Option>
					<Option value='Date'>Date</Option>
				</Select>
			</Form.Item>
			<Form.Item
				name='inputControl'
				label='Điều khiển nhập liệu'
				rules={[{ required: true, message: 'Vui lòng chọn điều khiển nhập liệu!' }]}
			>
				<Select placeholder='Chọn điều khiển nhập liệu'>
					<Option value='Input'>Input</Option>
					<Option value='Select'>Select</Option>
					<Option value='Date-picker'>Date Picker</Option>
					<Option value='Input-number'>Input Number</Option>
					<Option value='Text-area'>Text Area</Option>
				</Select>
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Insert' : 'Save'}
				</Button>
				<Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
			</div>
		</Form>
	);
};

export default FormConfig;
