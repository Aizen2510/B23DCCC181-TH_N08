import React from 'react';
import { Descriptions } from 'antd';
import { useModel } from 'umi';
import { ApplicationForm } from '@/types/QuanLiCauLacBo';
import { getApplicationForms } from '@/services/QuanLiCauLacBo/applicationFormService';
const Show = () => {
	const { applicationForm, setApplicationForm, setIsModalVisible, currentApplicationForm } = useModel(
		'QuanLiCauLacBo.applicationform',
	);
	return (
		<div>
			<Descriptions column={1} bordered size='middle'>
				<Descriptions.Item label='Họ tên'>{currentApplicationForm?.fullName}</Descriptions.Item>
				<Descriptions.Item label='Email'>{currentApplicationForm?.email}</Descriptions.Item>
				<Descriptions.Item label='Số điện thoại'>{currentApplicationForm?.phone}</Descriptions.Item>
				<Descriptions.Item label='Giới tính'>{currentApplicationForm?.gender}</Descriptions.Item>
				<Descriptions.Item label='Địa chỉ'>{currentApplicationForm?.address}</Descriptions.Item>
				<Descriptions.Item label='Sở trường'>{currentApplicationForm?.strengths}</Descriptions.Item>
				<Descriptions.Item label='Câu lạc bộ'>{currentApplicationForm?.clubId}</Descriptions.Item>
				<Descriptions.Item label='Lý do đăng ký'>{currentApplicationForm?.reason}</Descriptions.Item>
				<Descriptions.Item label='Trạng thái'>{currentApplicationForm?.status}</Descriptions.Item>
				<Descriptions.Item label='Ghi chú'>{currentApplicationForm?.note}</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default Show;
