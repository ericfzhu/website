/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.experiments = {
			asyncWebAssembly: true,
			layers: true,
		};
		// config.module.rules.push({
		// 	test: /\.md$/,
		// 	type: 'asset/source'
		// })

		return config;
	},
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
