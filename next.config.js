/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: true, // Permitir imágenes locales sin optimización
    },
    reactStrictMode: true,
    swcMinify: true,
    // Configuración para optimizar el uso de memoria
    webpack: (config, { dev, isServer }) => {
        // Optimizaciones para reducir el uso de memoria
        config.optimization = {
            ...config.optimization,
            minimize: true,
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        };

        // Reducir el tamaño del bundle
        if (!dev && !isServer) {
            config.optimization.minimizer.push(
                new (require('terser-webpack-plugin'))({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                })
            );
        }

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/images',
                        outputPath: 'static/images',
                    },
                },
            ],
        });

        return config;
    },
    // Reducir el número de watchers
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
    // Reducir el tamaño del bundle
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },
}

module.exports = nextConfig 