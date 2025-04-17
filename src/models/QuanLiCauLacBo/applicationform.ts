import { useState } from 'react';
import type { ApplicationForm, ApplicationHistory, ApplicationStatus } from '@/types/QuanLiCauLacBo/index';
import { message } from 'antd';
import { getApplicationForms, getApplicationHistory } from '@/services/QuanLiCauLacBo/applicationFormService';
const useApplicationFormModel = () => {
	//common model
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	const [searchText, setSearchText] = useState<string>('');

	//Model đơn đăng ký thành viên
	const [applicationForm, setApplicationForm] = useState<ApplicationForm[]>([]);
	const [currentApplicationForm, setCurrentApplicationForm] = useState<ApplicationForm | null>(null);
	const [filteredApplicationForm, setFilteredApplicationForm] = useState<ApplicationForm[]>([]);
	const [selectedApplicationForms, setSelectedApplicationForms] = useState<ApplicationForm[]>([]);
	const [history, setHistory] = useState<ApplicationHistory[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState('');
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [filters, setFilters] = useState<{
		status?: ApplicationStatus;
		clubId?: string;
	}>({});

	const applyFilteredApplications = (data: ApplicationForm[], search: string) => {
		let filtered = [...data];

		// Tìm kiếm theo tên
		if (search) {
			filtered = filtered.filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase()));
			filtered = filtered.filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase()));
			filtered = filtered.filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase()));
		}

		setFilteredApplicationForm(filtered);
	};

	const fetchApplications = async () => {
		setLoading(true);
		try {
			const data = await getApplicationForms();
			setApplicationForm(data);
			applyFilteredApplications(data, searchText);
		} catch (error) {
			message.error('Không thể tải danh sách đơn đăng ký');
		} finally {
			setLoading(false);
		}
	};

	const fetchHistory = async () => {
		setLoading(true);
		try {
			const data = await getApplicationHistory();
			setHistory(data);
		} catch (error) {
			message.error('Không thể tải danh sách lịch sử đơn đăng ký');
		} finally {
			setLoading(false);
		}
	};
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
		applicationForm,
		setApplicationForm,
		currentApplicationForm,
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
		selectedApplicationForms,
		setSelectedApplicationForms,
		filters,
		setFilters,

		// Hàm
		fetchApplications,
		fetchHistory,
		applyFilteredApplications,
	};
};
export default useApplicationFormModel;
