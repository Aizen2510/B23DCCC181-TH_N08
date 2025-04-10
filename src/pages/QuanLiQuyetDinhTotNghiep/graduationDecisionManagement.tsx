import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from 'umi';
import type { QuyetDinh } from '@/types/index';
import FormGraduationDecision from './formDecision';
const GraduationDecisionManagement: React.FC = () => {
	const {
		isModalVisible,
		isEdit,
		setEdit,
		setIsModalVisible,
		degreeBooks,
		setDegreeBooks,
		currentDecision,
		setCurrentDecision,
		decisions,
		setDecisions,
	} = useModel('degreebook');

	const [form] = Form.useForm();

	useEffect(() => {
		const storedData = localStorage.getItem('graduationDecison');
		if (storedData) {
			setDecisions(JSON.parse(storedData));
		} else {
			setDecisions([]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('graduationDecison', JSON.stringify(decisions));
	}, [decisions]);

	const handleEdit = (record: QuyetDinh.GraduationDecision) => {
		setCurrentDecision(record);
		form.setFieldsValue({
			...record,
		});
		setIsModalVisible(true);
		setEdit(true);
	};
	const handleDelete = (record_book_id?: string) => {
		if (!record_book_id) return;
		Modal.confirm({
			title: 'Xóa Quyết Định',
			content: 'Bạn có chắc chắn muốn xóa quyết định này?',
			onOk: () => {
				const dataLocal: any = JSON.parse(localStorage.getItem('graduationDecison') as any);
				const deletedDecision = dataLocal.filter((item: any) => item.id !== record_book_id);
				setDecisions(deletedDecision);
				localStorage.setItem('graduationDecison', JSON.stringify(deletedDecision));
			},
		});
	};

	const handleAdd = () => {
		setCurrentDecision(null);
		form.resetFields();
		setIsModalVisible(true);
		setEdit(false);
	};
	const columns: ColumnsType<QuyetDinh.GraduationDecision> = [
		{
			title: 'Số Quyết Định',
			dataIndex: 'decisionNumber',
			align: 'center',
			key: 'decisionNumber',
		},
		{
			title: 'Ngày Ban Hành',
			dataIndex: 'issuedDate',
			align: 'center',
			key: 'issuedDate',
		},
		{
			title: 'Trích Yếu',
			dataIndex: 'summary',
			align: 'center',
			key: 'summary',
		},
		{
			title: 'Sổ Văn Bằng',
			dataIndex: 'graduationBookId',
			align: 'center',
			key: 'graduationBookId',
			render: (bookId: string) => {
				const book = degreeBooks.find((item) => item.id === bookId);
				return book ? `Số quyết định năm ${book.year}` : 'Không xác định';
			},
		},
		{
			title: 'Thao Tác',
			align: 'center',
			key: 'actions',
			// "_"đại diện giá trị của ô dữ liệu trong cột (theo dataIndex) nhưng không được sử dụng ở đây, đánh dấu tham số không được sử dụng trong logic
			render: (_: any, record: QuyetDinh.GraduationDecision) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];
	return (
		<div>
			<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
				Thêm Quyết Định Tốt Nghiệp
			</Button>

			<Table columns={columns} dataSource={decisions} rowKey='id' />

			<Modal
				title={isEdit ? 'Sửa Quyết Định' : 'Thêm Quyết Định'}
				visible={isModalVisible}
				onOk={() => {}}
				onCancel={() => setIsModalVisible(false)}
				footer={false}
				destroyOnClose={false}
			>
				<FormGraduationDecision />
			</Modal>
		</div>
	);
};
export default GraduationDecisionManagement;
