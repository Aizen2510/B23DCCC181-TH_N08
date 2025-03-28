import { Form, InputNumber, Button, message } from 'antd';
import { useModel } from 'umi';
import type { VanBang } from '@/types/index';
const FormDegreeBook = () => {
	const { isEdit, setIsModalVisible, degreeBooks, setDegreeBooks, getDataDegreeBook, selectedBook, setSelectedBook } =
		useModel('degreebook');
	const [form] = Form.useForm();
	const handleSubmit = (values: { year: number }) => {
		form.validateFields().then((values: any) => {
			const { year } = values; //Lấy thuộc tính year từ đối tượng values, nơi chứa dữ liệu người dùng nhập vào

			// Kiểm tra trùng năm
			const isDuplicateYear = degreeBooks.some((book) => book.year === year && book.id !== selectedBook?.id);

			if (isDuplicateYear) {
				form.setFields([
					{
						name: 'year',
						errors: ['Năm này đã tồn tại, vui lòng nhập năm khác'],
					},
				]);
				return;
			}

			// const dataTemp: VanBang.DegreeBook[] = degreeBooks ? [...degreeBooks] : [];

			// if (selectedBook) {
			// 	const index = dataTemp.findIndex((item: VanBang.DegreeBook) => item.id === selectedBook.id);
			// 	if (index !== -1) {
			// 		dataTemp.splice(index, 1, { ...selectedBook, ...values });
			// 	}
			// } else {
			// 	const newId = (degreeBooks?.length ?? 0) > 0 ? degreeBooks![degreeBooks.length - 1].id + 1 : 1;
			// 	const newDegreeBook: VanBang.DegreeBook = { id: newId, year: values.year, currentSequenceNumber: 0 };
			// 	dataTemp.push(newDegreeBook);
			// }
			// setDegreeBooks(dataTemp);
			// localStorage.setItem('degreeBooks', JSON.stringify(dataTemp));
			// setIsModalVisible(false);
			// form.resetFields();
			const newDegreeBook: VanBang.DegreeBook = { ...values, id: selectedBook?.id || `${degreeBooks.length + 1}` };
			if (selectedBook) {
				setDegreeBooks(degreeBooks.map((item) => (item.id === selectedBook.id ? newDegreeBook : item)));
				message.success('Cập nhật sổ văn bằng thành công');
			} else {
				setDegreeBooks([...degreeBooks, newDegreeBook]);
				message.success('Thêm sổ văn bằng thành công');
			}
		});
	};
	return (
		<Form
			layout='vertical'
			form={form}
			onFinish={handleSubmit}
			initialValues={selectedBook || { currentSequenceNumber: 0 }}
		>
			<Form.Item name='year' label='Năm' rules={[{ required: true, message: 'Vui lòng nhập năm' }]}>
				<InputNumber min={2000} max={2100} style={{ width: '100%' }} />
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

export default FormDegreeBook;
