declare module DanhGia {
	export interface Record {
		id: number;
		appointmentId: Appointment.Record['id'];
		notable: 'Rất Tệ' | 'Tệ' | 'Bình Thường' | 'Tốt' | 'Tuyệt Vời';
		notableEmp: number;
		reportNotable: string;
		response?: string;
	}
}
