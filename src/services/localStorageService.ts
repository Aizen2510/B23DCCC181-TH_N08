class LocalStorageService {
	private getItem<T>(key: string): T[] {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : [];
	}

	private setItem<T>(key: string, data: T[]): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	// Staff methods
	getStaffList() {
		return this.getItem<StaffManagement.Staff>('staff');
	}

	setStaffList(staffList: StaffManagement.Staff[]) {
		this.setItem('staff', staffList);
	}

	// // Service methods
	// getServiceList() {
	// 	return this.getItem<Service>('services');
	// }

	// setServiceList(serviceList: Service[]) {
	// 	this.setItem('services', serviceList);
	// }

	// // Appointment methods
	// getAppointmentList() {
	// 	return this.getItem<Appointment>('appointments');
	// }

	// setAppointmentList(appointmentList: Appointment[]) {
	// 	this.setItem('appointments', appointmentList);
	// }
}

export const localStorageService = new LocalStorageService();
