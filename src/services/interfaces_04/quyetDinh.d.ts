declare module QuyetDinhTogNghiep {
	export interface Record {
		soQuyetDinh: string; // Số quyết định
		ngayBanHanh: Date; // Ngày ban hành quyết định
		trichYeu: string; // Trích yếu về quyết định
		soVanBangId: number; // Số văn bằng thuộc quyết định này
	}
}
