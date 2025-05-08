export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	role: 'user' | 'admin';
	createdAt: string; // ISO date string
}
// 🏝️ 2. Destination – điểm đến

export interface Destination {
	id: number;
	name: string;
	description?: string;
	location?: string;
	imageUrl?: string;
	category: 'biển' | 'núi' | 'thành phố';
	rating: number; // 0 - 5
	visitDurationMinutes?: number;
	costEating?: number;
	costTransport?: number;
	costAccommodation?: number;
	createdAt: string;
}
// 📅 3. Itinerary – lịch trình du lịch

export interface Itinerary {
	id: number;
	userId: number;
	name?: string;
	totalBudget?: number;
	startDate?: string; // YYYY-MM-DD
	endDate?: string;
	createdAt: string;
}
// 🗓️ 4. ItineraryDay – ngày trong lịch trình

export interface ItineraryDay {
	id: number;
	itineraryId: number;
	dayNumber: number; // Ngày thứ mấy
	note?: string;
}
//  – điểm đến trong ngày

export interface ItineraryDestination {
	id: number;
	itineraryDayId: number;
	destinationId: number;
	sortOrder?: number;
	estimatedTimeMinutes?: number;
	note?: string;

	// Optional relation
	destinationDetails?: Destination;
}
//  khoản chi

export interface BudgetItem {
	id: number;
	itineraryId: number;
	category: 'ăn uống' | 'di chuyển' | 'lưu trú' | 'khác';
	amount: number;
	note?: string;
}
//  thống kê tương tác

export interface StatLog {
	id: number;
	userId?: number;
	itineraryId?: number;
	destinationId?: number;
	action: 'create' | 'view' | 'delete';
	createdAt: string;
}
// kiểu mở rộng để hiển thị lịch trình đầy đủ

export interface ItineraryFullView {
	itinerary: Itinerary;
	days: {
		day: ItineraryDay;
		destinations: ItineraryDestination[];
	}[];
	budgetItems: BudgetItem[];
}
