import { useState } from 'react';
import { VanBang, QuyetDinh } from '@/types/index';

export default () => {
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isView, setIsView] = useState<boolean>(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	// model degreeBook
	const [degreeBooks, setDegreeBooks] = useState<VanBang.DegreeBook[]>([]);
	const [selectedBook, setSelectedBook] = useState<VanBang.DegreeBook | null>(null);

	// model graduationDecision
	const [decisions, setDecisions] = useState<QuyetDinh.GraduationDecision[]>([]);
	const [currentDecision, setCurrentDecision] = useState<QuyetDinh.GraduationDecision | null>(null);
	const getDataDegreeBook = () => {
		const dataLocal: any = getFromLocalStorage('degreeBooks');
		// if (!dataLocal?.length) {
		// 	const res = await getSoVanBang();
		// 	localStorage.setItem('so_van_bang', JSON.stringify(res?.data ?? []));
		// 	setData(res?.data ?? []);
		// 	return;
		// }
		setDegreeBooks(dataLocal);
	};
	const getDateGraduationDecision = () => {
		const dataLocal: any = getFromLocalStorage('graduationDecison');
		// if (!dataLocal?.length) {
		// 	const res = getQuyetDinhTotNghiep();
		// 	localStorage.setItem('graduationDecison', JSON.stringify(res?.data ?? []));
		// 	setDecisions(res?.data ?? []);
		// 	return;
		// }
		setDecisions(dataLocal);
	};
	return {
		isEdit,
		setEdit,
		isView,
		setIsView,
		isModalVisible,
		setIsModalVisible,
		isDetail,
		setIsDetail,
		degreeBooks,
		setDegreeBooks,
		getDataDegreeBook,
		selectedBook,
		setSelectedBook,
		decisions,
		setDecisions,
		currentDecision,
		setCurrentDecision,
	};
};
