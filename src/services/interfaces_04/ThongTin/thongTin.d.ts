declare module ThongTinVanBang {
	export interface Record {
		soVaoSo: number; 
		soHieuVanBang: string; 
		maSinhVien: string;
		hoTen: string; 
		ngaySinh: Date; 
		diemTrungBinh?: number;
		xepHang?: string; 
		heDaoTao?: string; 
		noiSinh: string; 
		danToc: string; 
		quyetDinhId: string; 
		[key: string]: string | number | Date | undefined;
	}
}
