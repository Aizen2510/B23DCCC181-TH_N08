export namespace VanBang {
	export interface DegreeBook {
		id?: string;
		year: number;
		currentSequenceNumber: number;
	}

	export interface Certificate {
		id?: string;
		graduationBookId: string; // mã sổ văn bằng
		sequenceNumber: number; // số thứ tự sổ văn bằng
		certificateNumber: string; // mã văn bằng
		studentId: string;
		fullName: string;
		dateOfBirth: string;
		graduationDecisionId: string; // mã quyết định tốt nghiệp
		additionalFields?: Record<string, any>;
	}
}

// Định nghĩa kiểu dữ liệu cho Quyết Định Tốt Nghiệp

export namespace QuyetDinh {
	export interface GraduationDecision {
		id?: string;
		decisionNumber: string; // số quyết định
		issuedDate: string; // ngày ban hành (ISO format YYYY-MM-DD)
		summary: string; // trích yếu
		graduationBook: string; // số văn bằng liên quan
		totalLookups: number; // tổng số lượt xem
	}
}

export namespace BieuMau {
	export interface CertificateTemplateField {
		id?: string;
		name: string;
		dataType: 'String' | 'Number' | 'Date';
		inputControl: string;
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
