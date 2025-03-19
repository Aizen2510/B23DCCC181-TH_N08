import { getData } from '@/services/interfaceBT03/DanhGia'; // Thay đổi thành service API thật nếu cần
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<DanhGia.Record[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<DanhGia.Record>();

	const getDanhGiaData = async () => {
		const dataLocal: DanhGia.Record[] = JSON.parse(localStorage.getItem('danhgia') || '[]');
		if (!dataLocal?.length) {
			const res = await getData();
			localStorage.setItem('danhgia', JSON.stringify(res?.data ?? []));
			setData(res?.data ?? []);
			return;
		}
		setData(dataLocal);
	};

	return {
		data,
		visible,
		setVisible,
		row,
		setRow,
		isEdit,
		setIsEdit,
		setData,
		getDanhGiaData,
	};
};
