import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormAppointment from './Form';

const AppointmentPage = () => {
	const { duLieu, layDuLieuLichHen, setHang, chinhSua, setHienThi, setChinhSua, hienThi, setDuLieu, chuyenDoiTrangThai } = useModel('appointment');

	useEffect(() => {
		layDuLieuLichHen();
	}, []);

	const columns: IColumn<Appointment.Record>[] = [
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
			width: 200,
		},
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
			width: 100,
		},
		{
			title: 'Nhân viên',
			dataIndex: 'employee',
			key: 'employee',
			width: 150,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			width: 120,
render: (text) => chuyenDoiTrangThai(text),
		},
		{
			title: 'Hoạt động',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setHienThi(true);
								setHang(record);
								setChinhSua(true);
							}}
						>
							Chỉnh sửa
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const duLieuLocal: any = JSON.parse(localStorage.getItem('appointments') as any);
								const duLieuMoi = duLieuLocal.filter((item: any) => item.id !== record.id);
								localStorage.setItem('appointments', JSON.stringify(duLieuMoi));
								setDuLieu(duLieuMoi);
							}}
							type='primary'
						>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setHienThi(true);
					setChinhSua(false);
setHang(undefined);
				}}
			>
				Thêm lịch hẹn
			</Button>

			<Table dataSource={duLieu} columns={columns} rowKey="id" />

			<Modal
				destroyOnClose
				footer={false}
				title={chinhSua ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn'}
				visible={hienThi}
				onOk={() => {}}
				onCancel={() => {
					setHienThi(false);
				}}
			>
				<FormAppointment />
			</Modal>
		</div>
	);
};

export default AppointmentPage;