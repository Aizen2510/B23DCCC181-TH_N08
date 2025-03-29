import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormField from './Form';

interface Field {
    id: number;
    name: string;
    type: 'string' | 'number' | 'date';
}

const FormConfig = () => {
    const { fields, fetchFormConfig, setSelectedField, isEditing, setIsVisible, isVisible, setFields, setIsEditing } =
        useModel('formConfig');

    useEffect(() => {
        fetchFormConfig();
    }, []);

    const columns: ColumnsType<Field> = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            align: 'center', // Center-align the column
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            align: 'center', // Center-align the column
        },
        {
            title: 'Hoạt động',
            width: 200,
            align: 'center',
            render: (record: Field) => (
                <div>
                    <Button
                        onClick={() => {
                            setIsVisible(true);
                            setSelectedField(record); // Pre-fill the form with selected field data
                            setIsEditing(true); // Ensure editing mode is active
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            const updatedFields = fields.filter((item) => item.id !== record.id);
                            localStorage.setItem('formConfig', JSON.stringify(updatedFields));
                            setFields(updatedFields);
                        }}
                        type="primary"
                        danger
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setIsVisible(true); // Hiển thị Modal
                    setSelectedField(null); // Đặt lại trường được chọn
                    setIsEditing(false); // Đảm bảo chế độ thêm mới được kích hoạt
                }}
            >
                Thêm
            </Button>

            <Table dataSource={fields || []} columns={columns} rowKey="id" />

            <Modal
                destroyOnClose
                footer={null}
                title={isEditing ? 'Chỉnh sửa trường' : 'Thêm trường'}
                visible={isVisible} // Đảm bảo trạng thái hiển thị Modal được liên kết với isVisible
                onCancel={() => setIsVisible(false)} // Đóng Modal khi nhấn hủy
            >
                <FormField />
            </Modal>
        </div>
    );
};

export default FormConfig;