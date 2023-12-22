/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lib.fstack.com.vn",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
