import { getData } from '@/services/RandomUser';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<RandomUser.Record>();

	const getDataUser = async () => {
		const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
		if (!dataLocal?.length) {
			const res = await getData();
			localStorage.setItem('data', JSON.stringify(res?.data ?? []));
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
		getDataUser,
	};
};
