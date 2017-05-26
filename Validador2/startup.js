'use strict';

const express = require('express');
var responser = require('./responseGenerator');
// Constants
const PORT = 8086;

// App
const app = express();
app.get('/validacion/:val', (req, res) => {
			
  var val = req.param('val');
  var ref = val[0];
  var numRef = val.slice(1, val.length);
  var response = "agua|" + numRef;
  if(ref == "a"){
      var response = 'agua|' + numRef;
      
  }
  if(ref == "l"){
      var response = 'luz|' + numRef;
      
  }

  res.send(response);
});




app.listen(PORT);
console.log('Running on http://localhost:' + PORT);