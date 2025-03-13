declare module StaffManagement {
    export interface Staff {
      id: string; // Mã định danh của nhân viên
      name: string; // Tên nhân viên
      email: string; // Email của nhân viên
      phone: string; // Số điện thoại của nhân viên
      specialties: string[]; // Chuyên môn của nhân viên (ví dụ: "Lập trình viên", "Thiết kế đồ họa", ...)
      maxAppointmentsPerDay: number; // Số lượng cuộc hẹn tối đa mà nhân viên có thể nhận trong một ngày
      isActive: boolean; // Trạng thái hoạt động của nhân viên (true - đang làm việc, false - đã nghỉ việc)
      schedule?: { // Lịch làm việc của nhân viên (optional)
        dayOfWeek: string; // Ngày trong tuần (ví dụ: "Thứ 2", "Thứ 3", ...)
        startTime: string; // Giờ bắt đầu làm việc (ví dụ: "9:00 AM")
        endTime: string; // Giờ kết thúc làm việc (ví dụ: "5:00 PM")
      }[]; // Nếu có thể, nhân viên có thể có nhiều lịch làm việc cho từng ngày trong tuần
    }
  }
  