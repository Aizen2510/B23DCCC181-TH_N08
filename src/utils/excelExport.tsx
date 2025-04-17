import * as XLSX from 'xlsx';
import type { Member, Club } from '@/types/QuanLiCauLacBo';

const exportMembersToExcel = (members: Member[], clubs: Club[], fileName: string) => {
	// Chuyển đổi dữ liệu thành định dạng phù hợp
	const memberWorksheet = XLSX.utils.json_to_sheet(members);
	const clubWorksheet = XLSX.utils.json_to_sheet(clubs);
	const workbook = XLSX.utils.book_new();

	// Thêm các worksheet vào workbook
	XLSX.utils.book_append_sheet(workbook, memberWorksheet, 'Members');
	XLSX.utils.book_append_sheet(workbook, clubWorksheet, 'Clubs');

	// Xuất file Excel
	XLSX.writeFile(workbook, fileName);
};

export default exportMembersToExcel;
