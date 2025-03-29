import component from '@/locales/en-US/component';
import route from 'mock/route';
import path from 'path';

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/QuanLiNhanVien',
		name: 'Quản lý nhân viên ',
		component: './QuanLiNhanVien/StaffManagement',
		icon: 'BarcodeOutlined',
	},
	{
		path: '/appointment',
		name: 'Lịch Hẹn',
		component: './Appointment',
		icon: 'CalendarOutlined',
	},
	{
		path: '/DanhGia',
		name: 'Đánh Giá',
		component: './DanhGia',
		icon: 'PicRightOutlined',
	},
	{
		path: '/ThongKe',
		name: 'Thông Kê',
		icon: 'BarChartOutlined',
		routes: [
			{
				path: '/DoanhThu',
				name: 'Doanh Thu',
				component: './thongKe/DoanhThu.tsx',
			},
			{
				path: '/LichHen',
				name: 'Lịch Hẹn',
				component: './thongKe/LichHen.tsx',
			},
		],
	},
	{
		path: '/form-config',
		name: 'Cấu hình biểu mẫu',
		component: './FormConfig',
		icon: 'SettingOutlined',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
