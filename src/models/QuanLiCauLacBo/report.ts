import { useState, useEffect } from 'react';
import type {
	Club,
	Member,
	ApplicationForm,
	ApplicationHistory,
	ApplicationStatus,
	ClubStatistic,
} from '@/types/QuanLiCauLacBo/index';
import { getMembersByClubId } from '@/services/QuanLiCauLacBo/memberService';
import { useModel } from 'umi';
import { message } from 'antd';
import * as XLSX from 'xlsx';

const useReportModel = () => {
	const { fetchApplications, applicationForm, setApplicationForm } = useModel('QuanLiCauLacBo.applicationform');
	//common state
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	// state report
	const [clubStats, setClubStats] = useState<ClubStatistic[]>([]);

	const groupByClub = (applications: ApplicationForm[]): ClubStatistic[] => {
		const result: Record<string, ClubStatistic> = {};

		applications.forEach((app) => {
			if (!result[app.clubId]) {
				result[app.clubId] = {
					clubId: app.clubId,
					clubName: app.clubId,
					pending: 0,
					approved: 0,
					rejected: 0,
				};
			}

			if (app.status === 'Pending') result[app.clubId].pending++;
			if (app.status === 'Approved') result[app.clubId].approved++;
			if (app.status === 'Rejected') result[app.clubId].rejected++;
		});

		return Object.values(result);
	};

	useEffect(() => {
		fetchApplications();
		setClubStats(groupByClub(applicationForm));
	}, []);

	const exportApprovedToExcel = () => {
		const approvedList = applicationForm.filter((item) => item.status === 'Approved');
		const grouped: Record<string, ApplicationForm[]> = {};

		approvedList.forEach((item) => {
			if (!grouped[item.clubId]) grouped[item.clubId] = [];
			grouped[item.clubId].push(item);
		});

		const workbook = XLSX.utils.book_new();

		Object.entries(grouped).forEach(([clubId, members]) => {
			const sheetData = members.map((m) => ({
				'Họ tên': m.fullName,
				Email: m.email,
				'Số điện thoại': m.phone,
				'Giới tính': m.gender,
				'Địa chỉ': m.address,
				'Sở trường': m.strengths,
				'Lý do đăng ký': m.reason,
				'Ghi chú': m.note || '',
			}));

			const worksheet = XLSX.utils.json_to_sheet(sheetData);
			XLSX.utils.book_append_sheet(workbook, worksheet, clubId);
		});

		XLSX.writeFile(workbook, 'DanhSachThanhVienDaDuyet.xlsx');
	};

	return {
		isLoading,
		setLoading,
		isModalVisible,
		setIsModalVisible,
		clubStats,
		setClubStats,
		exportApprovedToExcel,
	};
};

export default useReportModel;
