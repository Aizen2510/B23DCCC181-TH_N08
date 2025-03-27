import { useState } from 'react';
import { getData } from '../services/interfaces_04/ThongTin/getData';

export default () => {
    const [data, setData] = useState<ThongTinVanBang.Record[]>([]);
    const [modal1Open, setModal1Open] = useState(false);
    const [formConfig, setFormConfig] = useState<any[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [row, setRow] = useState<ThongTinVanBang.Record | null>(null);

    const getDataInFor = async () => {
        const storedData = JSON.parse(localStorage.getItem('ThongTinVanBang') || '[]');
        if (storedData.length) {
            setData(storedData);
        } else {
            const res = await getData();
            localStorage.setItem('ThongTinVanBang', JSON.stringify(res?.data ?? []));
            setData(res?.data ?? []);
        }
    };

    const getFormConfig = () => {
        const config = JSON.parse(localStorage.getItem('FormConfig') || '[]');
        setFormConfig(config);
    };

    const getNextSoVaoSo = () => {
        return data.length ? Math.max(...data.map((d) => d.soVaoSo)) + 1 : 1;
    };

    return {
        data,
        setData,
        modal1Open,
        setModal1Open,
        getDataInFor,
        getFormConfig,
        formConfig,
        getNextSoVaoSo,
        isEdit,
        setIsEdit,
        row,
        setRow,
    };
};
