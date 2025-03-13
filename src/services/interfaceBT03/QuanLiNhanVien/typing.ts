declare module StaffManagement {
	export interface Staff {
		id: string;
		name: string;
		email: string;
		phone: string;
		specialties: string[];
		maxAppointmentsPerDay: number;
		isActive: boolean;
	}
	export interface WorkingHours {
		dayOfWeek: number; // 0-6 (Sunday to Saturday)
		startTime: string; // "HH:mm" format
		endTime: string; // "HH:mm" format
	}
}