import React, { useEffect } from 'react';
import { Table, Button, Modal, Form, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { QuyetDinh } from '@/types/index';
import FormGraduationDecision from './formDecision';
import moment from 'moment';
const GraduationDecisionManagement: React.FC = () => {
	const {
		isModalVisible,
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
	};
	const handleDelete = (record_book_id?: string) => {
		if (!record_book_id) return;
		Modal.confirm({
			title: 'Xóa Quyết Định',
			content: 'Bạn có chắc chắn muốn xóa quyết định này?',
			onOk: () => {
				const deletedDecision = decisions.filter((item) => item.id !== record_book_id);
				setDecisions(deletedDecision);
				localStorage.setItem('graduationDecison', JSON.stringify(deletedDecision));
			},
		});
	};

	const handleAdd = () => {
		setCurrentDecision(null);
		form.resetFields();
		setIsModalVisible(true);
	};
	const columns = [
		{
			title: 'Số Quyết Định',
			dataIndex: 'decisionNumber',
			key: 'decisionNumber',
		},
		{
			title: 'Ngày Ban Hành',
			dataIndex: 'issuedDate',
			key: 'issuedDate',
			render: (date: moment.Moment) => date.format('DD/MM/YYYY'), // định nghĩa cách hiển thị dữ liệu
		},
		{
			title: 'Trích Yếu',
			dataIndex: 'summary',
			key: 'summary',
		},
		{
			title: 'Sổ Văn Bằng',
			dataIndex: 'graduationBook',
			key: 'graduationBook',
			render: (bookId: string) => {
				const book = degreeBooks.find((item) => item.id === bookId);
				return book ? `Số quyết định năm ${book.year}` : 'Không xác định';
			},
		},
		{
			title: 'Thao Tác',
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
				title={currentDecision ? 'Sửa Quyết Định' : 'Thêm Quyết Định'}
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
