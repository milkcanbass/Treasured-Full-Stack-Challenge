import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from '../../webpack.dev.config.js';

const cacheControl = require('express-cache-controller');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cacheControl({
    maxAge: 31557600, // 1=1sec
  }),
);

const HTML_FILE = path.join(__dirname, 'dist', 'index.html');
const compiler = webpack(devConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
  }),
);

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

const PORT = process.env.PORT || 5000;
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'service-worker.js'));
});
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
