import React from 'react';
import { Descriptions } from 'antd';
import { useModel } from 'umi';
import { ApplicationForm } from '@/types/QuanLiCauLacBo';
import { getApplicationForms } from '@/services/QuanLiCauLacBo/clubManagementService';
const Show = () => {
	const { applicationForm, setApplicationForm, setIsModalVisible, currentapplicationForm } =
		useModel('QuanLiCauLacBo.clubs');
	return (
		<div>
			<Descriptions column={1} bordered size='middle'>
				<Descriptions.Item label='Họ tên'>{currentapplicationForm?.fullName}</Descriptions.Item>
				<Descriptions.Item label='Email'>{currentapplicationForm?.email}</Descriptions.Item>
				<Descriptions.Item label='Số điện thoại'>{currentapplicationForm?.phone}</Descriptions.Item>
				<Descriptions.Item label='Giới tính'>{currentapplicationForm?.gender}</Descriptions.Item>
				<Descriptions.Item label='Địa chỉ'>{currentapplicationForm?.address}</Descriptions.Item>
				<Descriptions.Item label='Sở trường'>{currentapplicationForm?.strengths}</Descriptions.Item>
				<Descriptions.Item label='Câu lạc bộ'>{currentapplicationForm?.clubId}</Descriptions.Item>
				<Descriptions.Item label='Lý do đăng ký'>{currentapplicationForm?.reason}</Descriptions.Item>
				<Descriptions.Item label='Trạng thái'>{currentapplicationForm?.status}</Descriptions.Item>
				<Descriptions.Item label='Ghi chú'>{currentapplicationForm?.note}</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default Show;
