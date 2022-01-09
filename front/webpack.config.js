const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  name: 'Re-brand-v2',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Layouts': path.resolve(__dirname, 'src/Layouts'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
      '@Assets': path.resolve(__dirname, 'src/Assets'),
      '@Constants': path.resolve(__dirname, 'src/Constants'),
      '@Styles': path.resolve(__dirname, 'src/Styles'),
      '@Api': path.resolve(__dirname, 'src/Api'),
    },
  },
  entry: {
    app: './src/Client',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
          ],
          env: {
            development: {
              plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
            },
            production: {
              plugins: ['@emotion'],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true, // react router 새로고침 시 잃은 history 복구
    port: 3090,
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3095',
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = config;
