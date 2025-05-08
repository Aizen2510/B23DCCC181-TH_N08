import { User } from '@/types/KeHoachDuLich/index';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const saveUser = (user: User) => {
	const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
	users.push(user);
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUser = (username: string, password: string): User | null => {
	const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
	return users.find((u) => u.username === username && u.password === password) || null;
};

export const setCurrentUser = (user: User) => {
	localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
	const data = localStorage.getItem(CURRENT_USER_KEY);
	return data ? JSON.parse(data) : null;
};

export const logout = () => {
	localStorage.removeItem(CURRENT_USER_KEY);
};
