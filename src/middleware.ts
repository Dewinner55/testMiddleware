import { NextRequest, NextResponse } from 'next/server';
import {NextApiRequest, NextApiResponse} from "next/types";

import {axiosClassic} from "@/api/interseptor";

export async function middleware(request: NextRequest, req: NextApiRequest) {
    // Получение куки аутентификации из запроса
    const accessToken = request.cookies.get('access_token');
    const refreshToken  = request.cookies.get('refresh_token') || "";

    // Проверка наличия refreshToken
    if (!refreshToken) {
        // Перенаправление на страницу входа, если refreshToken отсутствует
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Проверка наличия accessToken
    if (!accessToken) {
        // Если нет accessToken, но есть refreshToken, обновляем токены
        const cookie = req.headers.cookie || '';
        const referer = req.headers.referer || 'http://localhost:3009/defaultReferer';

        try {
            const axiosConfig = {
                headers: {
                    'Referer': referer,
                    'Cookie': cookie,
                },
                withCredentials: true
            };
            const response = await axiosClassic.post('/auth/refresh-token', {}, axiosConfig);
            console.log(response.data)
            if (response.status === 200 && response.headers['set-cookie']) {
                return response.headers['set-cookie'];
            } else {
                throw new Error('Failed to refresh token');
            }
        } catch (error) {
            console.log(error)
            console.log('МЫ ПОПАЛИ В ЭТОТ КАТЧ')
            return NextResponse.redirect(new URL('/error', request.url));
        }
    }

    // Если пользователь аутентифицирован, продолжить обработку запроса
    return NextResponse.next();
}

// Конфигурация middleware для применения к определенным маршрутам
export const config = {
    matcher: ['/dashboard/:path*'],
};
