// RatingComponent.tsx
import React, { useState } from 'react';
import { Button, Modal, Rate, Input } from 'antd';
import { useRating } from '../../models/DanhGia/DanhGia'; // Import logic từ RatingLogic.ts

const Form: React.FC<{ employeeId: string }> = ({ employeeId }) => {
  const {
    value,
    open,
    averageRating,
    reviews,
    response,
    showModal,
    handleCancel,
    onChange,
    onRespond,
    desc,
  } = useRating(employeeId);

  const [newResponse, setNewResponse] = useState(response);

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResponse(e.target.value);
  };

  const handleSubmitResponse = () => {
    onRespond(newResponse);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Đánh Giá
      </Button>

      <Modal
        title={<p>Đánh Giá Nhân Viên</p>}
        visible={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            Đánh Giá
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hiển thị đánh giá trung bình */}
          <div>
            <strong>Đánh giá trung bình: </strong>{averageRating.toFixed(2)} sao
          </div>

          {/* Rate component cho người dùng đánh giá */}
          <Rate tooltips={desc} onChange={onChange} value={value} />
          {value ? <span>{desc[value - 1]}</span> : null}
          <div>
            <h4>Phản hồi của nhân viên:</h4>
            <Input
              placeholder="Nhập phản hồi của bạn"
              value={newResponse}
              onChange={handleResponseChange}
            />
            <Button onClick={handleSubmitResponse} type="primary">
              Gửi Phản Hồi
            </Button>
            {response && <div><strong>Phản hồi:</strong> {response}</div>}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Form;
