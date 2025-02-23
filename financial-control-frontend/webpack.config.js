const path = require('path');

module.exports = {
  entry: './src/index.js', // Atualizar o caminho para o novo arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development', // Definir o modo de desenvolvimento
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Adicionar suporte para arquivos JS e JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Adicionar presets do Babel para JS e React
          },
        },
      },
      {
        test: /\.css$/, // Adicionar suporte para arquivos CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Adicionar extensões JS e JSX
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
};
