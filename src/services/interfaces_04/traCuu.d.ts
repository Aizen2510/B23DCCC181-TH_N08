declare module TraCuu {
	export interface Record {
		soHieuVanBang?: string; // Số hiệu văn bằng (tùy chọn)
		soVaoSo?: number; // Số vào sổ (tùy chọn)
		maSinhVien?: string; // Mã sinh viên (tùy chọn)
		hoTen?: string; // Họ tên (tùy chọn)
		ngaySinh?: Date; // Ngày sinh (tùy chọn)
	}
}
