import axios from 'axios';

export const getData = async () => {
	const res = await axios.get('https://your-api-url.com/data');
	return res;
};
