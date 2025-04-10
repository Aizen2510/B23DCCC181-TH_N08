import { useEffect, useState } from 'react';
import FormInput from './form';
import Show from './show';
import { useModel } from 'umi';
import { Button, Modal, Table, Descriptions, Input, message, Popconfirm } from 'antd';
import { ApplicationForm, ApplicationHistory } from '@/types/QuanLiCauLacBo';
import type { IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import {
	getApplicationForms,
	getApplicationHistory,
	deleteMembershipApplication,
	saveApplicationHistory,
} from '@/services/QuanLiCauLacBo/clubManagementService';
const Index = () => {
	const {
		applicationForm,
		setApplicationForm,
		setIsModalVisible,
		currentapplicationForm,
		setCurrentApplicationForm,
		setIsRejectModalOpen,
		isHistoryModalOpen,
		setRejectReason,
		setIsHistoryModalOpen,
		rejectReason,
		isRejectModalOpen,
		isModalVisible,
		isDetail,
		setIsDetail,
		isEdit,
		history,
	} = useModel('QuanLiCauLacBo.clubs');

	useEffect(() => {
		getApplicationForms();
		getApplicationHistory();
	}, []);

	const showModal = (application_forms?: ApplicationForm) => {
		setCurrentApplicationForm(application_forms || null);

		setIsModalVisible(true);
	};

	const handleDelete = (id: string) => {
		deleteMembershipApplication(id);
		message.success('Xóa đơn đăng ký thành công!');
		// fetchClub();
	};

	const handleApprove = () => {
		const newData = applicationForm.map((item) => {
			if (applicationForm.some((row) => row.id === item.id)) {
				saveApplicationHistory({
					id: currentapplicationForm ? currentapplicationForm.id : uuidv4(),
					adminName: 'Admin',
					applicationId: item.id,
					action: 'Approved',
					reason: '',
					timestamp: new Date().toISOString(),
				});
				return { ...item, status: 'Approved' };
			}
			return item;
		});
		localStorage.setItem('application_forms', JSON.stringify(newData));
		getApplicationForms();
		setApplicationForm([]);
		message.success('Đã duyệt đơn!');
	};

	const handleRejectConfirm = () => {
		if (!rejectReason.trim()) {
			message.warning('Vui lòng nhập lý do từ chối!');
			return;
		}

		const newData = applicationForm.map((item) => {
			if (applicationForm.some((row) => row.id === item.id)) {
				saveApplicationHistory({
					id: currentapplicationForm ? currentapplicationForm.id : uuidv4(),
					adminName: 'Admin',
					applicationId: item.id,
					action: 'Rejected',
					reason: rejectReason,
					timestamp: new Date().toISOString(),
				});
				return { ...item, status: 'Rejected', note: rejectReason };
			}
			return item;
		});

		localStorage.setItem('applicationForm', JSON.stringify(newData));
		getApplicationForms();
		setIsRejectModalOpen(false);
		setApplicationForm([]);
		setRejectReason('');
		message.success('Đã từ chối đơn!');
	};

	// View club members
	const viewDetail = (record: ApplicationForm) => {
		// setSelectedClubId(clubId);
		// setShowMembers(true);
		setCurrentApplicationForm(record);
		setIsDetail(true);
	};

	const columns: IColumn<ApplicationForm>[] = [
		{ title: 'Họ Tên', dataIndex: 'fullName', key: 'name', width: 50 },
		{ title: 'Email', dataIndex: 'email', key: 'email', width: 50 },
		{ title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone', width: 40 },
		{ title: 'Giới Tính', dataIndex: 'gender', key: 'gender', width: 40 },
		{ title: 'Địa Chỉ', dataIndex: 'address', key: 'address', width: 100 },
		{ title: 'Sở Trường', dataIndex: 'strengths', key: 'strengths', width: 100 },
		{ title: 'CLB Muốn Đăng Ký', dataIndex: 'clubId', key: 'clubId', width: 50 },
		{ title: 'Lí Do Đăng Ký', dataIndex: 'reason', key: 'reason', width: 100 },
		{ title: 'Trạng Thái', dataIndex: 'status', key: 'status', width: 50 },
		{ title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 100 },
		{
			title: 'Hành Động',
			key: 'action',
			width: 200,
			render: (_: any, record: ApplicationForm) => (
				<div>
					<Button onClick={() => showModal(record)}>Edit</Button>

					<Popconfirm
						title='Bạn có chắc chắn muốn xóa đơn đăng ký này?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button type='primary' danger icon={<DeleteOutlined />} size='small' />
					</Popconfirm>
					<Button type='default' icon={<EyeOutlined />} onClick={() => viewDetail(record)} size='small' />
				</div>
			),
		},
	];

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button type='primary' onClick={() => showModal()}>
					Thêm đơn đăng ký
				</Button>
				{applicationForm.length > 0 && (
					<>
						<Button style={{ marginLeft: 10 }} onClick={handleApprove}>
							Duyệt {applicationForm.length} đơn đã chọn
						</Button>
						<Button danger style={{ marginLeft: 10 }} onClick={() => setIsRejectModalOpen(true)}>
							Từ chối {applicationForm.length} đơn đã chọn
						</Button>
					</>
				)}
				<Button style={{ marginLeft: 10 }} onClick={() => setIsHistoryModalOpen(true)}>
					Xem lịch sử thao tác
				</Button>
			</div>

			<Table
				dataSource={applicationForm}
				columns={columns}
				rowSelection={{
					onChange: (_, rows) => setApplicationForm(rows),
				}}
				rowKey='id'
			/>

			<Modal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
				title={currentapplicationForm ? 'Sửa đơn đăng ký' : 'Thêm đơn đăng ký'}
			>
				<FormInput />
			</Modal>

			<Modal
				visible={isDetail}
				onCancel={() => setIsDetail(false)}
				footer={<Button onClick={() => setIsDetail(false)}>Đóng</Button>}
				title='Chi tiết đơn đăng ký'
				width={700}
			>
				<Show />
			</Modal>

			<Modal
				visible={isRejectModalOpen}
				title='Nhập lý do từ chối'
				onCancel={() => setIsRejectModalOpen(false)}
				onOk={handleRejectConfirm}
			>
				<Input.TextArea rows={4} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
			</Modal>

			<Modal
				visible={isHistoryModalOpen}
				title='Lịch sử thao tác'
				onCancel={() => setIsHistoryModalOpen(false)}
				footer={<Button onClick={() => setIsHistoryModalOpen(false)}>Đóng</Button>}
			>
				{history.length > 0 ? (
					history.map((h: ApplicationHistory, index: number) => (
						<p key={index}>
							🕓 [{new Date(h.timestamp).toLocaleString()}] - {h.action} - Lý do: {h.reason || 'Không có'} - ID:{' '}
							{h.applicationId}
						</p>
					))
				) : (
					<p>Chưa có lịch sử thao tác.</p>
				)}
			</Modal>
		</div>
	);
};

export default Index;
