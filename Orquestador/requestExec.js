
var request = require("request");

module.exports = class RequestExec {

    constructor(){

    }

    execRequest(params, callback){
        request({
            method: params.method,
            uri: params.url

                }, 
                (err, resp, body) => {
                   callback(err, body); 
                });           
    }    
     execRequestPost(params, callback){

        var options = {url: params.url, 
                       json: params.body,
                       method: "POST" }
        request(options, 
                (err, resp, body) => {
                   callback(err, body); 
                });           
    }    
}