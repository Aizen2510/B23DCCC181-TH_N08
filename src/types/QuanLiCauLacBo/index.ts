//CSDL " clubs"
export interface Club {
	id: string;
	name: string;
	avatarUrl: string;
	establishedDate: string; // ISO format
	description: string; // HTML content
	leader: string;
	isActive: boolean;
}
export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

// CSDL " application_forms"
export interface ApplicationForm {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	gender: 'Male' | 'Female' | 'Other';
	address: string;
	strengths: string; // Điểm mạnh
	clubId: string; // Liên kết với Club
	reason: string;
	status: ApplicationStatus;
	note?: string; // Lý do từ chối (nếu có)
	history?: ApplicationHistory[]; // Lưu thao tác
}
// CSDL " application_history"
export interface ApplicationHistory {
	id: string;
	applicationId: string; // Liên kết với ApplicationForm
	action: 'Approved' | 'Rejected';
	reason?: string; // Chỉ có nếu bị từ chối
	adminName: string;
	timestamp: string;
}
// CSDL " members"
export interface Member {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	gender: 'Male' | 'Female' | 'Other';
	address: string;
	strengths: string;
	clubId: string;
	joinedAt: string;
}

export interface ClubStatistic {
	clubId: string;
	clubName: string;
	pending: number;
	approved: number;
	rejected: number;
}
