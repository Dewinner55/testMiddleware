"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Typography } from "@material-tailwind/react";

const LoginClientComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Очистка предыдущей ошибки
        setError(null);

        // Выполнение запроса на вход
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({email, password})
            });

            if (!response.ok) {
                // Обработка ошибок аутентификации
                if (response.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('An error occurred. Please try again later.');
                }
                return;
            }

            // Перенаправление на защищенную страницу
            router.push('/dashboard');
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                    type={showPassword ? 'text' : 'password'}
                    size="lg"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <Button onClick={handleClickShowPassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    }
                />
            </div>
            <Button className="mt-6" fullWidth type="submit">
                Login
            </Button>
            {error && (
                <Typography color="red" className="mt-4 text-center font-normal">
                    {error}
                </Typography>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                    Sign Up
                </a>
            </Typography>
        </form>
    );
};

export default LoginClientComponent;
