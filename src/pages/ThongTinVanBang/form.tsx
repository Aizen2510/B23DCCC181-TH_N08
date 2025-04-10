import { Form, Input, Button, DatePicker, Select, message, InputNumber, Typography, Row, Col } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import { VanBang } from '@/types';
const { Title } = Typography;
const { Option } = Select;
const FormTT = ({ renderFieldControl }: { renderFieldControl: (field: any) => JSX.Element }) => {
	const [form] = Form.useForm();
	const {
		isEdit,
		isModalVisible,
		setIsModalVisible,
		certificate,
		setCertificate,
		selectedCertificate,
		setSelectedCertificate,
		additionalFields,
		setAdditionalFields,
		fields,
		addCertificate,
		updateCertificate,
		selectedBookId,
		degreeBooks,
		nextSequenceNumber,
		decisions,
		setDegreeBooks,
		setNextSequenceNumber,
	} = useModel('degreebook'); // Ensure useModel always returns an object

	const handleSubmit = () => {
		if (!form) return; // Ensure form exists to avoid early return issues
		form.validateFields().then(async (values: any) => {
			// Chuẩn bị dữ liệu văn bằng
			const additionalFields = (fields ?? []).map((field) => ({
				key: field.id || '',
				value: field.dataType === 'Date' ? values[field.id!]?.format('DD/MM/YYYY') : values[field.id!],
			}));
			const currentCertificates = certificate || [];
			const newCertificate: VanBang.Certificate = {
				id: selectedCertificate?.id || `cert-${(currentCertificates ?? [])?.length + 1}`,
				graduationBookId: selectedBookId,
				sequenceNumber: selectedCertificate?.sequenceNumber || nextSequenceNumber,
				decisionNumber: values.decisionNumber,
				studentId: values.studentId,
				fullName: values.fullName,
				dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('DD/MM/YYYY') : '',
				graduationDecisionId: values.graduationDecisionId,
				additionalFields,
			};

			if (selectedCertificate) {
				// Cập nhật văn bằng đã tồn tại
				await updateCertificate(newCertificate);
				setCertificate((prev) => prev.map((item) => (item.id === newCertificate.id ? newCertificate : item)));
				message.success('Cập nhật thông tin văn bằng thành công!');
			} else {
				// Thêm mới văn bằng
				await addCertificate(newCertificate);
				setCertificate((prev) => [...prev, newCertificate]);

				// Cập nhật số thứ tự hiện tại trong sổ văn bằng
				setDegreeBooks((prev) =>
					prev.map((book) =>
						book.id === selectedBookId ? { ...book, currentSequenceNumber: book.currentSequenceNumber + 1 } : book,
					),
				);

				// Cập nhật số thứ tự tiếp theo
				setNextSequenceNumber(nextSequenceNumber + 1);

				message.success('Thêm mới văn bằng thành công!');
			}

			setIsModalVisible(false);
			form.resetFields();
		});
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit}>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label='Sổ văn bằng' required>
						<Select disabled value={selectedBookId}>
							{degreeBooks.map((book) => (
								<Select.Option key={book.id} value={book.id || ''}>
									Sổ văn bằng {book.year}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label='Số vào sổ' required>
						<InputNumber
							style={{ width: '100%' }}
							disabled
							value={selectedCertificate?.sequenceNumber || nextSequenceNumber}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name='decisionNumber'
						label='Số hiệu quyết định'
						rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
					>
						<Input placeholder='Nhập số hiệu văn bằng' />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						name='studentId'
						label='Mã sinh viên'
						rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
					>
						<Input placeholder='Nhập mã sinh viên' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name='fullName'
						label='Họ và tên'
						rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
					>
						<Input placeholder='Nhập họ và tên' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item
						name='dateOfBirth'
						label='Ngày sinh'
						rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
					>
						<DatePicker style={{ width: '100%' }} placeholder='Chọn ngày sinh' format='DD/MM/YYYY' />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name='graduationDecisionId'
						label='Quyết định tốt nghiệp'
						rules={[{ required: true, message: 'Vui lòng chọn quyết định tốt nghiệp!' }]}
					>
						<Select placeholder='Chọn quyết định tốt nghiệp'>
							{decisions
								.filter((decision) => decision.graduationBookId === selectedBookId)
								.map((decision) => (
									<Select.Option key={decision.id} value={decision.id || ''}>
										{decision.decisionNumber} - {decision.summary}
									</Select.Option>
								))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Title level={5}>Thông tin bổ sung</Title>

			<Row gutter={16}>
				{fields.map((field, index) => (
					<Col span={8} key={field.id}>
						{renderFieldControl(field)}
					</Col>
				))}
			</Row>
			<Button type='primary' htmlType='submit'>
				{isEdit ? 'Cập nhật' : 'Thêm mới'}
			</Button>
		</Form>
	);
};

export default FormTT;
