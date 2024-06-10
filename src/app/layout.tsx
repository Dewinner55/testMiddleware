import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
            <>{children}</>
        </body>
        </html>
    );
}
