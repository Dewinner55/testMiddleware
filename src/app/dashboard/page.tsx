// src/app/dashboard/page.tsx

import React from 'react';
import {fetchDashboardData} from '@/api/fetchData';
import dynamic from 'next/dynamic';
import { getToken } from 'next-auth/jwt';

// Динамический импорт клиентского компонента без SSR
const DashboardClientComponent = dynamic(() => import('./DashboardClientComponent'), {
    ssr: false,
});

const DashboardPage = async () => {
    const data = await fetchDashboardData(); // Загружаем данные на сервере

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>{data.message}</p>
            <DashboardClientComponent/>
        </div>
    );
};

export default DashboardPage;
