import { message } from 'antd';
import { Club, ApplicationForm, ApplicationHistory, Member } from '@/types/QuanLiCauLacBo';
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

//Xử lý CRUD cho đơn đăng ký thành viên
export const getApplicationForms = (): ApplicationForm[] => {
	try {
		const storedData = localStorage.getItem('application_forms');
		return storedData ? JSON.parse(storedData) : [];
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu đơn đăng ký thành viên:', error);
		return [];
	}
};
export const saveApplicationForms = (applications: ApplicationForm[]): void => {
	localStorage.setItem('application_forms', JSON.stringify(applications));
};
export const addApplicationForms = (application: ApplicationForm): void => {
	const applications = getApplicationForms();
	applications.push(application);
	saveApplicationForms(applications);
};
export const updateApplicationForms = (application: ApplicationForm): void => {
	const applications = getApplicationForms();
	const index = applications.findIndex((a) => a.id === application.id);
	if (index !== -1) {
		applications[index] = application;
		saveApplicationForms(applications);
	}
};
export const deleteApplicationForms = (applicationId: string): boolean => {
	try {
		const applications = getApplicationForms();
		const applicationToDelete = applications.find((a) => a.id === applicationId);

		if (!applicationToDelete) {
			message.error('Không tìm thấy đơn đăng ký!');
			return false;
		}

		const updatedApplications = applications.filter((a) => a.id !== applicationId);
		saveApplicationForms(updatedApplications);
		return true;
	} catch (error) {
		console.error('Lỗi khi xóa đơn đăng ký:', error);
		message.error('Có lỗi xảy ra khi xóa đơn đăng ký!');
		return false;
	}
};
export const getApplicationFormById = (applicationId: string): ApplicationForm | undefined => {
	const applications = getApplicationForms();
	return applications.find((application) => application.id === applicationId);
};
export const getApplicationHistory = (): ApplicationHistory[] => {
	try {
		const storedData = localStorage.getItem('application_history');
		return storedData ? JSON.parse(storedData) : [];
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu lịch sử đơn đăng ký:', error);
		return [];
	}
};
export const saveApplicationHistory = (history: ApplicationHistory[]): void => {
	localStorage.setItem('application_history', JSON.stringify(history));
};
export const addApplicationHistory = (historyItem: ApplicationHistory): void => {
	const history = getApplicationHistory();
	history.push(historyItem);
	saveApplicationHistory(history);
};
export const updateApplicationHistory = (historyItem: ApplicationHistory): void => {
	const history = getApplicationHistory();
	const index = history.findIndex((h) => h.id === historyItem.id);
	if (index !== -1) {
		history[index] = historyItem;
		saveApplicationHistory(history);
	}
};
export const deleteApplicationHistory = (historyId: string): boolean => {
	try {
		const history = getApplicationHistory();
		const historyToDelete = history.find((h) => h.id === historyId);

		if (!historyToDelete) {
			message.error('Không tìm thấy lịch sử đơn đăng ký!');
			return false;
		}

		const updatedHistory = history.filter((h) => h.id !== historyId);
		saveApplicationHistory(updatedHistory);
		return true;
	} catch (error) {
		console.error('Lỗi khi xóa lịch sử đơn đăng ký:', error);
		message.error('Có lỗi xảy ra khi xóa lịch sử đơn đăng ký!');
		return false;
	}
};
export const getApplicationHistoryById = (historyId: string): ApplicationHistory | undefined => {
	const history = getApplicationHistory();
	return history.find((historyItem) => historyItem.id === historyId);
};

