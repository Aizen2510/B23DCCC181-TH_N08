export const getFromLocalStorage = (key: string) => {
	const rawData = localStorage.getItem(key);
	try {
		return rawData ? JSON.parse(rawData) : null; // Parse JSON nếu có dữ liệu
	} catch (error) {
		console.error('Error parsing data from localStorage:', error);
		return null; // Trả về null nếu parse thất bại
	}
};

export const saveToLocalStorage = (key: string, data: any) => {
	try {
		localStorage.setItem(key, JSON.stringify(data)); // Lưu dữ liệu dưới dạng chuỗi JSON
	} catch (error) {
		console.error('Error saving data to localStorage:', error);
		throw error;
	}
};
