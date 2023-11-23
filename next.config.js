/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        }

        return config
    },
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
