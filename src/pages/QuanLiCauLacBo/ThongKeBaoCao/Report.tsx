import React from 'react';
import { Button, Statistic, Row, Col } from 'antd';
import { Column } from '@ant-design/plots';
import { useModel } from 'umi';
const Report = () => {
	const { isLoading, setLoading, isModalVisible, setIsModalVisible, clubStats, setClubStats, exportApprovedToExcel } =
		useModel('QuanLiCauLacBo.report');
	const { applicationForm } = useModel('QuanLiCauLacBo.applicationform');
	const totalStats = {
		clubs: clubStats.length,
		pending: applicationForm.filter((item) => item.status === 'Pending').length,
		approved: applicationForm.filter((item) => item.status === 'Approved').length,
		rejected: applicationForm.filter((item) => item.status === 'Rejected').length,
	};

	const chartData = clubStats.flatMap((club) => [
		{ clubName: club.clubName, status: 'Pending', count: club.pending },
		{ clubName: club.clubName, status: 'Approved', count: club.approved },
		{ clubName: club.clubName, status: 'Rejected', count: club.rejected },
	]);

	return (
		<div>
			<Row gutter={16}>
				<Col>
					<Statistic title='Số CLB' value={totalStats.clubs} />
				</Col>
				<Col>
					<Statistic title='Pending' value={totalStats.pending} />
				</Col>
				<Col>
					<Statistic title='Approved' value={totalStats.approved} />
				</Col>
				<Col>
					<Statistic title='Rejected' value={totalStats.rejected} />
				</Col>
			</Row>

			<Column
				applicationForm={chartData}
				isGroup
				xField='clubName'
				yField='count'
				seriesField='status'
				columnWidthRatio={0.6}
				height={400}
			/>

			<Button type='primary' onClick={exportApprovedToExcel} style={{ marginTop: 20 }}>
				Xuất danh sách thành viên đã duyệt
			</Button>
		</div>
	);
};

export default Report;
