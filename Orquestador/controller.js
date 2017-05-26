
var async = require("async");

var factoryServiceInstance = require("./ServiceRequest");
var nameService = require("./nameService");

var currentInstance;
module.exports = class Controller {

    constructor(request, response){
        this.request = request;
        this.response = response;
        currentInstance = this;
    }

    orquestarRequest(){
        async.waterfall(
            [async.apply(factoryServiceInstance.getInternalService().ejecutarAutenticacion, this.request.body.usuario, this.request.body.contrasena),
             async.apply(factoryServiceInstance.getInternalService().ejecutarValidacion, this.request.body.referencia),
             factoryServiceInstance.getExternalService().ejecutarConsulta,
             factoryServiceInstance.getExternalService().ejecutarPago,
             factoryServiceInstance.getExternalService().ejecutarCompensacion],    
             (err, result)=>{
                if(err){
                    currentInstance.response.send(JSON.stringify({error: err}));  
                }
                else{
                    currentInstance.response.send(JSON.stringify({response: result}));     
                }
            });
    }
   
} 
