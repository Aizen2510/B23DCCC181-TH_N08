import React, { useEffect } from 'react';
import {
	Button,
	Modal,
	Table,
	Form,
	Input,
	DatePicker,
	Space,
	Popconfirm,
	Select,
	InputNumber,
	Row,
	Col,
	Card,
	Typography,
} from 'antd';
import { useModel } from 'umi';
import FormTT from './form';
import { VanBang, BieuMau } from '@/types';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const Index: React.FC = () => {
	const {
		certificate,
		setCertificate,
		selectedCertificate,
		setSelectedCertificate,
		isModalVisible,
		setIsModalVisible,
		fields,
		setFields,
		getCertificate,
		additionalFields,
		setAdditionalFields,
		getCertificateTemplateField,
		getDataDegreeBook,
		degreeBooks,
		setDegreeBooks,
		decisions,
		setDecisions,
		selectedBookId,
		setSelectedBookId,
		nextSequenceNumber,
		setNextSequenceNumber,
	} = useModel('degreebook');

	useEffect(() => {
		getCertificate();
		getCertificateTemplateField();
		getDataDegreeBook();
	}, []);
	const [form] = Form.useForm();

	// Mở modal thêm mới văn bằng
	const showAddModal = () => {
		setSelectedCertificate(null);
		form.resetFields();

		if (degreeBooks.length > 0 && !selectedBookId) {
			// chọn sổ văn bằng
			setSelectedBookId(degreeBooks[0].id || '');
		}
		setIsModalVisible(true);
	};

	const handleDelete = (certificate_id?: string) => {
		const newCertificate = certificate.filter((item) => item.id !== certificate_id);
		setCertificate(newCertificate);
		localStorage.setItem('certificate', JSON.stringify(newCertificate));
	};

	const handleEdit = (record: VanBang.Certificate) => {
		setSelectedCertificate(record);
		setSelectedBookId(record.graduationBookId);

		// Chuẩn bị dữ liệu cho form
		const formValues: any = {
			decisionNumber: record.decisionNumber,
			studentId: record.studentId,
			fullName: record.fullName,
			dateOfBirth: record.dateOfBirth ? moment(record.dateOfBirth) : null,
			graduationDecisionId: record.graduationDecisionId,
		};

		// Thêm các trường bổ sung
		if (record.additionalFields) {
			record.additionalFields.forEach((field) => {
				if (field.key && field.value !== undefined) {
					// Chuyển đổi giá trị date string thành moment object
					const templateField = fields.find((tf) => tf.id === field.key);
					if (templateField && templateField.dataType === 'Date') {
						formValues[field.key] = moment(field.value).format('DD/MM/YYYY');
					} else {
						formValues[field.key] = field.value;
					}
				}
			});
		}
		// setCertificate(certificate.map((item) => (item.id === record.id ? { ...item, ...record } : item)));
		form.setFieldsValue(formValues);
		setIsModalVisible(true);
		// setEdit(true);
	};

	const getFieldOptions = (name: string) => {
		switch (name) {
			case 'Hệ đào tạo':
				return ['Chính quy', 'Tại chức', 'Liên thông', 'Từ xa'];
			case 'Dân tộc':
				return ['Kinh', 'Tày', 'Thái', 'Mường', 'Hoa', 'Khmer', 'Nùng', "H'Mông", 'Dao', 'Khác'];
			default:
				return ['Option 1', 'Option 2', 'Option 3'];
		}
	};

	const renderFieldControl = (field: BieuMau.CertificateTemplateField) => {
		const options = getFieldOptions(field.name);
		switch (field.dataType) {
			case 'String':
				return (
					<Form.Item
						key={field.id}
						name={field.id}
						label={field.name}
						rules={[{ required: true, message: `Vui lòng nhập ${field.name}!` }]}
					>
						{field.inputControl === 'Select' ? (
							<Select placeholder={`Chọn ${field.name}`}>
								{options.map((option) => (
									<Select.Option key={option} value={option}>
										{option}
									</Select.Option>
								))}
							</Select>
						) : (
							<Input placeholder={`Nhập ${field.name}`} />
						)}
					</Form.Item>
				);
			case 'Number':
				return (
					<Form.Item
						key={field.id}
						name={field.id}
						label={field.name}
						rules={[{ required: true, message: `Vui lòng nhập ${field.name}!` }]}
					>
						<InputNumber
							style={{ width: '100%' }}
							placeholder={`Nhập ${field.name}`}
							step={0.01}
							min={0}
							max={field.name === 'Điểm trung bình' ? 4 : undefined}
						/>
					</Form.Item>
				);
			case 'Date':
				return (
					<Form.Item
						key={field.id}
						name={field.id}
						label={field.name}
						rules={[{ required: true, message: `Vui lòng chọn ${field.name}!` }]}
					>
						<DatePicker style={{ width: '100%' }} placeholder={`Chọn ${field.name}`} format='DD/MM/YYYY' />
					</Form.Item>
				);
			default:
				return <Input placeholder={`Nhập ${field.name}`} />;
		}
	};

	const generateColumn = () => {
		const baseColumns: ColumnsType<VanBang.Certificate> = [
			{ title: 'Số vào sổ ', dataIndex: 'sequenceNumber', key: 'sequenceNumber', align: 'center' },
			{ title: 'Số hiệu quyết định', dataIndex: 'decisionNumber', key: 'decisionNumber', align: 'center' },
			{ title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', align: 'center' },
			{ title: 'Mã sinh viên', dataIndex: 'studentId', key: 'studentId', align: 'center' },
			{
				title: 'Ngày sinh',
				dataIndex: 'dateOfBirth',
				key: 'dateOfBirth',
				align: 'center',
			},
			{
				title: 'Quyết định tốt nghiệp',
				dataIndex: 'graduationDecisionId',
				key: 'graduationDecisionId',
				align: 'center',
				render: (text: string) => {
					const decision = decisions.find((d) => d.id === text);
					return decision ? decision.decisionNumber : '';
				},
			},
		];

		const additionalColumns = fields.map((field) => ({
			title: field.name,
			dataIndex: field.name,
			key: field.name,
			render: (_: any, record: VanBang.Certificate) => {
				const fieldData = record.additionalFields?.find((f) => f.key === field.id);
				return fieldData?.value || '';
			},
		}));

		const actionColumn = {
			title: 'Thao tác',
			key: 'action',
			width: 180,
			render: (_: any, record: VanBang.Certificate) => (
				<Space>
					<Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		};

		return [...baseColumns, ...additionalColumns, actionColumn];
	};

	const columns = generateColumn();

	return (
		<div style={{ padding: '20px' }}>
			<Card>
				<Row justify='space-between' align='middle' style={{ marginBottom: 16 }}>
					<Col>
						<Title level={3}>Quản lý thông tin văn bằng</Title>
					</Col>
					<Col>
						<Space>
							<Select
								style={{ width: 200 }}
								placeholder='Chọn sổ văn bằng'
								value={selectedBookId}
								onChange={setSelectedBookId}
							>
								{degreeBooks.map((book) => (
									<Select.Option key={book.id} value={book.id || ''}>
										Sổ văn bằng {book.year} (STT: {book.currentSequenceNumber})
									</Select.Option>
								))}
							</Select>
							<Button type='primary' icon={<PlusOutlined />} onClick={showAddModal} disabled={!selectedBookId}>
								Thêm văn bằng
							</Button>
						</Space>
					</Col>
				</Row>

				<Table
					columns={columns}
					dataSource={(certificate ?? [])?.filter((cert) => cert.graduationBookId === selectedBookId) || []}
					rowKey='id'
					pagination={{ pageSize: 10 }}
					// loading={!certificate?.length}
					// expandable={{
					// 	expandedRowRender,
					// 	expandRowByClick: true,
					// }}
					size='middle'
				/>
			</Card>

			{/* Modal thêm/sửa văn bằng */}
			<Modal
				title={selectedCertificate ? 'Sửa thông tin văn bằng' : 'Thêm mới văn bằng'}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				width={800}
				onOk={() => {}}
				footer={false}
			>
				<FormTT renderFieldControl={renderFieldControl} />
				{/* <Form form={form} layout='vertical'>
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
								label='Số hiệu văn bằng'
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
				</Form> */}
			</Modal>
		</div>
	);
};

export default Index;
