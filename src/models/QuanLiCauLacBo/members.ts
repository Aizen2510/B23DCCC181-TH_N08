import { useState } from 'react';
import type {
	Club,
	Member,
	ApplicationForm,
	ApplicationHistory,
	ApplicationStatus,
} from '@/types/QuanLiCauLacBo/index';
import { getMembersByClubId } from '@/services/QuanLiCauLacBo/memberService';
import { useModel } from 'umi';
import { message } from 'antd';
const useMemberModel = () => {
	const { selectedClubId } = useModel('QuanLiCauLacBo.clubs');
	//common model
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	const [searchText, setSearchText] = useState<string>('');

	//Model members
	const [members, setMembers] = useState<Member[]>([]);
	const [selectedMembers, setSelectedMembers] = useState<Member | null>(null); // Thành viên được chọn
	const [selectedClubFilter, setSelectedClubFilter] = useState<string>(''); // Lọc theo CLB
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isChangeClubModalVisible, setIsChangeClubModalVisible] = useState<boolean>(false);

	const fetchMembers = async () => {
		setLoading(true);
		try {
			const data = await getMembersByClubId(selectedClubId);
			setMembers(data);
		} catch (error) {
			message.error('Không thể tải danh sách thành viên');
		} finally {
			setLoading(false);
		}
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
		members,
		setMembers,
		admin,
		setAdmin,
		currentAdmin,
		setCurrentAdmin,
		selectedMembers,
		setSelectedMembers,
		selectedClubFilter,
		setSelectedClubFilter,
		selectedRowKeys,
		setSelectedRowKeys,
		isChangeClubModalVisible,
		setIsChangeClubModalVisible,

		// CAsc hafm

		fetchMembers,
		getApprovedMembersByClub,
		// changeMemberClub,
	};
};
export default useMemberModel;
