import { useState } from 'react';
import { Degree } from '@/types';
export default () => {
	const [degree, setDegree] = useState<Degree | null>(null);
	const [degreeList, setDegreeList] = useState<Degree[]>([]);

	const getDataDegree = () => {
		const dataLocal: any = localStorage.getItem('degreeBooks');
		setDegree(dataLocal ? JSON.parse(dataLocal) : []);
	};

	return {
		degree,
		setDegree,
		degreeList,
		setDegreeList,
		getDataDegree,
	};
};
