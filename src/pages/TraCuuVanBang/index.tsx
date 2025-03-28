import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Button, message } from 'antd';
import FormTra from './FormTra';
import MoreForm from './MoreForm';
import { useModel } from 'umi';

const Index = () => {
    const { data, setModal1Open, modal1Open, getDataInFor } = useModel('ThongTinVanBang');
    const { filteredData, setFilteredData, modalOpen, setModalOpen, selectedRecord, setSelectedRecord } = useModel('TraCuuVanBang');

    // Biến lưu tổng số lượt tra cứu
    const [searchCount, setSearchCount] = useState(0);

    // Lấy dữ liệu từ localStorage hoặc API khi component mount
    useEffect(() => {
        getDataInFor(); // Lấy dữ liệu từ hook
    }, []);

    // Hàm tìm kiếm
    const handleSearch = (searchValues: any) => {
        const searchFields = Object.keys(searchValues).filter(key => searchValues[key]);

        // Kiểm tra nếu ít nhất 2 tham số được nhập
        if (searchFields.length < 2) {
            message.warning("Vui lòng nhập ít nhất 2 tham số để tìm kiếm!");
            return;
        }

        const results = data.filter(record =>
            searchFields.every(field =>
                record[field]?.toString().toLowerCase().includes(searchValues[field]?.toString().toLowerCase())
            )
        );

        if (results.length === 0) {
            message.info("Không tìm thấy kết quả phù hợp!");
        } else {
            // Cập nhật số lượt tra cứu
            setSearchCount(prevCount => prevCount + 1);
        }

        setFilteredData(results);
    };

    // Hàm mở modal chi tiết
    const handleDetail = (record) => {
        setSelectedRecord(record); // Cập nhật bản ghi được chọn
        setModalOpen(true); // Mở modal chi tiết
    };

    // Cấu hình cột cho bảng
    const columns = [
        { title: 'Số hiệu Văn Bằng', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
        { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
        { title: 'MSV', dataIndex: 'maSinhVien', key: 'maSinhVien' },
        { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
        { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh' },
        {
            title: 'Hành động',
            key: 'actions',
            render: (record) => (
                <Button onClick={() => handleDetail(record)}>Edit</Button>
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <FormTra onSearch={handleSearch} />
            <Table columns={columns} dataSource={filteredData} rowKey="soVaoSo" />

            {/* Hiển thị tổng số lượt tra cứu */}
            <div>
                <strong>Tổng số lượt tra cứu: {searchCount}</strong>
            </div>

            {/* Modal chi tiết văn bằng */}
            <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} title="Chi tiết Văn bằng">
                {selectedRecord ? <MoreForm record={selectedRecord} /> : <p>Không có dữ liệu</p>}
            </Modal>
        </Space>
    );
};

export default Index;
