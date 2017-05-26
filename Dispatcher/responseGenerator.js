var soap = require('soap');
var request = require('request');
var response = {};
response.functions = {
    "SOAP": (params, resp) => { 
        soap.createClient(params.soapService.wsdl, (err, client) =>{
            var func = client[params.soapService.functionToCall];
            func(params.soapService.args, (err, result) => {
                  if(err){
                    //TODO
                    resp.send(err);  
                  }
                  resp.setHeader('Content-Type', 'application/json');
                  resp.send(JSON.stringify({response: result}));
            });
        });
     },
     "REST": (params, resp) => {
        request({
            method: params.restService.method,
            uri: params.restService.urlBase              
                }, (err, result, body) => {
                    if(err){
                        //TODO
                        console.log(err);
                        resp.send(err);
                    }
                    console.log(body);
                    try{
                        resp.setHeader('Content-Type', 'application/json');
                        resp.send({response: JSON.parse(body)});    

                    }
                    catch(err){
                           resp.send({response: {error:body}});       
                    }
                    
                    
           });
     }
}
module.exports = response;