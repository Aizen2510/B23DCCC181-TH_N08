import moment from 'moment';
export namespace VanBang {
	export interface DegreeBook {
		id?: string;
		year: number;
		currentSequenceNumber: number; // số văn bằng trong sổ
	}

	export interface Certificate {
		id?: string;
		graduationBookId: string; // id văn bằng
		sequenceNumber: number; // số thứ tự sổ văn bằng
		decisionNumber: string; // số quyết định
		studentId: string;
		fullName: string;
		dateOfBirth: string;
		graduationDecisionId: string; // id quyết định
		additionalFields?: { key: string; value: any }[]; // Trường bổ sung
	}
}

// Định nghĩa kiểu dữ liệu cho Quyết Định Tốt Nghiệp

export namespace QuyetDinh {
	export interface GraduationDecision {
		id?: string;
		decisionNumber: string; // số quyết định
		issuedDate: moment.Moment; // ngày ban hành (ISO format YYYY-MM-DD)
		summary: string; // trích yếu
		graduationBookId: string; // số văn bằng liên quan
		totalLookups: number; // tổng số tra cứu
	}
}

export namespace BieuMau {
	export interface CertificateTemplateField {
		id?: string;
		name: string;
		dataType: 'String' | 'Number' | 'Date';
		inputControl: string; // Loại điều khiển nhập liệu
	}
}

export namespace TraCuu {
	export interface SearchParams {
		keyword?: string;
		studentId?: string;
		fullName?: string;
		certificateNumber?: string;
		decisionNumber?: string;
		graduationYear?: number;
	}

	export interface SearchResult extends VanBang.Certificate {
		decisionNumber: string;
		issuedDate: string;
		graduationYear: number;
	}
}
