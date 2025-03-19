import React, { useState } from 'react';
import { Form as AntForm, Input, Button, Rate, Space } from 'antd';

interface FormProps {
	onSubmit: (values: any) => void;
	employee: any;
	onCancel: () => void;
	type: 'evaluation' | 'feedback'; // Phân biệt giữa đánh giá và phản hồi
	onEvaluate: (employee: any, rating: number) => void; // Hàm lưu đánh giá
	onFeedback: (employee: any, feedback: string) => void; // Hàm lưu phản hồi
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Form: React.FC<FormProps> = ({ onSubmit, employee, onCancel, type, onEvaluate, onFeedback }) => {
	const [rating, setRating] = useState<number | undefined>(0); // Lưu giá trị đánh giá sao
	const [feedback, setFeedback] = useState<string>(''); // Lưu phản hồi

	const handleRateChange = (value: number) => {
		setRating(value); // Cập nhật giá trị rating
	};

	const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFeedback(e.target.value); // Cập nhật phản hồi
	};

	const handleSubmit = (values: any) => {
		// Nếu là đánh giá, lưu vào localStorage
		if (type === 'evaluation' && rating) {
			// Tính điểm trung bình
			const averageRating = ((rating * 2) / 10) * 100; // Tính điểm trung bình theo logic 2/10 sao
			localStorage.setItem(`rating-${employee?.employee}`, JSON.stringify(averageRating)); // Lưu vào localStorage
			onEvaluate(employee, averageRating); // Gửi đánh giá lên cha
		}

		// Nếu là phản hồi, lưu vào localStorage
		if (type === 'feedback') {
			localStorage.setItem(`feedback-${employee?.employee}`, feedback); // Lưu phản hồi vào localStorage
			onFeedback(employee, feedback); // Gửi phản hồi lên cha
		}

		onSubmit(values);
		onCancel(); // Đóng modal sau khi submit
	};

	return (
		<AntForm onFinish={handleSubmit}>
			{type === 'evaluation' && (
				<>
					<AntForm.Item
						name='evaluation'
						label='Đánh Giá'
						rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}
					>
						<Rate tooltips={desc} value={rating} onChange={handleRateChange} />
					</AntForm.Item>
				</>
			)}

			{type === 'feedback' && (
				<>
					<AntForm.Item
						name='feedback'
						label='Phản Hồi'
						rules={[{ required: true, message: 'Vui lòng nhập phản hồi!' }]}
					>
						<Input.TextArea rows={4} value={feedback} onChange={handleFeedbackChange} />
					</AntForm.Item>
				</>
			)}

			<AntForm.Item>
				<Button type='primary' htmlType='submit'>
					Gửi {type === 'evaluation' ? 'Đánh Giá' : 'Phản Hồi'}
				</Button>
				<Button onClick={onCancel} style={{ marginLeft: 8 }}>
					Hủy
				</Button>
			</AntForm.Item>
		</AntForm>
	);
};

export default Form;
