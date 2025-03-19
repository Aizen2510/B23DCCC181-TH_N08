import React from 'react';
import Chart from '../../components/Chart/ColumnChart';
const DoanhThu = () => {
	return (
		<div>
			<Chart xAxis={['Jan', 'Feb', 'Mar']} yAxis={[[10, 20, 30]]} yLabel={['Revenue']} />
		</div>
	);
};

export default DoanhThu;
