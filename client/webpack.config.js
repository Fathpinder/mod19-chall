const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = {
	mode: 'development',
	entry: {
		main: './src/js/index.js',
		install: './src/js/install.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			title: 'Webpack Plugin',
		}),

		new WebpackPwaManifest({
			name: 'text-editor',
			short_name: 'texteditor',
			description: 'Edit text!',
			background_color: '#7eb4e2',
			theme_color: '#7eb4e2',
			start_url: './',
			publicPath: './',
			icons: [
				// {
				// 	src: path.resolve('src/images/icon-manifest.png'),
				// 	sizes: [96, 128, 192, 256, 384, 512],
				// 	destination: path.join('assets', 'icons'),
				// },
				// {
				// 	src: path.resolve('src/images/icon-manifest.png'),
				// 	size: '1024x1024',
				// 	destination: path.join('assets', 'icons'),
				// 	purpose: 'maskable',
				// },
			],
		}),
		// new InjectManifest({
		// 	swSrc: './src/sw.js',
		// 	swDest: 'service-worker.js',
		// }),
		new InjectManifest({
			swSrc: './sw.js',
			swDest: 'service-worker.js',
		}),
	],

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
