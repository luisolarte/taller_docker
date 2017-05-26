var js2xmlparser = require("js2xmlparser");
var moment = require('moment-timezone');

var response = {};

response.getObjectTime = () => {
    var time = {};
    var date = moment(moment().tz("America/Bogota").format());
    time.year = date.year();
    time.month = date.month() +1;
    time.day = date.date();
    time.hour = date.hour();
    time.minutes = date.minute();
    time.seconds = date.second();
    return time; 
}


response.functions = {
    "application/json": (resp) => { 
       var time = response.getObjectTime();
       resp.setHeader('Content-Type', 'application/json');
       resp.send(JSON.stringify(time));

     },
     
     "application/xml": (resp) => {
       var time = response.getObjectTime();
       resp.setHeader('Content-Type', 'application/xml');
       var ret = js2xmlparser.parse("time", time);
       resp.send(ret);
     },

     "text/plain": (resp) => {
       var time = response.getObjectTime();
       resp.setHeader('Content-Type', 'text/plain');
       resp.send(time);

     } 
}



module.exports = response;