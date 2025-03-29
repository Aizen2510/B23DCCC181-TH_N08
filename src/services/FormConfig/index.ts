import axios from 'axios';

export const getFormConfig = async () => {
    const res = await axios.get('/api/form-config');
    if (Array.isArray(res.data)) {
        return res.data;
    } else {
        console.error('Invalid API response. Expected an array.');
        return [];
    }
};

export const saveFormConfig = async (data: any) => {
    const res = await axios.post('/api/form-config', data);
    return res.data;
}; 

export const deleteField = async (fieldId: string) => {
    const res = await axios.delete(`/api/form-config/${fieldId}`);
    return res.data;
};

export const updateField = async (fieldId: string, data: any) => {
    const res = await axios.put(`/api/form-config/${fieldId}`, data);
    return res.data;
};