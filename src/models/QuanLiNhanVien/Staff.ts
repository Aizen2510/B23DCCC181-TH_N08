import { useState } from 'react';
import { getData } from '../../services/interfaceBT03/QuanLiNhanVien/index';
import type { UploadFile } from 'antd/es/upload/interface';

export default () => {
	const [staffs, setStaffs] = useState<StaffManagement.Staff[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState<StaffManagement.Staff | null>(null);
	const [filterStatus, setFilterStatus] = useState('all');
	const [searchText, setSearchText] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [row, setRow] = useState<RandomUser.Record>();
	const getDataUser = async () => {
		const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
		if (!dataLocal?.length) {
			const res = await getData();
			localStorage.setItem('data', JSON.stringify(res?.data ?? []));
			setStaffs(res?.data ?? []);
			return;
		}
		setStaffs(dataLocal);
	};

	return {
		staffs,
		setStaffs,
		visible,
		setVisible,
		isEdit,
		setIsEdit,
		row,
		setRow,
		getDataUser,
		setSelectedStaff,
		setFileList,
		setIsScheduleModalVisible,
		filterStatus,
		searchText,
		selectedStaff,
		setFilterStatus,
		setSearchText,
	};
};