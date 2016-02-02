var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './gl.js',
	output: {
		path: __dirname,
		filename: '[name].js',
		chunkFilename: '[id].js'
	},
	resolve: {
		modulesDirectories: [
			'node_modules',
			'./'
		]
	},
	module: {
		loaders: [{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
			}
			// { test: /\.css$/, loader: 'style-loader!css-loader' },
			// { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	]
};
