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
		path: '/degree-book',
		name: 'Quản lý sổ văn bằng',
		// component: './QuanLiSoVanBang/degreeBookManagement',
		icon: 'BookOutlined',
		routes: [
			{
				path: '/degree-book/so-van-bang',
				name: 'Sổ Văn Bằng',
				component: './QuanLiSoVanBang/degreeBookManagement',
				icon: 'BookOutlined',
			},
			{
				path: '/degree-book/quyet-dinh-tot-nghiep',
				name: 'Quyết Định Tốt Nghiệp',
				component: './QuanLiQuyetDinhTotNghiep/graduationDecisionManagement',
				icon: 'FileDoneOutlined',
			},
			{
				path: '/degree-book/cau-hinh-bieu-mau',
				name: 'Cấu hình biểu mẫu',
				component: './CauHinhBieuMauPhuLuc/formConfig',
				icon: 'SettingOutlined',
			},
			{
				path: '/degree-book/thong-tin-van-bang',
				name: 'Thông Tin Văn Bằng',
				component: './ThongTinVanBang',
				icon: 'FileTextOutlined',
			},
			// {
			// 	path: '/degree-book/tra-cuu-van-bang',
			// 	name: 'Tra Cứu Văn Bằng',
			// 	component: './TraCuuVanBang',
			// 	icon: 'FullscreenOutlined',
			// },
		],
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
