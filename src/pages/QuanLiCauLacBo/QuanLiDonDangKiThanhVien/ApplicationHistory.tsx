import React, { useState, useEffect } from 'react';
import { Timeline, Tag, Empty, Spin } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ApplicationHistory } from '@/types/QuanLiCauLacBo';
import { getApplicationHistory } from '@/services/QuanLiCauLacBo/applicationFormService';
import { useModel } from 'umi';
interface ApplicationHistoryProps {
	applicationId: string;
	history?: ApplicationHistory[];
}

const ApplicationHistoryComponent: React.FC<ApplicationHistoryProps> = ({ applicationId, history: initialHistory }) => {
	const { history, setHistory, fetchApplications, fetchHistory, applyFilteredApplications, isLoading } = useModel(
		'QuanLiCauLacBo.applicationform',
	);

	useEffect(() => {
		fetchHistory();
	}, [applicationId]);

	const getActionIcon = (action: string) => {
		switch (action) {
			case 'Approved':
				return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
			case 'Rejected':
				return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
			default:
				return <ClockCircleOutlined />;
		}
	};

	const getActionColor = (action: string) => {
		switch (action) {
			case 'Approved':
				return 'green';
			case 'Rejected':
				return 'red';
			default:
				return 'blue';
		}
	};

	if (isLoading) {
		return <Spin tip='Đang tải...' />;
	}

	if (!history || history.length === 0) {
		return <Empty description='Không có lịch sử thao tác' />;
	}

	return (
		<Timeline mode='left'>
			{history.map((item) => (
				<Timeline.Item key={item.id} dot={getActionIcon(item.action)} color={getActionColor(item.action)}>
					<div>
						<Tag color={getActionColor(item.action)}>{item.action}</Tag>
						<span style={{ marginLeft: 8 }}>
							bởi <strong>{item.adminName}</strong> vào lúc {new Date(item.timestamp).toLocaleString('vi-VN')}
						</span>
					</div>
					{item.reason && <div style={{ margin: '8px 0 0 0', color: '#666' }}>Lý do: {item.reason}</div>}
				</Timeline.Item>
			))}
		</Timeline>
	);
};

export default ApplicationHistoryComponent;
