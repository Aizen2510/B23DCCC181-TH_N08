// RatingLogic.ts
import { useEffect, useState } from 'react';

const desc = ['Rất Tệ', 'Tệ', 'Bình Thường', 'Tốt', 'Tuyệt Vời'];

export const useRating = (employeeId: string) => {
    const [value, setValue] = useState(0); // Giá trị đánh giá
    const [open, setOpen] = useState(false); // Điều khiển mở/đóng modal
    const [averageRating, setAverageRating] = useState(0); // Đánh giá trung bình
    const [reviews, setReviews] = useState<any[]>([]); // Danh sách đánh giá của nhân viên
    const [response, setResponse] = useState(''); // Phản hồi của nhân viên

    // Lấy giá trị đánh giá và phản hồi từ localStorage khi render lần đầu
    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const employeeReviews = savedReviews.filter((review: any) => review.employeeId === employeeId);
        setReviews(employeeReviews);

        const totalRating = employeeReviews.reduce((acc: number, review: any) => acc + review.rating, 0);
        const avgRating = employeeReviews.length > 0 ? totalRating / employeeReviews.length : 0;
        setAverageRating(avgRating);

        const savedResponse = savedReviews.find((review: any) => review.employeeId === employeeId)?.response || '';
        setResponse(savedResponse);
    }, [employeeId]);

    // Cập nhật đánh giá và lưu vào localStorage
    const onChange = (newValue: number) => {
        setValue(newValue);
        const newReview = { employeeId, rating: newValue, response: '' };
        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        savedReviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));
        
        // Tính lại trung bình sau khi thêm đánh giá mới
        const totalRating = savedReviews.reduce((acc: number, review: any) => acc + review.rating, 0);
        const avgRating = savedReviews.length > 0 ? totalRating / savedReviews.length : 0;
        setAverageRating(avgRating);
    };

    // Nhân viên phản hồi đánh giá
    const onRespond = (newResponse: string) => {
        setResponse(newResponse);
        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const reviewIndex = savedReviews.findIndex((review: any) => review.employeeId === employeeId);
        if (reviewIndex >= 0) {
        savedReviews[reviewIndex].response = newResponse;
        localStorage.setItem('reviews', JSON.stringify(savedReviews));
        }
    };

    // Mở Modal
    const showModal = () => {
        setOpen(true);
    };

    // Đóng Modal
    const handleCancel = () => {
        setOpen(false);
    };

    return {
        value,
        open,
        averageRating,
        reviews,
        response,
        showModal,
        handleCancel,
        onChange,
        onRespond,
        desc,
    };
};
