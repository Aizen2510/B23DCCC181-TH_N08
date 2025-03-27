declare module bieuMau {
	export interface Record {
		ten: string;
		loaiDuLieu: 'String' | 'Number' | 'Date';
		giaTriMau?: string;
	}
}
