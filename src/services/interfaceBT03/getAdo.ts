import axios from 'axios';

export const getAppointments = async () => {
	const res = await axios.get('https://your-api-url.com/appointments');
	return res;
};