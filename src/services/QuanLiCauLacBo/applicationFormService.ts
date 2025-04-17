import { message } from 'antd';
import { Club, ApplicationForm, ApplicationHistory, Member, ApplicationStatus } from '@/types/QuanLiCauLacBo';

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
// Xử lý CRUD cho lịch sử đơn đăng ký
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

export const updateApplicationStatus = (
	id: string,
	status: ApplicationStatus,
	note?: string,
	adminUser: string = 'Admin User',
): void => {
	try {
		const application = getApplicationFormById(id);
		if (!application) {
			message.error('Không tìm thấy đơn đăng ký!');
			return;
		}
		application.status = status as ApplicationStatus;
		application.note = note;
		updateApplicationForms(application);

		const historyItem: ApplicationHistory = {
			id: `${id}_${new Date().toISOString()}`,
			applicationId: id,
			action: status as 'Approved' | 'Rejected',
			adminName: adminUser,
			timestamp: new Date().toISOString(),
			reason: status === 'Rejected' ? note : undefined,
		};
		addApplicationHistory(historyItem);

		message.success('Cập nhật trạng thái thành công!');
	} catch (error) {
		console.error('Lỗi khi cập nhật trạng thái:', error);
		message.error('Có lỗi xảy ra khi cập nhật trạng thái!');
	}
};
