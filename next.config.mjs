/**
 * @type {import('next').NextConfig}
 */
import path from "path";

const nextConfig = {
    publicRuntimeConfig: {
        metadata: {
            title: "Create Next App",
            description: "Generated by create next app",
        },
    },
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    pageExtensions: ['[id].tsx', 'page.ts', 'page.jsx', 'page.js', 'tsx', 'ts', 'jsx', 'js'],
    images: {
        domains: ['https://tour-55.online']
    },
    async rewrites() {
        return [
            {
                source: '/online_store/v1/:path*',
                destination: 'https://tour-55.online/online_store/v1/:path*',
            },
        ];
    },
};

export default nextConfig;
