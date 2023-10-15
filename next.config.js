/** @type {import('next').NextConfig} */
const nextConfig = {
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
