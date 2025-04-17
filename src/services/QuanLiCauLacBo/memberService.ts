import { message } from 'antd';
import { Club, ApplicationForm, ApplicationHistory, Member, ApplicationStatus } from '@/types/QuanLiCauLacBo';

// Xử lý CRUD cho member
export const getAllMembers = (): Member[] => {
	try {
		const storedData = localStorage.getItem('members');
		return storedData ? JSON.parse(storedData) : [];
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu thành viên:', error);
		return [];
	}
};

export const getMembersByClubId = (clubId: string): Member[] => {
	const members = getAllMembers();
	return members.filter((member) => member.clubId === clubId);
};

export const saveMembers = (members: Member[]): void => {
	localStorage.setItem('members', JSON.stringify(members));
};
export const addMember = (member: Member): void => {
	const members = getAllMembers();
	members.push(member);
	saveMembers(members);
};
export const updateMember = (member: Member): void => {
	const members = getAllMembers();
	const index = members.findIndex((m) => m.id === member.id);
	if (index !== -1) {
		members[index] = member;
		saveMembers(members);
	}
};
export const deleteMember = (memberId: string): boolean => {
	try {
		const members = getAllMembers();
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
	const members = getAllMembers();
	return members.find((member) => member.id === memberId);
};
export const getMemberByClubId = (clubId: string): Member[] => {
	const members = getAllMembers();
	return members.filter((member) => member.clubId === clubId);
};

export const getClubNameById = (clubId: string): string | undefined => {
	try {
		const storedClubs = localStorage.getItem('clubs');
		const clubs: Club[] = storedClubs ? JSON.parse(storedClubs) : [];
		const club = clubs.find((c) => c.id === clubId);
		return club ? club.name : undefined;
	} catch (error) {
		console.error('Lỗi khi lấy tên câu lạc bộ:', error);
		return undefined;
	}
};
// export const getMemberByApplicationId = (applicationId: string): Member | undefined => {
// 	const members = getAllMembers();
// 	return members.find((member) => member.applicationId === applicationId);
// }
// export const getMemberByStudentId = (studentId: string): Member | undefined => {
// 	const members = getAllMembers();
// 	return members.find((member) => member.studentId === studentId);
// }
export const changeMembersClub = (selectedRowKeys: string[], targetClubId: string): void => {
	try {
		const members = getAllMembers();
		const updatedMembers = members.map((member) => {
			if (selectedRowKeys.includes(member.id)) {
				return { ...member, clubId: targetClubId };
			}
			return member;
		});
		saveMembers(updatedMembers);
		message.success('Chuyển câu lạc bộ thành công!');
	} catch (error) {
		console.error('Lỗi khi chuyển câu lạc bộ:', error);
		message.error('Có lỗi xảy ra khi chuyển câu lạc bộ!');
	}
};
