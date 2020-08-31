const express = require('express')
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfigFunction = require('../webpack.config.js');
const app = express();
const port = process.env.PORT || 4001;

const webpackConfig = webpackConfigFunction(process.env);
const compiler = webpack(webpackConfig);

if(process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true
  }));
}

// Set Static Folder
app.use(express.static(path.join(__dirname, '../dist'), {index: false}));
 
app.get('*', function (req, res) {
  if(req.subdomains.length == 1) {
    res.cookie('space_name', req.subdomains[0]);
  } else {
    res.cookie('space_name', '');
  }
  return res.sendFile(path.join(__dirname,'../dist/index.html'));
});

app.listen(port, () => {
  console.log('Listening on ' + port );
  console.log('For subdomain testing go to lvh.me:' + port);
});