import { useState } from 'react';
import type { Club, Member, ApplicationForm, ApplicationHistory } from '@/types/QuanLiCauLacBo/index';
import { set } from 'lodash';
import { getClubs } from '@/services/QuanLiCauLacBo/clubManagementService';
export default () => {
	//common model
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	const [searchText, setSearchText] = useState<string>('');
	// Modal clubs
	const [clubs, setClubs] = useState<Club[]>([]);
	const [currentClub, setCurrentClub] = useState<Club | null>(null);
	const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
	const [selectedClubId, setSelectedClubId] = useState<string>('');

	// Áp dụng bộ lọc cho câu lạc bộ
	const applyFilters = (data: Club[], search: string) => {
		let filtered = [...data];
		if (search) {
			filtered = filtered.filter((club) => {
				return (
					club.name.toLowerCase().includes(search.toLowerCase()) ||
					club.leader.toLowerCase().includes(search.toLowerCase())
				);
			});
		}
		setFilteredClubs(filtered);
	};

	const fetchClub = () => {
		setLoading(true);
		const data = getClubs();
		setClubs(data);
		applyFilters(data, searchText);
		setLoading(false);
	};

	//Model đơn đăng ký thành viên
	const [applicationForm, setApplicationForm] = useState<ApplicationForm[]>([]);
	const [currentapplicationForm, setCurrentApplicationForm] = useState<ApplicationForm | null>(null);
	const [filteredApplicationForm, setFilteredApplicationForm] = useState<ApplicationForm[]>([]);
	const [history, setHistory] = useState<ApplicationHistory[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState('');
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

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

	// Cập nhật CLB cho 1 hoặc nhiều thành viên
	const changeMemberClub = (memberIds: string[], newClubId: string) => {
		const updatedMembers = members.map((member) =>
			memberIds.includes(member.id) ? { ...member, clubId: newClubId } : member,
		);
		setMembers(updatedMembers);
		localStorage.setItem('memberManagement', JSON.stringify(updatedMembers));
		setSelectedMembers([]);
	};

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
		applicationForm,
		setApplicationForm,
		currentapplicationForm,
		setCurrentApplicationForm,
		filteredApplicationForm,
		setFilteredApplicationForm,
		history,
		setHistory,
		submitted,
		setSubmitted,
		isRejectModalOpen,
		setIsRejectModalOpen,
		rejectReason,
		setRejectReason,
		isHistoryModalOpen,
		setIsHistoryModalOpen,
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
		changeMemberClub,
	};
};
