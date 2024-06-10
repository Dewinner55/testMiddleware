// src/app/landing/page.tsx
import React from 'react';
import LandingLayout from '@/components/layouts/LandingLayout';
import Link from "next/link";

const LandingPage = async () => {

    return (
        <LandingLayout>
            <h1>Welcome to Our Landing Page</h1>
            <Link href="/login">
                <button>Go to Login</button>
            </Link>
        </LandingLayout>
    );
};

export default LandingPage;
