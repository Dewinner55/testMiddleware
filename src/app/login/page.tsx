import React from 'react';
import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

// Динамический импорт клиентского компонента без SSR
const LoginClientComponent = dynamic(() => import('./LoginClientComponent'), {
    ssr: false,
});

const LoginPage = () => {
    return (
        <div>
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to login.
            </Typography>
            <LoginClientComponent/>
        </div>
    );
};

export default LoginPage;
