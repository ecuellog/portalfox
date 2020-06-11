const express = require('express')
const path = require('path');
const app = express()
const port = 4001;

// Set Static Folder
app.use(express.static(path.join(__dirname, '../dist'), {index: false}));

function addUrlParamSpace(req, res, next) {
  res.cookie('space_name', req.params.spacename);
  next();
}

app.get('/space/:spacename/**', addUrlParamSpace);
app.get('/space/:spacename', addUrlParamSpace);
 
app.get('*', function (req, res) {
  if(req.subdomains.length == 1) {
    res.cookie('space_name', req.subdomains[0]);
  }
  res.sendFile(path.join(__dirname,'../dist/index.html'));
});

console.log('Listening on ' + port);
app.listen(port);