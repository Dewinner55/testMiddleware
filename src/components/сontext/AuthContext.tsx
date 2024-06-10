"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                    },
                });
                const data = await response.json();
                setIsAuthenticated(data.authenticated);
            } catch (error) {
                console.error('Failed to check authentication status:', error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();

        // Установка интервала для обновления токенов
        const interval = setInterval(async () => {
            try {
                const response = await fetch('/api/refresh', {
                    method: 'POST',
                    credentials: 'include',
                });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data.message);
                } else {
                    console.error('Failed to refresh token');
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        }, 15 * 60 * 1000); // Обновление каждые 15 минут

        return () => clearInterval(interval);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
                router.push('/dashboard');
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
