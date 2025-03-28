import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useModel } from 'umi';

const MoreForm = ({ record }: { record: any }) => {
    useEffect(() => {
        console.log("Dữ liệu record nhận được:", record);
    }, [record]);

    return (
        <Form layout="vertical">
            <Form.Item label="Số hiệu văn bằng">
                <Input value={record?.soHieuVanBang || ''} readOnly />
            </Form.Item>
            <Form.Item label="Số vào sổ">
                <Input value={record?.soVaoSo || ''} readOnly />
            </Form.Item>
            <Form.Item label="Mã sinh viên">
                <Input value={record?.maSinhVien || ''} readOnly />
            </Form.Item>
            <Form.Item label="Họ tên">
                <Input value={record?.hoTen || ''} readOnly />
            </Form.Item>
            <Form.Item label="Ngày sinh">
                <Input value={record?.ngaySinh || ''} readOnly />
            </Form.Item>
            <Form.Item label="Điểm trung bình">
                <Input value={record?.diemTrungBinh || ''} readOnly />
            </Form.Item>
            <Form.Item label="Xếp hạng">
                <Input value={record?.xepHang || ''} readOnly />
            </Form.Item>
            <Form.Item label="Hệ đào tạo">
                <Input value={record?.heDaoTao || ''} readOnly />
            </Form.Item>
            <Form.Item label="Nơi sinh">
                <Input value={record?.noiSinh || ''} readOnly />
            </Form.Item>
            <Form.Item label="Dân tộc">
                <Input value={record?.danToc || ''} readOnly />
            </Form.Item>
            <Form.Item label="Quyết định tốt nghiệp">
                <Input value={record?.quyetDinhId || ''} readOnly />
            </Form.Item>
        </Form>
    );
};

export default MoreForm;