// Xử lý CRUD cho member
export const getMembers = (): Member[] => {
	try {
		const storedData = localStorage.getItem('members');
		return storedData ? JSON.parse(storedData) : [];
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu thành viên:', error);
		return [];
	}
};
export const saveMembers = (members: Member[]): void => {
	localStorage.setItem('members', JSON.stringify(members));
};
export const addMember = (member: Member): void => {
	const members = getMembers();
	members.push(member);
	saveMembers(members);
};
export const updateMember = (member: Member): void => {
	const members = getMembers();
	const index = members.findIndex((m) => m.id === member.id);
	if (index !== -1) {
		members[index] = member;
		saveMembers(members);
	}
};
export const deleteMember = (memberId: string): boolean => {
	try {
		const members = getMembers();
		const memberToDelete = members.find((m) => m.id === memberId);

		if (!memberToDelete) {
			message.error('Không tìm thấy thành viên!');
			return false;
		}

		const updatedMembers = members.filter((m) => m.id !== memberId);
		saveMembers(updatedMembers);
		return true;
	} catch (error) {
		console.error('Lỗi khi xóa thành viên:', error);
		message.error('Có lỗi xảy ra khi xóa thành viên!');
		return false;
	}
};
export const getMemberById = (memberId: string): Member | undefined => {
	const members = getMembers();
	return members.find((member) => member.id === memberId);
};
export const getMemberByClubId = (clubId: string): Member[] => {
	const members = getMembers();
	return members.filter((member) => member.clubId === clubId);
};
// export const getMemberByApplicationId = (applicationId: string): Member | undefined => {
// 	const members = getMembers();
// 	return members.find((member) => member.applicationId === applicationId);
// }
// export const getMemberByStudentId = (studentId: string): Member | undefined => {
// 	const members = getMembers();
// 	return members.find((member) => member.studentId === studentId);
// }

// Current admin operations
export const setCurrentAdmin = (adminName: string): void => {
	localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, adminName);
};

export const getCurrentAdmin = (): string => {
	return localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN) || 'Admin';
};

// Initialize demo data
export const initializeDemoData = (): void => {
	// Check if data already exists
	if (getClubs().length === 0) {
		const demoClubs: Club[] = [
			{
				id: '1',
				name: 'Câu Lạc Bộ Kỹ Thuật',
				avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				establishedDate: '2020-01-01',
				description: '<p>Câu lạc bộ dành cho những người yêu thích kỹ thuật và công nghệ</p>',
				leader: 'Nguyễn Văn A',
				isActive: true,
			},
			{
				id: '2',
				name: 'Câu Lạc Bộ Âm Nhạc',
				avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				establishedDate: '2019-05-15',
				description: '<p>Nơi giao lưu cho những người đam mê âm nhạc</p>',
				leader: 'Trần Thị B',
				isActive: true,
			},
			{
				id: '3',
				name: 'Câu Lạc Bộ Thể Thao',
				avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				establishedDate: '2021-03-22',
				description: '<p>Câu lạc bộ cho những người yêu thích thể thao và sức khỏe</p>',
				leader: 'Lê Văn C',
				isActive: false,
			},
		];
		saveClubs(demoClubs);

		// Demo application forms
		const demoForms: ApplicationForm[] = [
			{
				id: '1',
				fullName: 'Phạm Văn X',
				email: 'phamx@example.com',
				phone: '0912345678',
				gender: 'Male',
				address: 'Hà Nội',
				strengths: 'Lập trình, thiết kế',
				clubId: '1',
				reason: 'Muốn nâng cao kỹ năng lập trình',
				status: 'Pending',
			},
			{
				id: '2',
				fullName: 'Nguyễn Thị Y',
				email: 'nguyeny@example.com',
				phone: '0987654321',
				gender: 'Female',
				address: 'TP.HCM',
				strengths: 'Ca hát, sáng tác',
				clubId: '2',
				reason: 'Yêu thích âm nhạc và muốn phát triển tài năng',
				status: 'Approved',
				history: [
					{
						id: '1',
						applicationId: '2',
						action: 'Approved',
						adminName: 'Admin',
						timestamp: '2024-04-05T09:30:00Z',
					},
				],
			},
		];
		saveApplicationForms(demoForms);

		// Set default admin
		// setCurrentAdmin('Admin');
	}
};
