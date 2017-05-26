'use strict';

const express = require('express');
var format = require('string-format');
var dataResponse = require('./fileRepository');
// Constants
const PORT = 8087;

// App
const app = express();
app.get('/Enrutar/:val', (req, res) => {			
  var val = req.param('val');
  var response = format("{}|{}", dataResponse[val].url, dataResponse[val].tipo); 
  res.send(response);
});




app.listen(PORT);
console.log('Running on http://localhost:' + PORT);