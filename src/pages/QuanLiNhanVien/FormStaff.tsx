import { Button, Form, Input, Row, Col, InputNumber, Switch, Space, FormInstance } from 'antd';
import { useModel } from 'umi';

interface FormStaffProps {
	form: FormInstance; // Khai báo kiểu dữ liệu của form
}

const FormStaff: React.FC<FormStaffProps> = ({ form }) => {
	const { row, isEdit, setVisible } = useModel('Quanlinhanvien.Staff');

	return (
		<Form form={form} layout='vertical'>
			<Row gutter={16}>
				<Col span={16}>
					<Form.Item
						name='name'
						label='Tên nhân viên'
						rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
					>
						<Input placeholder='Nhập tên nhân viên' />
					</Form.Item>
					<Form.Item
						name='phone'
						label='Số điện thoại'
						rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
					>
						<Input placeholder='Nhập số điện thoại' />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{ required: true, message: 'Vui lòng nhập email' },
							{ type: 'email', message: 'Email không đúng định dạng' },
						]}
					>
						<Input placeholder='Nhập email' />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={16}>
					<Form.Item
						name='specialties'
						label='Chuyên môn'
						rules={[{ required: true, message: 'Vui lòng nhập chuyên môn' }]}
						help='Nhập các chuyên môn, phân cách bằng dấu phẩy'
					>
						<Input placeholder='Ví dụ: Cắt tóc nam, Cạo râu' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name='maxAppointmentsPerDay'
						label='Số lịch hẹn tối đa/ngày'
						rules={[{ required: true, message: 'Vui lòng nhập số lịch hẹn tối đa' }]}
					>
						<InputNumber min={1} max={20} style={{ width: '100%' }} />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item name='isActive' label='Trạng thái' valuePropName='checked' initialValue={true}>
				<Switch checkedChildren='Đang hoạt động' unCheckedChildren='Không hoạt động' />
			</Form.Item>
			<Form.Item>
				<Space>
					<Button type='primary' htmlType='submit'>
						{isEdit ? 'Cập nhật' : 'Thêm mới'}
					</Button>
					<Button onClick={() => setVisible(false)}>Hủy</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default FormStaff;
