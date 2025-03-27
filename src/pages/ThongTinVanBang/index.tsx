import React, { useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { useModel } from 'umi';
import FormTT from './FormTT';

const Index = () => {
    const { data, setModal1Open, modal1Open, getDataInFor, setData, setRow, setIsEdit } = useModel('ThongTinVanBang');

    useEffect(() => {
        getDataInFor();
    }, []);

    const handleDelete = (soVaoSo: number) => {
        const newData = data.filter((item) => item.soVaoSo !== soVaoSo);
        setData(newData);
        localStorage.setItem('ThongTinVanBang', JSON.stringify(newData));
    };

    const handleEdit = (record) => {
        setRow(record);
        setIsEdit(true);
        setModal1Open(true);
    };

    const columns = [
        { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo', width: 50 },
        { title: 'Số hiệu văn bằng', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang', width: 100 },
        { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', width: 200 },
        { title: 'Mã sinh viên', dataIndex: 'maSinhVien', key: 'maSinhVien', width: 200 },
        { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh', width: 200 },
        {
            title: 'Hành Động',
            width: 100,
            render: (record) => (
                <div>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.soVaoSo)} style={{ marginLeft: 10 }}>
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setIsEdit(false);
                    setModal1Open(true);
                }}
            >
                Thêm mới
            </Button>
            <Table columns={columns} dataSource={data} rowKey="soVaoSo" />

            <Modal
                title={modal1Open ? 'Cập nhật thông tin văn bằng' : 'Thêm mới thông tin văn bằng'}
                visible={modal1Open}
                onCancel={() => setModal1Open(false)}
                footer={null}
            >
                <FormTT />
            </Modal>
        </>
    );
};

export default Index;
