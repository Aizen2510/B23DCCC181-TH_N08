import { QuyetDinh } from '@/types';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
const FormGraduationDecision = () => {
	const [form] = Form.useForm();
	const { isEdit, setIsModalVisible, degreeBooks, decisions, setDecisions, currentDecision, setCurrentDecision } =
		useModel('degreebook');
	const handleSubmit = () => {
		form.validateFields().then((values: any) => {
			// const dataTemp: QuyetDinh.GraduationDecision[] = decisions ? [...decisions] : [];
			// if (currentDecision) {
			// 	const index = dataTemp.findIndex((item: QuyetDinh.GraduationDecision) => item.id === currentDecision.id);
			// 	if (index !== -1) {
			// 		dataTemp.splice(index, 1, { ...currentDecision, ...values });
			// 	}
			// } else {
			// 	const newId = (decisions?.length ?? 0) > 0 ? decisions![decisions.length - 1].id + 1 : 1;
			// 	const newGraduationDecision: QuyetDinh.GraduationDecision = {
			// 		id: newId,
			// 		decisionNumber: values.decisionNumber,
			// 		issuedDate: moment(values.issuedDate).format('YYYY-MM-DD'),
			// 		summary: values.summary,
			// 		graduationBook: values.graduationRegistryBookId,
			// 		totalLookups: 0,
			// 	};
			// 	dataTemp.push(newGraduationDecision);
			// }
			// setDecisions(dataTemp);
			// localStorage.setItem('graduationDecison', JSON.stringify(dataTemp));
			const newDecision: QuyetDinh.GraduationDecision = {
				...values,
				id: currentDecision?.id || `${decisions.length + 1}`,
			};

			if (currentDecision) {
				// Cập nhật
				setDecisions(decisions.map((item) => (item.id === currentDecision.id ? newDecision : item)));
				message.success('Cập nhật quyết định thành công');
			} else {
				// Thêm mới
				setDecisions([...decisions, newDecision]);
				message.success('Thêm quyết định thành công');
			}
			setIsModalVisible(false);
			form.resetFields();
		});
	};
	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit}>
			<Form.Item
				name='decisionNumber'
				label='Số Quyết Định'
				rules={[{ required: true, message: 'Vui lòng nhập số quyết định' }]}
			>
				<Input placeholder='Nhập số quyết định' />
			</Form.Item>

			<Form.Item
				name='issuedDate'
				label='Ngày Ban Hành'
				rules={[{ required: true, message: 'Vui lòng chọn ngày ban hành' }]}
			>
				<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
			</Form.Item>

			<Form.Item name='summary' label='Trích Yếu' rules={[{ required: true, message: 'Vui lòng nhập trích yếu' }]}>
				<Input.TextArea placeholder='Nhập trích yếu quyết định' />
			</Form.Item>

			<Form.Item
				name='graduationRegistryBookId'
				label='Sổ Văn Bằng'
				rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng' }]}
			>
				<Select placeholder='Chọn sổ văn bằng'>
					{degreeBooks.map((book) => (
						<Select.Option key={book.id} value={book.id}>
							Sổ văn bằng năm {book.year}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Insert' : 'Save'}
				</Button>
				<Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
			</div>
		</Form>
	);
};
export default FormGraduationDecision;
