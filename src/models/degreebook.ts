import { useState } from 'react';
import { VanBang, QuyetDinh, BieuMau, TraCuu } from '@/types/index';
import { saveToLocalStorage } from '@/localStorage';
import { getFromLocalStorage } from '@/localStorage';
import { set, values } from 'lodash';
export default () => {
	// common model
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isView, setIsView] = useState<boolean>(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetail, setIsDetail] = useState(false);
	// degreeBook model
	// Bảng dữ liệu : degreeBooks
	const [degreeBooks, setDegreeBooks] = useState<VanBang.DegreeBook[]>([]);
	const [selectedBook, setSelectedBook] = useState<VanBang.DegreeBook | null>(null);

	const getDataDegreeBook = () => {
		const dataLocal: any = getFromLocalStorage('degreeBooks');
		// if (!dataLocal?.length) {
		// 	const res = await getSoVanBang();
		// 	localStorage.setItem('so_van_bang', JSON.stringify(res?.data ?? []));
		// 	setData(res?.data ?? []);
		// 	return;
		// }
		setDegreeBooks(dataLocal);
	};

	const addDegreeBook = (data: any) => {
		try {
			const updateBook = [...degreeBooks, data];
			saveToLocalStorage('degreeBooks', updateBook);
			setDegreeBooks(updateBook);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};

	const updateDegreeBook = (data: any) => {
		try {
			const updateBook = degreeBooks.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev));
			saveToLocalStorage('degreeBooks', updateBook);
			setDegreeBooks(updateBook);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};

	// graduationDecision model
	// Bảng dữ liệu : graduationDecison
	const [decisions, setDecisions] = useState<QuyetDinh.GraduationDecision[]>([]);
	const [currentDecision, setCurrentDecision] = useState<QuyetDinh.GraduationDecision | null>(null);

	const getDateGraduationDecision = () => {
		const dataLocal: any = getFromLocalStorage('graduationDecison');
		// if (!dataLocal?.length) {
		// 	const res = getQuyetDinhTotNghiep();
		// 	localStorage.setItem('graduationDecison', JSON.stringify(res?.data ?? []));
		// 	setDecisions(res?.data ?? []);
		// 	return;
		// }
		setDecisions(dataLocal);
	};

	const addGraduationDecision = (data: any) => {
		try {
			const updateDecision = [...decisions, data];
			saveToLocalStorage('graduationDecison', updateDecision);
			setDecisions(updateDecision);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};

	const updateGraduationDecision = (data: any) => {
		try {
			const updateDecision = decisions.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev));
			saveToLocalStorage('graduationDecison', updateDecision);
			setDecisions(updateDecision);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};
	// Cấu Hình Biểu Mẫu
	// Bảng dữ liệu :certificateTemplateField
	const [fields, setFields] = useState<BieuMau.CertificateTemplateField[]>([]);
	const [selectedField, setSelectedField] = useState<BieuMau.CertificateTemplateField | null>(null);

	const getCertificateTemplateField = () => {
		const dataLocal: any = getFromLocalStorage('certificateTemplateField');
		// Kiểm tra nếu dữ liệu không phải là mảng, đặt giá trị mặc định là mảng rỗng
		const parsedData = Array.isArray(dataLocal) ? dataLocal : [];
		setFields(parsedData);
	};

	const addField = (data: any) => {
		try {
			const updatedFields = [...fields, data];
			saveToLocalStorage('certificateTemplateField', updatedFields); // Lưu toàn bộ mảng
			setFields(updatedFields);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};

	const updateField = (data: any) => {
		try {
			const updatedFields = fields.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev));
			saveToLocalStorage('certificateTemplateField', updatedFields); // Lưu toàn bộ mảng
			setFields(updatedFields);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};
	// Cấu hình thông tin văn bằng
	// Bảng dữ liệu : certificate
	const [certificate, setCertificate] = useState<VanBang.Certificate[]>([]);
	const [selectedCertificate, setSelectedCertificate] = useState<VanBang.Certificate | null>(null);
	const [additionalFields, setAdditionalFields] = useState<Record<string, any>>({});
	const [selectedBookId, setSelectedBookId] = useState<string>('');
	const [nextSequenceNumber, setNextSequenceNumber] = useState<number>(1);
	const getCertificate = () => {
		const dataLocal: any = getFromLocalStorage('certificate');
		setCertificate(dataLocal);
	};
	const addCertificate = (data: VanBang.Certificate) => {
		try {
			const book = degreeBooks.find((b) => b.id === data.graduationBookId);
			if (book) {
				book.currentSequenceNumber = book.currentSequenceNumber || 0;
				data.sequenceNumber = book.currentSequenceNumber + 1;
				book.currentSequenceNumber += 1;
				updateDegreeBook(book);
			}
			const currentCertificates = certificate || [];
			const updatedCertificates = [...currentCertificates, data];
			saveToLocalStorage('certificate', updatedCertificates);
			setCertificate(updatedCertificates);
			setNextSequenceNumber(data.sequenceNumber);
		} catch (error) {
			console.error('Error saving certificate:', error);
			throw error;
		}
	};
	const updateCertificate = (data: any) => {
		try {
			const updateData = certificate.map((prev) => (prev.id === data.id ? { ...prev, ...data } : prev));
			saveToLocalStorage('certificate', updateData);
			setCertificate(updateData);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
			throw error;
		}
	};

	//Model tra cuu
	const [searchResults, setSearchResults] = useState<TraCuu.SearchResult[]>([]);
	const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const searchCertificates = (values: TraCuu.SearchParams) => {
		try {
			// const results = searchCertificates(values);
			// setSearchResults(results);
			// setSearchPerformed(true);
		} catch (error) {
			console.error('Error searching certificates:', error);
			throw error;
		}
	};
	return {
		isEdit,
		setEdit,
		isView,
		setIsView,
		isModalVisible,
		setIsModalVisible,
		isDetail,
		setIsDetail,
		degreeBooks,
		setDegreeBooks,
		selectedBook,
		setSelectedBook,
		decisions,
		setDecisions,
		currentDecision,
		setCurrentDecision,
		fields,
		setFields,
		selectedField,
		setSelectedField,
		certificate,
		setCertificate,
		selectedCertificate,
		setSelectedCertificate,
		additionalFields,
		setAdditionalFields,
		selectedBookId,
		setSelectedBookId,
		nextSequenceNumber,
		setNextSequenceNumber,
		searchResults,
		setSearchResults,
		searchPerformed,
		setSearchPerformed,
		isLoading,
		setIsLoading,

		// CRUD
		getDataDegreeBook,
		addDegreeBook,
		updateDegreeBook,
		getDateGraduationDecision,
		addGraduationDecision,
		updateGraduationDecision,
		getCertificateTemplateField,
		addField,
		updateField,
		getCertificate,
		addCertificate,
		updateCertificate,
		searchCertificates,
	};
};
