
var response = require('./responseGenerator');
//var validator = require('./requestValidator');

var processor = {};


processor.dispatch = (req, res) => {
    //TODO validador
    console.log(req.body);
    var func = response.functions[req.body.typeService];
    func(req.body, res);
}


module.exports = processor;