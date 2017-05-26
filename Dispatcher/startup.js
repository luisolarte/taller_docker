'use strict';
var controller = require('./controller.js');
const express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
// Constants
const PORT = 8081;
// App
const app = express();
app.use("/api/aes/mva/taller/dispatcher", router);
router.use(bodyParser.json())
router.post("/", controller.dispatch);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);