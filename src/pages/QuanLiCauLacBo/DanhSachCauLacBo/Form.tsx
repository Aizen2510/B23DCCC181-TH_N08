import { Form, Input, Button, DatePicker, Space, Switch, message } from 'antd';
import { useModel } from 'umi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import { updateClub, addClub } from '@/services/QuanLiCauLacBo/clubManagementService';
import { Club } from '@/types/QuanLiCauLacBo';
const FormClub = () => {
	const { setIsModalVisible, currentClub, fetchClub } = useModel('QuanLiCauLacBo.clubs');
	const [form] = Form.useForm();
	const handleSubmit = () => {
		form.validateFields().then(async (values: any) => {
			const clubData: Club = {
				id: currentClub ? currentClub.id : uuidv4(),
				name: values.name,
				avatarUrl: values.avatarUrl || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				establishedDate: values.establishedDate.format('YYYY-MM-DD'),
				description: values.description,
				leader: values.leader,
				isActive: values.isActive,
			};

			if (currentClub) {
				updateClub(clubData);
				message.success('Cập nhật câu lạc bộ thành công!');
			} else {
				addClub(clubData);
				message.success('Thêm câu lạc bộ mới thành công!');
			}

			setIsModalVisible(false);
			fetchClub();
			// form.resetFields();
		});
	};
	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit} initialValues={currentClub || {}}>
			<Form.Item
				name='name'
				label='Tên câu lạc bộ'
				rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ!' }]}
			>
				<Input placeholder='Nhập tên câu lạc bộ' />
			</Form.Item>

			<Form.Item name='avatarUrl' label='Ảnh đại diện'>
				<Input placeholder='Nhập URL ảnh đại diện' />
			</Form.Item>

			<Form.Item
				name='establishedDate'
				label='Ngày thành lập'
				rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập!' }]}
			>
				<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
			</Form.Item>

			<Form.Item name='description' label='Mô tả' rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
				<ReactQuill theme='snow' />
			</Form.Item>

			<Form.Item
				name='leader'
				label='Chủ nhiệm CLB'
				rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm!' }]}
			>
				<Input placeholder='Nhập tên chủ nhiệm câu lạc bộ' />
			</Form.Item>

			<Form.Item name='isActive' label='Trạng thái hoạt động' valuePropName='checked'>
				<Switch checkedChildren='Hoạt động' unCheckedChildren='Ngừng hoạt động' />
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type='primary' htmlType='submit'>
						{currentClub ? 'Cập nhật' : 'Thêm mới'}
					</Button>
					<Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};
export default FormClub;
