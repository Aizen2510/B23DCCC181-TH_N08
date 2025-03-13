import { useState } from 'react';
import { getAppointments } from '@/services/interfaceBT03/Appointment';

export default () => {
	const [duLieu, setDuLieu] = useState<Appointment.Record[]>([]);
	const [hienThi, setHienThi] = useState<boolean>(false);
	const [chinhSua, setChinhSua] = useState<boolean>(false);
	const [hang, setHang] = useState<Appointment.Record>();

	const layDuLieuLichHen = async () => {
		const duLieuLocal: any = JSON.parse(localStorage.getItem('appointments') as any);
		if (!duLieuLocal?.length) {
			const res = await getAppointments();
			localStorage.setItem('appointments', JSON.stringify(res?.data ?? []));
			setDuLieu(res?.data ?? []);
			return;
		}
		setDuLieu(duLieuLocal);
	};

	const kiemTraTrungLap = (ngay: string, thoiGian: string) => {
		return duLieu.some(lichHen => lichHen.date === ngay && lichHen.time === thoiGian);
	};

	const chuyenDoiTrangThai = (trangThai: string) => {
		switch (trangThai) {
			case 'PENDING':
				return 'Chờ duyệt';
			case 'CONFIRMED':
				return 'Xác nhận';
			case 'COMPLETED':
				return 'Hoàn thành';
			case 'CANCELED':
				return 'Hủy';
			default:
				return trangThai;
		}
	};

	return {
		duLieu,
		hienThi,
		setHienThi,
		hang,
		setHang,
		chinhSua,
		setChinhSua,
		setDuLieu,
		layDuLieuLichHen,
		kiemTraTrungLap,
        chuyenDoiTrangThai,
	};
};