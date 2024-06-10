// src/app/LandingLayout.tsx
import React from 'react';

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default LandingLayout;
