// Lưu dữ liệu vào localStorage
export const saveToLocalStorage = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};

// Lấy dữ liệu từ localStorage
export const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : [];
};
// Tại sao không cần gọi mà vẫn dùng được hàm ??
