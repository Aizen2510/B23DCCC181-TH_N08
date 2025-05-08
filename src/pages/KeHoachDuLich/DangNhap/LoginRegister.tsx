import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role, User } from '../types';
import { findUser, saveUser, setCurrentUser } from '../utils/auth';

const LoginRegister: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<Role>('user');
	const navigate = useNavigate();

	const handleRegister = () => {
		const newUser: User = { username, password, role };
		saveUser(newUser);
		alert('Đăng ký thành công!');
	};

	const handleLogin = () => {
		const user = findUser(username, password);
		if (user) {
			setCurrentUser(user);
			if (user.role === 'admin') navigate('/admin');
			else navigate('/user');
		} else {
			alert('Sai thông tin đăng nhập');
		}
	};

	return (
		<div>
			<h2>Đăng ký / Đăng nhập</h2>
			<input placeholder='Tên đăng nhập' value={username} onChange={(e) => setUsername(e.target.value)} />
			<input type='password' placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
			<select value={role} onChange={(e) => setRole(e.target.value as Role)}>
				<option value='user'>User</option>
				<option value='admin'>Admin</option>
			</select>
			<br />
			<button onClick={handleRegister}>Đăng ký</button>
			<button onClick={handleLogin}>Đăng nhập</button>
		</div>
	);
};

export default LoginRegister;
