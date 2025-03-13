import { Button, Form, Input, DatePicker, TimePicker, Select, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const { Option } = Select;

const FormAppointment = () => {
	const { duLieu, layDuLieuLichHen, hang, chinhSua, setHienThi, kiemTraTrungLap } = useModel('appointment');

	return (
		<Form
			initialValues={{
				date: hang ? moment(hang.date) : null,
				time: hang ? moment(hang.time, 'HH:mm') : null,
				employee: hang?.employee,
				status: hang?.status,
			}}
			onFinish={(values) => {
				const formattedValues = {
					...values,
					date: values.date.format('YYYY-MM-DD'),
					time: values.time.format('HH:mm'),
				};
				if (kiemTraTrungLap(formattedValues.date, formattedValues.time)) {
					message.error('Khung giờ này đã được đặt. Vui lòng chọn thời gian khác.');
					return;
				}
				const index = duLieu.findIndex((item: any) => item.id === hang?.id);
				const duLieuTam: Appointment.Record[] = [...duLieu];
				if (chinhSua) {
					duLieuTam.splice(index, 1, { ...formattedValues, id: hang?.id });
				} else {
					duLieuTam.push({ ...formattedValues, id: Date.now() });
				}
				localStorage.setItem('appointments', JSON.stringify(duLieuTam));
				setHienThi(false);
				layDuLieuLichHen();
			}}
		>
			<Form.Item
				label='Ngày'
				name='date'
				rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
			>
				<DatePicker />
			</Form.Item>

			<Form.Item
				label='Thời gian'
				name='time'
				rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
			>
				<TimePicker format='HH:mm' />
			</Form.Item>

			<Form.Item
				label='Nhân viên'
				name='employee'
				rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Trạng thái'
				name='status'
				rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
			>
				<Select>
					<Option value="PENDING">Chờ duyệt</Option>
					<Option value="CONFIRMED">Xác nhận</Option>
					<Option value="COMPLETED">Hoàn thành</Option>
					<Option value="CANCELED">Hủy</Option>
				</Select>
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{chinhSua ? 'Lưu' : 'Thêm'}
				</Button>
				<Button onClick={() => setHienThi(false)}>Hủy</Button>
			</div>
		</Form>
	);
};

export default FormAppointment;