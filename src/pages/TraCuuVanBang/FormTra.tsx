import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col, message } from 'antd';

const FormTra = ({ onSearch }: { onSearch: (values: any) => void }) => {
    const [form] = Form.useForm();

    const handleSearch = () => {
        form.validateFields().then(values => {
            const searchFields = Object.keys(values).filter(key => values[key]);

            if (searchFields.length < 2) {
                message.warning("Nhập Ít Nhất 2 Thông Tin");
                return;
            }
            onSearch(values);
        });
    };

    return (
        <Form form={form} layout="inline">
            <Row gutter={[16, 16]} style={{ width: '100%' }}>
                <Col span={4}>
                    <Form.Item name="soHieuVanBang" label="Số hiệu VB">
                        <Input placeholder="Nhập số hiệu" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="soVaoSo" label="Số vào sổ">
                        <Input placeholder="Nhập số vào sổ" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="maSinhVien" label="MSV">
                        <Input placeholder="Nhập MSV" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="hoTen" label="Họ tên">
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="ngaySinh" label="Ngày sinh">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormTra;
