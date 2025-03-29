import { useState } from 'react';
import { getFormConfig } from '@/services/FormConfig';

export default () => {
    const [fields, setFields] = useState<FormConfig.Field[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedField, setSelectedField] = useState<FormConfig.Field | null>(null);

    const fetchFormConfig = async () => {
        const localData: any = JSON.parse(localStorage.getItem('formConfig') || '[]'); // Ensure default is an empty array
        if (!Array.isArray(localData)) {
            console.error('Invalid data format in localStorage. Expected an array.');
            setFields([]); // Reset to an empty array if data is invalid
            return;
        }
        if (!localData.length) {
            const res = await getFormConfig();
            if (Array.isArray(res)) {
                localStorage.setItem('formConfig', JSON.stringify(res));
                setFields(res);
            } else {
                console.error('Invalid response format from API. Expected an array.');
                setFields([]); // Reset to an empty array if API response is invalid
            }
            return;
        }
        setFields(localData);
    };

    return {
        fields,
        isVisible,
        setIsVisible, // Đảm bảo setIsVisible được trả về để sử dụng
        selectedField,
        setSelectedField,
        isEditing,
        setIsEditing,
        setFields,
        fetchFormConfig,
    };
};