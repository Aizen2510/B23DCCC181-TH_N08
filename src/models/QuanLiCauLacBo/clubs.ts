import { useState } from 'react';
import type {
	Club,
	Member,
	ApplicationForm,
	ApplicationHistory,
	ApplicationStatus,
} from '@/types/QuanLiCauLacBo/index';
import { set } from 'lodash';
import { getClubs } from '@/services/QuanLiCauLacBo/clubManagementService';
import { message } from 'antd';
const useClubsModel = () => {
	//common model
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);

	// Modal clubs
	const [searchText, setSearchText] = useState<string>('');
	const [clubs, setClubs] = useState<Club[]>([]);
	const [currentClub, setCurrentClub] = useState<Club | null>(null);
	const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
	const [selectedClubId, setSelectedClubId] = useState<string>('');

	// Áp dụng bộ lọc cho câu lạc bộ và chủ nhiệm
	const applyFilters = (data: Club[], search: string) => {
		let filtered = [...data];
		if (search) {
			filtered = filtered.filter(
				(club) =>
					club.name.toLowerCase().includes(search.toLowerCase()) ||
					club.leader.toLowerCase().includes(search.toLowerCase()),
			);
		}
		setFilteredClubs(filtered);
	};

	const fetchClub = async () => {
		setLoading(true);
		try {
			const data = await getClubs();
			setClubs(data);
			applyFilters(data, searchText);
		} catch (error) {
			message.error('Không thể tải danh sách câu lạc bộ');
		} finally {
			setLoading(false);
		}
		setLoading(false);
	};

	//Model members
	const [members, setMembers] = useState<Member[]>([]);
	const [selectedMembers, setSelectedMembers] = useState<Member | null>(null); // Thành viên được chọn
	const [selectedClubFilter, setSelectedClubFilter] = useState<string>(''); // Lọc theo CLB
	const [sortBy, setSortBy] = useState<'joinedAt' | 'fullName'>('joinedAt');
	const [search, setSearch] = useState('');

	// Lấy danh sách thành viên từ localStorage (giả lập API)
	const fetchMembers = async () => {
		const localData: Member[] = JSON.parse(localStorage.getItem('memberManagement') || '[]');
		if (!Array.isArray(localData)) {
			console.error('Invalid data format in localStorage.');
			setMembers([]);
			return;
		}
		setMembers(localData);
	};

	// Lọc thành viên theo CLB và trạng thái Approved (giả sử chỉ lưu Approved vào localStorage)
	const getApprovedMembersByClub = (clubId: string) => {
		return members.filter((member) => member.clubId === clubId);
	};

	// // Cập nhật CLB cho 1 hoặc nhiều thành viên
	// const changeMemberClub = (memberIds: string[], newClubId: string) => {
	// 	const updatedMembers = members.map((member) =>
	// 		memberIds.includes(member.id) ? { ...member, clubId: newClubId } : member,
	// 	);
	// 	setMembers(updatedMembers);
	// 	localStorage.setItem('memberManagement', JSON.stringify(updatedMembers));
	// 	setSelectedMembers([]);
	// };

	//Model admin
	const [admin, setAdmin] = useState<[]>([]);
	const [currentAdmin, setCurrentAdmin] = useState<string>('');

	return {
		isEdit,
		setEdit,
		isModalVisible,
		setIsModalVisible,
		isDetail,
		setIsDetail,
		isLoading,
		setLoading,
		searchText,
		setSearchText,
		clubs,
		setClubs,
		currentClub,
		setCurrentClub,
		selectedClubId,
		setSelectedClubId,
		members,
		setMembers,
		filteredClubs,
		setFilteredClubs,

		admin,
		setAdmin,
		currentAdmin,
		setCurrentAdmin,
		selectedMembers,
		setSelectedMembers,
		selectedClubFilter,
		setSelectedClubFilter,
		sortBy,
		setSortBy,
		search,
		setSearch,

		// CAsc hafm
		fetchClub,
		applyFilters,
		fetchMembers,
		getApprovedMembersByClub,
		// changeMemberClub,
	};
};
export default useClubsModel;
