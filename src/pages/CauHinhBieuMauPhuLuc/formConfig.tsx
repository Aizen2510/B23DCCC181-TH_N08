import { Button, Modal, Table, Form, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { BieuMau } from '@/types/index';
import FormField from './form';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const FormConfig: React.FC = () => {
	const {
		fields,
		isEdit,
		setEdit,
		setSelectedField,
		isModalVisible,
		setIsModalVisible,
		setFields,
		getCertificateTemplateField,
		selectedField,
	} = useModel('degreebook');
	const [form] = Form.useForm();

	useEffect(() => {
		getCertificateTemplateField();
	}, []);

	const handleEdit = (record: BieuMau.CertificateTemplateField) => {
		setSelectedField(record);
		form.setFieldsValue({
			// Gán giá trị cho form
			...record,
		});
		setIsModalVisible(true);
		setEdit(true);
	};
	const handleDelete = (field_id?: string) => {
		if (!field_id) return;
		Modal.confirm({
			title: 'Xóa Quyết Định',
			content: 'Bạn có chắc chắn muốn xóa quyết định này?',
			onOk: () => {
				const dataLocal: any = JSON.parse(localStorage.getItem('certificateTemplateField') as any);
				const deletedField = dataLocal.filter((item: any) => item.id !== field_id);
				localStorage.setItem('certificateTemplateField', JSON.stringify(deletedField));
				getCertificateTemplateField();
			},
		});
	};

	const handleAdd = () => {
		setSelectedField(null);
		form.resetFields();
		setIsModalVisible(true);
		setEdit(false);
	};

	const columns: ColumnsType<BieuMau.CertificateTemplateField> = [
		{
			title: 'Tên Trường',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: 'Kiểu Dữ liệu ',
			dataIndex: 'dataType',
			key: 'dataType',
			align: 'center',
			render: (type) => {
				switch (type) {
					case 'String':
						return 'String';
					case 'Number':
						return 'Number';
					case 'Date':
						return 'Date';
					default:
						return type;
				}
			},
		},
		{
			title: 'Điều khiển nhập liệu',
			dataIndex: 'inputControl',
			align: 'center',
			key: 'inputControl',
		},
		{
			title: 'Hành động',
			key: 'action',
			align: 'center',
			render: (_: any, record: BieuMau.CertificateTemplateField) => (
				<div>
					<Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Chỉnh sửa
					</Button>
					<Button
						icon={<DeleteOutlined />}
						style={{ marginLeft: 10 }}
						onClick={() => handleDelete(record.id)}
						type='primary'
						danger
					>
						Xóa
					</Button>
				</div>
			),
		},
	];

	return (
		<div>
			<Title level={3}>Cấu hình biểu mẫu văn bằng</Title>
			<Button icon={<PlusOutlined />} type='primary' onClick={handleAdd} style={{ marginBottom: 16 }}>
				Thêm cấu hình mới
			</Button>

			<Table dataSource={fields} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />

			<Modal
				destroyOnClose
				footer={null}
				title={isEdit ? 'Sửa cấu hình biểu mẫu' : 'Thêm cấu hình biểu mẫu mới'}
				visible={isModalVisible}
				onOk={() => {}}
				onCancel={() => setIsModalVisible(false)}
				width={600}
			>
				<FormField />
			</Modal>
		</div>
	);
};

export default FormConfig;
