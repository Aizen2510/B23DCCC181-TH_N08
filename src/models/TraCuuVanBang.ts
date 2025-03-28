import { useState } from 'react';
import { getData } from '@/services/interfaces_04/ThongTin/getData';

export default () => {
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [data, setData] = useState<ThongTinVanBang.Record[]>([]);
    const [row, setRow] = useState<ThongTinVanBang.Record | null>(null);
    const getDataSearch = async (searchParams: any) => {
        const queryParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value)
        );

        if (Object.keys(queryParams).length < 2) {
            return [];
        }

        const res = await getData();
        return res?.data ?? [];
    };

    return {
        filteredData,
        setFilteredData,
        modalOpen,
        setModalOpen,
        isModalOpen,
        setIsModalOpen,
        selectedRecord,
        setSelectedRecord,
        getDataSearch,
    };
};
