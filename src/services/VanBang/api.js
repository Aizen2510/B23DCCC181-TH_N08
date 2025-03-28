const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// API lấy danh sách văn bằng
app.get('/van-bang', (req, res) => {
	const data = getFromLocalStorage('van_bang');
	res.json(data);
});

// API thêm văn bằng mới
app.post('/van-bang', (req, res) => {
	let vanBangs = getFromLocalStorage('van_bang');
	const { maSinhVien, hoTen, ngaySinh, quyetDinhId, soVanBangId } = req.body;

	if (!maSinhVien || !hoTen || !ngaySinh || !quyetDinhId || !soVanBangId) {
		return res.status(400).json({ message: 'Thiếu thông tin văn bằng' });
	}

	let maxSoVaoSo = vanBangs
		.filter((vb) => vb.soVanBangId === soVanBangId)
		.reduce((max, vb) => Math.max(max, vb.soVaoSo || 0), 0);

	let soVaoSo = maxSoVaoSo + 1;
	let soHieuVanBang = `VB${soVanBangId}-${soVaoSo}`;

	let newVanBang = {
		id: vanBangs.length + 1,
		soVaoSo,
		soHieuVanBang,
		maSinhVien,
		hoTen,
		ngaySinh,
		quyetDinhId,
		soVanBangId,
	};
	vanBangs.push(newVanBang);
	saveToLocalStorage('van_bang', vanBangs);

	res.json(newVanBang);
});
