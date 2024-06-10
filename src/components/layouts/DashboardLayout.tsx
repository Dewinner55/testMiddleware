// src/app/dashboard/DashboardLayout.tsx
import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default DashboardLayout;
