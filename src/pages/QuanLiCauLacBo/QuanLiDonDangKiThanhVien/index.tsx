import { useEffect, useState } from 'react';
import FormInput from './form';
import Show from './show';
import { useModel } from 'umi';
import {
	Button,
	Modal,
	Table,
	Descriptions,
	Input,
	message,
	Popconfirm,
	Tag,
	Space,
	Tooltip,
	Row,
	Col,
	Badge,
	Form,
} from 'antd';
import { ApplicationForm, ApplicationHistory, ApplicationStatus } from '@/types/QuanLiCauLacBo';
import type { IColumn } from '@/components/Table/typing';
import {
	DeleteOutlined,
	EyeOutlined,
	HistoryOutlined,
	CheckOutlined,
	CloseOutlined,
	EditOutlined,
	SearchOutlined,
} from '@ant-design/icons';
// import ApplicationDetail from './ApplicationDetail';
import ApplicationHistoryComponent from './ApplicationHistory';
// import BulkActionModal from './BulkActionModal';
import {
	getApplicationForms,
	getApplicationHistory,
	deleteApplicationForms,
	saveApplicationHistory,
	saveApplicationForms,
	addApplicationHistory,
	updateApplicationStatus,
} from '@/services/QuanLiCauLacBo/applicationFormService';
const Index = () => {
	const {
		isModalVisible,
		setIsModalVisible,
		isDetail,
		setIsDetail,
		isLoading,
		setLoading,
		searchText,
		setSearchText,
		applicationForm,
		setApplicationForm,
		currentApplicationForm,
		setCurrentApplicationForm,
		filteredApplicationForm,
		setFilteredApplicationForm,
		history,
		setHistory,
		isRejectModalOpen,
		setIsRejectModalOpen,
		rejectReason,
		setRejectReason,
		isHistoryModalOpen,
		setIsHistoryModalOpen,
		selectedApplicationForms,
		setSelectedApplicationForms,
		fetchApplications,
		fetchHistory,
		applyFilteredApplications,
	} = useModel('QuanLiCauLacBo.applicationform');
	const { clubs, fetchClub } = useModel('QuanLiCauLacBo.clubs');
	useEffect(() => {
		fetchApplications();
		fetchHistory();
		fetchClub();
	}, []);

	useEffect(() => {
		applyFilteredApplications(applicationForm, searchText);
	}, [applicationForm, searchText]);

	const showModal = (application_forms?: ApplicationForm) => {
		setCurrentApplicationForm(application_forms || null);

		setIsModalVisible(true);
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteApplicationForms(id);
			message.success('Xóa đơn đăng ký thành công');
			fetchApplications();
		} catch (error) {
			message.error('Không thể xóa đơn đăng ký');
		}
	};

	const handleStatusChange = async (id: string, status: ApplicationStatus, note?: string) => {
		try {
			await updateApplicationStatus(id, status, note, 'Admin User');
			message.success(`Cập nhật trạng thái thành ${status} thành công`);
			fetchApplications();
		} catch (error) {
			message.error('Không thể cập nhật trạng thái đơn đăng ký');
		}
	};

	const handleApprove = (id?: string) => {
		if (selectedApplicationForms.length === 0) {
			message.warning('Vui lòng chọn ít nhất một đơn đăng ký');
			return;
		}
		if (id) {
			handleStatusChange(id, 'Approved');
		}

		selectedApplicationForms.map((item) => {
			handleStatusChange(item.id, 'Approved');
		});
		fetchApplications();
		fetchHistory();
		setSelectedApplicationForms([]);
		message.success('Đã duyệt đơn!');
	};

	const handleRejectConfirm = (id?: string) => {
		if (selectedApplicationForms.length === 0) {
			message.warning('Vui lòng chọn ít nhất một đơn đăng ký');
			return;
		}

		Modal.confirm({
			title: 'Từ chối đơn đăng ký',
			content: (
				<Form layout='vertical'>
					<Form.Item label='Lý do từ chối' name='rejectReason' rules={[{ required: true }]}>
						<Input.TextArea rows={4} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
					</Form.Item>
				</Form>
			),
			onOk: () => {
				if (!rejectReason.trim()) {
					message.error('Vui lòng nhập lý do từ chối');
					return Promise.reject('Vui lòng nhập lý do từ chối');
				}
				if (id) {
					handleStatusChange(id, 'Rejected', rejectReason);
				}

				selectedApplicationForms.map((item) => {
					handleStatusChange(item.id, 'Rejected');
				});
			},
		});

		getApplicationForms();
		getApplicationHistory();
		setIsRejectModalOpen(false);
		setSelectedApplicationForms([]);
		setRejectReason('');
		message.success('Đã từ chối đơn!');
	};

	const rowSelection = {
		selectedRowKeys: selectedApplicationForms.map((form) => form.id),
		onChange: (selectedRowKeys: React.Key[], selectedRows: ApplicationForm[]) => {
			setSelectedApplicationForms(selectedRows);
		},
		getCheckboxProps: (record: ApplicationForm) => ({
			disabled: record.status !== 'Pending',
		}),
	};

	const getClubNameById = (clubId: string) => {
		const club = clubs.find((c) => c.id === clubId);
		return club ? club.name : 'Không xác định';
	};

	const getStatusTag = (status: ApplicationStatus) => {
		switch (status) {
			case 'Pending':
				return <Tag color='blue'>Chờ duyệt</Tag>;
			case 'Approved':
				return <Tag color='green'>Đã duyệt</Tag>;
			case 'Rejected':
				return <Tag color='red'>Từ chối</Tag>;
			default:
				return <Tag>Không xác định</Tag>;
		}
	};

	const viewDetail = (record: ApplicationForm) => {
		setCurrentApplicationForm(record);
		setIsDetail(true);
	};

	const handleViewHistory = (record: ApplicationForm) => {
		setCurrentApplicationForm(record);
		setIsHistoryModalOpen(true);
	};

	const handleSearch = (value: string) => {
		setSearchText(value);
	};

	const columns: IColumn<ApplicationForm>[] = [
		{ title: 'Họ Tên', dataIndex: 'fullName', key: 'name', width: 50 },
		{ title: 'Email', dataIndex: 'email', key: 'email', width: 50 },
		{ title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone', width: 40 },
		{ title: 'Giới Tính', dataIndex: 'gender', key: 'gender', width: 40 },
		{ title: 'Địa Chỉ', dataIndex: 'address', key: 'address', width: 100 },
		{ title: 'Sở Trường', dataIndex: 'strengths', key: 'strengths', width: 100 },
		{
			title: 'Câu lạc bộ',
			dataIndex: 'clubId',
			key: 'clubId',
			width: 50,
			render: (clubId: string) => getClubNameById(clubId),
			filters: clubs.map((club) => ({ text: club.name, value: club.id })),
			onFilter: (value: string | number | boolean, record: ApplicationForm) => record.clubId === value,
		},
		{ title: 'Lí Do Đăng Ký', dataIndex: 'reason', key: 'reason', width: 100 },
		{
			title: 'Trạng Thái',
			dataIndex: 'status',
			key: 'status',
			width: 50,
			render: (status: ApplicationStatus) => getStatusTag(status),
			filters: [
				{ text: 'Chờ duyệt', value: 'Pending' },
				{ text: 'Đã duyệt', value: 'Approved' },
				{ text: 'Từ chối', value: 'Rejected' },
			],
			onFilter: (value: string | number | boolean, record: ApplicationForm) => record.status === value,
		},
		{ title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 100 },
		{
			title: 'Hành Động',
			key: 'action',
			width: 200,
			render: (_: any, record: ApplicationForm) => (
				<Space size='middle'>
					<Button type='default' icon={<EditOutlined />} onClick={() => showModal(record)} />

					<Popconfirm
						title='Bạn có chắc chắn muốn xóa đơn đăng ký này?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button type='primary' danger icon={<DeleteOutlined />} size='small' />
					</Popconfirm>
					<Button type='default' icon={<EyeOutlined />} onClick={() => viewDetail(record)} size='small' />
					<Button
						type='default'
						icon={<HistoryOutlined />}
						onClick={() => handleViewHistory(record)}
						disabled={!record.history || record.history.length === 0}
					/>
					{record.status === 'Pending' && (
						<>
							<Tooltip title='Duyệt'>
								<Button type='primary' icon={<CheckOutlined />} onClick={() => handleApprove(record.id)} />
							</Tooltip>
							<Tooltip title='Từ chối'>
								<Button danger icon={<CloseOutlined />} onClick={() => handleRejectConfirm(record.id)} />
							</Tooltip>
						</>
					)}
				</Space>
			),
		},
	];

	return (
		<div>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={4}>
					<Button type='primary' onClick={() => showModal()}>
						Thêm đơn đăng ký
					</Button>
				</Col>
				<Col span={8}>
					<Input
						placeholder='Tìm kiếm theo tên, email, SĐT'
						onChange={(e) => handleSearch(e.target.value)}
						suffix={<SearchOutlined />}
						allowClear
					/>
				</Col>
				<Col span={6}>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
						<Badge count={selectedApplicationForms.length} offset={[-8, 0]}>
							<Button
								type='primary'
								onClick={() => handleApprove()}
								disabled={selectedApplicationForms.length === 0}
								icon={<CheckOutlined />}
							>
								Duyệt đã chọn
							</Button>
						</Badge>
						<Badge count={selectedApplicationForms.length} offset={[-8, 0]}>
							<Button
								danger
								onClick={() => handleRejectConfirm()}
								disabled={selectedApplicationForms.length === 0}
								icon={<CloseOutlined />}
							>
								Từ chối đã chọn
							</Button>
						</Badge>
					</div>
				</Col>
				<Col span={6}>
					<div>
						<Button style={{ marginRight: 10 }} onClick={() => setIsHistoryModalOpen(true)}>
							Xem lịch sử thao tác
						</Button>
					</div>
				</Col>
			</Row>
			{/* <div style={{ marginBottom: 16 }}>
				<Button type='primary' onClick={() => showModal()}>
					Thêm đơn đăng ký
				</Button>
				{selectedApplicationForms.length > 0 && (
					<>
						<Button style={{ marginLeft: 10 }} onClick={() => handleApprove()}>
							Duyệt {selectedApplicationForms.length} đơn đã chọn
						</Button>
						<Button danger style={{ marginLeft: 10 }} onClick={() => setIsRejectModalOpen(true)}>
							Từ chối {selectedApplicationForms.length} đơn đã chọn
						</Button>
					</>
				)}
				<Button style={{ marginLeft: 10 }} onClick={() => setIsHistoryModalOpen(true)}>
					Xem lịch sử thao tác
				</Button>
			</div> */}

			<Table dataSource={filteredApplicationForm} columns={columns} rowSelection={rowSelection} rowKey='id' />

			<Modal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
				title={currentApplicationForm ? 'Sửa đơn đăng ký' : 'Thêm đơn đăng ký'}
			>
				<FormInput />
			</Modal>

			{/* {currentApplicationForm && (
				<Modal
					title='Chi tiết đơn đăng ký'
					visible={isDetail}
					footer={null}
					onCancel={() => setIsModalVisible(false)}
					width={700}
				>
					<ApplicationDetail
						application={currentApplicationForm}
						clubs={clubs}
						onCancel={() => setIsHistoryModalOpen(false)}
						onSubmitSuccess={() => {
							setIsDetail(false);
							fetchApplications();
						}}
					/>
				</Modal>
			)} */}

			<Modal
				visible={isDetail}
				onCancel={() => setIsDetail(false)}
				footer={<Button onClick={() => setIsDetail(false)}>Đóng</Button>}
				title='Chi tiết đơn đăng ký'
				width={700}
			>
				<Show />
			</Modal>

			{currentApplicationForm && (
				<Modal
					title='Lịch sử thao tác'
					visible={isHistoryModalOpen}
					footer={null}
					onCancel={() => setIsHistoryModalOpen(false)}
					width={700}
				>
					<ApplicationHistoryComponent
						applicationId={currentApplicationForm.id}
						history={currentApplicationForm.history || []}
					/>
				</Modal>
			)}

			{/* <Modal
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
			</Modal> */}
		</div>
	);
};

export default Index;
