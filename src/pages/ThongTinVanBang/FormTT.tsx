import React, { useEffect,useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const { Option } = Select;
const FormTT = () => {
    const [form] = Form.useForm();
    const { data, setData, formConfig, getNextSoVaoSo, setModal1Open, isEdit, row } = useModel('ThongTinVanBang');

    useEffect(() => {
        if (isEdit && row) {
            form.setFieldsValue({
                ...row,
                ngaySinh: moment(row.ngaySinh),
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ soVaoSo: getNextSoVaoSo() });
        }
    }, [isEdit, row]);

    const handleSubmit = (values: any) => {
        const newRecord = {
            ...values,
            ngaySinh: values.ngaySinh.format('YYYY-MM-DD'),
        };

        let newData;
        if (isEdit) {
            // Cập nhật dữ liệu cũ
            newData = data.map((item) => (item.soVaoSo === row.soVaoSo ? newRecord : item));
        } else {
            // Thêm mới dữ liệu
            newRecord.soVaoSo = getNextSoVaoSo();
            newData = [...data, newRecord];
        }

        setData(newData);
        localStorage.setItem('ThongTinVanBang', JSON.stringify(newData));
        setModal1Open(false);
        form.resetFields();
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="soVaoSo" label="Số vào sổ">
                <Input disabled />
            </Form.Item>
            <Form.Item name="soHieuVanBang" label="Số hiệu văn bằng" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="maSinhVien" label="Mã sinh viên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ngaySinh" label="Ngày sinh" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item 
                name="diemTrungBinh" 
                label="Điểm Trung Bình" 
                rules={[
                    { required: true, message: 'Vui lòng nhập điểm trung bình' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value === undefined || (value >= 0 && value <= 4)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Điểm trung bình phải từ 0 đến 4'));
                        },
                    }),
                ]}
            >
                <Input type="number" min={0} max={4} step={0.1} />
            </Form.Item>
            <Form.Item name="xepHang" label="Xếp hạng" rules={[{ required: true }]}>
                <Select>
                    <Option value="XuatSac">Xuất sắc</Option>
                    <Option value="Gioi">Giỏi</Option>
                    <Option value="Kha">Khá</Option>
                    <Option value="TrungBinh">Trung bình</Option>
                    <Option value="Yeu">Yếu</Option>
                </Select>
            </Form.Item>
            <Form.Item name="heDaoTao" label="Hệ đào tạo" rules={[{ required: true }]}>
                <Select>
                    <Option value="ChinhQuy">Chính Quy</Option>
                    <Option value="DhtuXa">Đại Học Từ Xa</Option>
                    <Option value="vhvl">Vừa Học Vừa Làm</Option>
                </Select>
            </Form.Item>
            <Form.Item name="noiSinh" label="Nơi sinh" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="danToc" label="Dân tộc" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="quyetDinhId" label="Quyết định tốt nghiệp" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            {formConfig.map((field) => (
                <Form.Item key={field.name} name={field.name} label={field.label}>
                    {field.type === 'text' && <Input />}
                    {field.type === 'number' && <Input type="number" />}
                    {field.type === 'select' && (
                        <Select>
                            {field.options.map((option: string) => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
            ))}

            <Button type="primary" htmlType="submit">
                {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
        </Form>
    );
};

export default FormTT;
