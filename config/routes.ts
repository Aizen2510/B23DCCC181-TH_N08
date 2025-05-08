// import component from '@/locales/en-US/component';
// import route from 'mock/route';
// import path from 'path';

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
		path: '/club-management',
		icon: 'TeamOutlined',
		name: 'Quản lý câu lạc bộ',
		routes: [
			{
				path: '/club-management/danh-sach-cau-lac-bo',
				name: 'Danh sách câu lạc bộ',
				component: './QuanLiCauLacBo/DanhSachCauLacBo/ClubList',
				icon: 'TeamOutlined',
			},
			{
				path: '/club-management/quan-li-don-dang-ky-thanh-vien',
				name: 'Đơn Đăng Ký',
				component: './QuanLiCauLacBo/QuanLiDonDangKiThanhVien',
				icon: 'FormOutlined',
			},
			{
				path: '/club-management/quan-li-thanh-vien',
				name: 'Thành viên câu lạc bộ',
				component: './QuanLiCauLacBo/QuanLiThanhVien/ClubMembers',
				icon: 'UsergroupAddOutlined',
			},
			{
				path: '/club-management/thong-ke-bao-cao',
				name: 'Thống kê báo  cáo',
				component: './QuanLiCauLacBo/ThongKeBaoCao/Report',
				icon: 'BarChartOutlined',
			},
		],
	},
	{
		path: '/du-lich',
		name: 'Lập kế hoạch du lịch',
		icon: 'DingtalkOutlined',
		routes: [
			{
				path: '/du-lich',
				redirect: '/du-lich/login', // Trang mặc định nếu chưa đăng nhập
			},
			{
				path: '/du-lich/login',
				component: './KeHoachDuLich/DangNhap/LoginRegister', // form đăng nhập
				hideInMenu: true,
			},
			{
				path: '/du-lich/user',
				name: 'Trang người dùng',
				component: './KeHoachDuLich/UserLayout', // Layout chung cho user
				routes: [
					{
						path: '/du-lich/user',
						redirect: '/du-lich/user/trang-chu',
					},
					{
						path: '/du-lich/user/trang-chu',
						name: 'Trang chủ',
						component: './KeHoachDuLich/TrangUser/TrangChu',
					},
					{
						path: '/du-lich/user/tao-lich-trinh',
						name: 'Tạo lịch trình',
						component: './KeHoachDuLich/TrangUser/LichTrinhDuLich',
					},
					{
						path: '/du-lich/user/quan-ly-ngan-sach',
						name: 'Quản lý ngân sách',
						component: './KeHoachDuLich/TrangUser/NganSach',
					},
					{
						path: '/du-lich/user/chi-tiet-diem-den',
						name: 'Chi tiết điểm đến',
						component: './KeHoachDuLich/TrangUser/ChiTietDiemDen',
					},
				],
			},
			{
				path: '/du-lich/admin',
				name: 'Trang quản trị',
				component: './KeHoachDuLich/TrangAdmin/AdminPage',
			},
		],
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
