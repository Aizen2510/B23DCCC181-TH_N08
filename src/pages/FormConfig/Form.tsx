import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';

const { Option } = Select;

const FormConfig = () => {
    const { fields, fetchFormConfig, selectedField, isEditing, setIsVisible, setFields } = useModel('formConfig');

    return (
        <Form
            initialValues={{
                name: selectedField?.name || '', // Pre-fill name if editing
                type: selectedField?.type || undefined, // Pre-fill type if editing
            }}
            onFinish={(values) => {
                const updatedFields = [...fields];
                if (isEditing && selectedField) {
                    const index = fields.findIndex((item) => item.id === selectedField.id);
                    if (index !== -1) {
                        updatedFields[index] = { ...values, id: selectedField.id }; // Cập nhật trường đã chọn
                    }
                } else {
                    // Thêm trường mới
                    const newField = { ...values, id: Date.now() }; // Tạo ID duy nhất
                    updatedFields.push(newField);
                }
                localStorage.setItem('formConfig', JSON.stringify(updatedFields));
                setFields(updatedFields);
                setIsVisible(false); // Đóng Modal sau khi thêm hoặc chỉnh sửa
                fetchFormConfig(); // Cập nhật danh sách
            }}
        >
            <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Loại dữ liệu"
                name="type"
                rules={[{ required: true, message: 'Vui lòng chọn loại dữ liệu!' }]}
            >
                <Select>
                    <Option value="CHUỖI">STRING</Option>
                    <Option value="SỐ">NUMBER</Option>
                    <Option value="NGÀY">DATE</Option>
                </Select>
            </Form.Item>

            <div className="form-footer">
                <Button htmlType="submit" type="primary">
                    {isEditing ? 'Lưu' : 'Thêm'}
                </Button>
                <Button onClick={() => setIsVisible(false)}>Hủy</Button>
            </div>
        </Form>
    );
};

export default FormConfig;