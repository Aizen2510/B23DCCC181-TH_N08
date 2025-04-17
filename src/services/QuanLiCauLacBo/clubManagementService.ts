import { message } from 'antd';
import { Club, ApplicationForm, ApplicationHistory, Member } from '@/types/QuanLiCauLacBo';
import { saveApplicationForms } from '@/services/QuanLiCauLacBo/applicationFormService';
export const STORAGE_KEYS = {
	CLUBS: 'clubs',
	APPLICATION_FORMS: 'application_forms',
	APPLICATION_HISTORY: 'application_history',
	CURRENT_ADMIN: 'current_admin',
};
// Xử lý CRUD cho câu lạc bộ
export const getClubs = (): Club[] => {
	try {
		const storedData = localStorage.getItem('clubs');
		// if (!storedData) {
		// 	const initialData = initializeSampleData();
		// 	localStorage.setItem('clubs', JSON.stringify(initialData));
		// 	return initialData;
		// }
		return storedData ? JSON.parse(storedData) : [];
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu khóa học:', error);
		return [];
	}
};
export const saveClubs = (clubs: Club[]): void => {
	localStorage.setItem(STORAGE_KEYS.CLUBS, JSON.stringify(clubs));
};

export const addClub = (club: Club): void => {
	const clubs = getClubs();
	clubs.push(club);
	saveClubs(clubs);
};

export const updateClub = (club: Club): void => {
	const clubs = getClubs();
	const index = clubs.findIndex((c) => c.id === club.id);
	if (index !== -1) {
		clubs[index] = club;
		saveClubs(clubs);
	}
};

export const deleteClub = (clubId: string): boolean => {
	try {
		const clubs = getClubs();
		const clubToDelete = clubs.find((c) => c.id === clubId);

		if (!clubToDelete) {
			message.error('Không tìm thấy câu lạc bộ!');
			return false;
		}

		const updatedClubs = clubs.filter((c) => c.id !== clubId);
		saveClubs(updatedClubs);
		return true;
	} catch (error) {
		console.error('Lỗi khi xóa câu lạc bộ:', error);
		message.error('Có lỗi xảy ra khi xóa câu lạc bộ!');
		return false;
	}
};

export const getClubById = (clubId: string): Club | undefined => {
	const clubs = getClubs();
	return clubs.find((club) => club.id === clubId);
};

export const getClubNameById = (clubId: string): string => {
	const club = getClubById(clubId);
	return club ? club.name : 'Câu lạc bộ không tồn tại';
};

// Current admin operations
export const setCurrentAdmin = (adminName: string): void => {
	localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, adminName);
};

export const getCurrentAdmin = (): string => {
	return localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN) || 'Admin';
};
