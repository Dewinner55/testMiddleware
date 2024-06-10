// src/api/fetchClient.ts
const API_BASE_URL = 'http://localhost:3009/online_store/v1';

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    });

    // Извлекаем токены из кук и добавляем их в заголовок Cookie
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');

    if (accessToken || refreshToken) {
        headers.append('Cookie', `${accessToken ? `access_token=${accessToken}; ` : ''}${refreshToken ? `refresh_token=${refreshToken}` : ''}`);
    }

    const defaultOptions: RequestInit = {
        ...options,
        headers: headers,
        credentials: 'include', // Включаем куки для отправки
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
};
