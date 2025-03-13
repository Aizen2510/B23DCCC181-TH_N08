declare module Appointment {
	export interface Record {
		id?: number;
		date: string;
		time: string;
		employee: string;
		status?: 'CHỜ DUYỆT' | 'XÁC NHẬN' | 'HOÀN THÀNH' | 'HỦY';
	}
}