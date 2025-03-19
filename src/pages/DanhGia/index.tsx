import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { useModel } from 'umi';
import Form from './Form';

const Index = () => {
	const { data } = useModel('danhgia');
	const { duLieu } = useModel('appointment');

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentEmployee, setCurrentEmployee] = useState<any>(null);
	const [combinedData, setCombinedData] = useState<any[]>([]);
	const [formType, setFormType] = useState<'evaluation' | 'feedback'>('evaluation');

	// Hàm giúp xử lý an toàn việc lấy và parse JSON từ localStorage
	const safeParse = (key: string) => {
		const storedValue = localStorage.getItem(key);
		try {
			return storedValue ? JSON.parse(storedValue) : null;
		} catch (error) {
			console.error(`Lỗi khi parse giá trị cho key ${key}:`, error);
			return null; // Trả về null nếu JSON không hợp lệ
		}
	};

	// Lưu phản hồi vào localStorage
	const saveFeedbackToLocalStorage = (employee: any, feedback: string) => {
		localStorage.setItem(`feedback-${employee.employee}`, JSON.stringify(feedback));
	};

	// Kết hợp hai mảng dữ liệu thành một mảng duy nhất và lấy đánh giá trung bình, phản hồi từ localStorage
	useEffect(() => {
		const mergedData = [...data, ...duLieu].map((item, index) => {
			const averageRating = safeParse(`rating-${item.employee}`) ?? 0; // Lấy đánh giá trung bình
			const feedback = safeParse(`feedback-${item.employee}`) ?? ''; // Lấy phản hồi từ localStorage
			return { ...item, key: index, averageRating, feedback };
		});
		setCombinedData(mergedData);
	}, [data, duLieu]);

	const handleEvaluate = (employee: any, rating: number) => {
		const updatedData = combinedData.map((item) =>
			item.employee === employee.employee ? { ...item, averageRating: rating } : item,
		);
		setCombinedData(updatedData);
	};

	const handleFeedback = (employee: any, feedback: string) => {
		// Lưu phản hồi vào localStorage
		saveFeedbackToLocalStorage(employee, feedback);

		// Cập nhật lại bảng với phản hồi
		const updatedData = combinedData.map((item) =>
			item.employee === employee.employee ? { ...item, feedback } : item,
		);
		setCombinedData(updatedData); // Cập nhật lại dữ liệu bảng
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleShowForm = (employee: any, type: 'evaluation' | 'feedback') => {
		setCurrentEmployee(employee);
		setFormType(type);
		setIsModalVisible(true); // Mở modal khi chọn Đánh Giá hoặc Phản Hồi
	};

	const columns = [
		{
			title: 'Tên Nhân Viên',
			dataIndex: 'employee',
			key: 'employee',
			width: 200,
		},
		{
			title: 'Đánh Giá Trung Bình',
			dataIndex: 'averageRating',
			key: 'averageRating',
			width: 200,
			render: (text: any) => `${text}%`, // Hiển thị đánh giá trung bình theo phần trăm
		},
		{
			title: 'Phản Hồi',
			dataIndex: 'feedback',
			key: 'feedback',
			width: 200,
		},
		{
			title: 'Hành Động',
			key: 'action',
			width: 150,
			render: (_: any, record: any) => (
				<>
					<Button onClick={() => handleShowForm(record, 'evaluation')} type='primary'>
						Đánh Giá
					</Button>
					<Button onClick={() => handleShowForm(record, 'feedback')} type='primary' style={{ marginLeft: 8 }}>
						Phản Hồi
					</Button>
				</>
			),
		},
	];

	return (
		<div>
			<Table dataSource={combinedData} columns={columns} rowKey='key' />

			<Modal
				title={`Đánh Giá Nhân Viên: ${currentEmployee?.employee || ''}`}
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					onSubmit={(values) => console.log(values)}
					employee={currentEmployee}
					onCancel={handleCancel}
					type={formType}
					onEvaluate={handleEvaluate}
					onFeedback={handleFeedback}
				/>
			</Modal>
		</div>
	);
};

export default Index;
