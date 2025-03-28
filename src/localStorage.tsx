// Lưu dữ liệu vào localStorage
const saveToLocalStorage = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};

// Lấy dữ liệu từ localStorage
const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : [];
};
// Tại sao không cần gọi mà vẫn dùng được hàm ??
