"use client";

import React from "react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import LandingLayout from "@/components/layouts/LandingLayout";
import MuiTheme from "@/components/ui/MuiTheme";
import CustomizedSwitches from "@/components/ui/CustomizedSwitches";
import { ThemeProvider } from "next-themes";
import {useAuth} from "@/components/сontext/AuthContext";

const ClientAppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MuiTheme>
                <CustomizedSwitches />
                {isAuthenticated ? <DashboardLayout>{children}</DashboardLayout> : <LandingLayout>{children}</LandingLayout>}
            </MuiTheme>
        </ThemeProvider>
    );
};

export default ClientAppLayout;
