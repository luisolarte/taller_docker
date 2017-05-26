'use strict';
var controllerBuilder = require('./controller.js');

const express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
// Constants
const PORT = 8085;
// App
const app = express();
app.use("/api/aes/mva/taller/orquestador", router);
router.use(bodyParser.json())
router.post("/",(req, res) =>{
    var controller = new controllerBuilder(req, res);
    controller.orquestarRequest();

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);