declare module ThongTinVanBang {
	export interface Record {
		soVaoSo: number; // Số vào sổ văn bằng
		soHieuVanBang: string; // Số hiệu văn bằng
		maSinhVien: string; // Mã sinh viên (MSV)
		hoTen: string; // Họ tên sinh viên
		ngaySinh: Date; // Ngày sinh (mặc định)
		diemTrungBinh?: number; // Điểm trung bình
		xepHang?: string; // Xếp hạng
		heDaoTao?: string; // Hệ đào tạo (cử nhân, thạc sĩ, v.v.)
		noiSinh?: string; // Nơi sinh
		danToc?: string; // Dân tộc
		quyetDinhId: string; // Số quyết định tốt nghiệp
		[key: string]: string | number | Date | undefined; // Dùng để hỗ trợ các trường thông tin tùy chỉnh
	}
}
