//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// API lấy danh sách sổ văn bằng
app.get('/so-van-bang', (req, res) => {
	const data = getFromLocalStorage('so_van_bang');
	res.json(data);
});

// API thêm sổ văn bằng mới
app.post('/so-van-bang', (req, res) => {
	let soVanBangs = getFromLocalStorage('so_van_bang');
	const { nam } = req.body;

	if (!nam) {
		return res.status(400).json({ message: 'Năm không được để trống' });
	}

	if (soVanBangs.some((s) => s.nam === nam)) {
		return res.status(400).json({ message: 'Sổ văn bằng năm này đã tồn tại' });
	}

	let newSoVanBang = { id: soVanBangs.length + 1, nam };
	soVanBangs.push(newSoVanBang);
	saveToLocalStorage('so_van_bang', soVanBangs);

	res.json(newSoVanBang);
});
