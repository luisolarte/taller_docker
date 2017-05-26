var execRequestBuilder = require("./requestExec");
var nameService = require("./nameService");
var async = require("async");
var format = require('string-format');

class ServiceRequest{

     ejecutarRequest(parametros, callback){
        var requester = new execRequestBuilder();
        request.execRequest(parametros.url, parametros.method, parametros.body, 
                (err, result) =>{
                    callback(err, result);
                }
        );
    }
}


class ExternalServiceRequest extends ServiceRequest{

     ejecutarConsulta(servicio, referencia, callback){ 
        var internal = new InternalServiceRequest();
        async.waterfall([async.apply(internal.ejecutarRouter, servicio, referencia, 0),
                         async.apply(internal.ejecutarTransformador, "consultar", servicio),
                         internal.ejecutarDispatcher
                        ],
            (err, result) =>{
                if(err){
                      callback(err);  
                }
                else{
                    
                    callback(null, servicio, referencia, result.response.totalPagar);
                }

            });  
    }

    ejecutarPago(servicio, referencia, valorPago, callback){
        var internal = new InternalServiceRequest();
        async.waterfall([async.apply(internal.ejecutarRouter, servicio, referencia, valorPago),
                         async.apply(internal.ejecutarTransformador, "pagar", servicio),
                         internal.ejecutarDispatcher
                        ],
            (err, result) =>{
               if(err){
                      callback(err);  
                }
                else{
                    callback(null, servicio, referencia, valorPago);
                }

            });  

    }

    ejecutarCompensacion(servicio, referencia, valorPago, callback){
         var internal = new InternalServiceRequest();
         async.waterfall([async.apply(internal.ejecutarRouter, servicio, referencia, valorPago),
                         async.apply(internal.ejecutarTransformador, "compensar", servicio),
                         internal.ejecutarDispatcher
                        ],
            (err, result) =>{
                if(err){
                      callback(err);  
                }
                else{
                    callback(null, result.response);
                }   

            });     

    }

}


class InternalServiceRequest extends ServiceRequest{

    ejecutarAutenticacion(usuario, contrasena, callback){
       var execReq = new execRequestBuilder();
       var authParams = nameService["autenticacion"];
       authParams.url = format(authParams.plantilla, usuario, contrasena);
        console.log(authParams);
       execReq.execRequest(authParams, (err, result) =>{
           if(err){
                console.log(err);
                callback(err);
            }
            else{
                var res = JSON.parse(result);
                if(!res.permitido){
                    callback("Autenticacion fallida");
                }
                else{
                    callback(null);
                }                
            }
        });
    }

    ejecutarValidacion(referencia, callback){
         var execReq = new execRequestBuilder();
        var valParams = nameService["validacion"];
        valParams.url = format(valParams.plantilla, referencia);
        console.log(valParams);
         execReq.execRequest(valParams, (err, result) =>{
            if(err){
                console.log(err);
                callback(err);
            }
            else{
                 if(result != "error"){
                  var data = result.split("|");     
                  callback(null, data[0], data[1]);                     
                 }             
            }
        });

    }

    ejecutarRouter(nombreServicio, referencia, valorPago, callback){
        var execReq = new execRequestBuilder();
        var routerParams = nameService["router"];
        routerParams.url = format(routerParams.plantilla, nombreServicio);
        console.log(routerParams);
        execReq.execRequest(routerParams, (err, result) =>{
            if(err){
                console.log(err);
                callback(err);
            }
            else{
                  var data = result.split("|");     
                  var datosAnexos = {
                      url: data[0],
                      typeService: data[1],
                      referencia: referencia,
                      valorPago: valorPago
                  }
                  callback(null, datosAnexos);         
            }
        });

    }

    ejecutarTransformador(funcionServicio, nombreServicio, datosAnexos, callback){
         var execReq = new execRequestBuilder();
         var transParams = nameService["transformador"];
         transParams.url = format(transParams.plantilla, funcionServicio, nombreServicio, datosAnexos.referencia, datosAnexos.valorPago );
        console.log(transParams);
         execReq.execRequest(transParams, (err, result) =>{
              if(err){
                  console.log(err);
                  callback(err);
              }
              else{
                  result = JSON.parse(result);
                  if(result.error != ""){
                          callback(result.error);
                  }
                  else{
                     callback(null, datosAnexos, result)
                  }
                
              }

        });

    }

    ejecutarDispatcher(datosAnexos, transResponse, callback){
        var execReq = new execRequestBuilder();
        var dispatcherParams = nameService["dispatcher"];
        var body = dispatcherParams.body;
        body.typeService = "" + datosAnexos.typeService;
        if(datosAnexos.typeService == "SOAP"){
            body.soapService.wsdl = "" + datosAnexos.url;
            body.soapService.functionToCall = "" + transResponse.method;
            body.soapService.args = JSON.parse(transResponse.payload);
        } 
        if(datosAnexos.typeService == "REST"){
            body.restService.method = "" + transResponse.method;
            body.restService.urlBase = datosAnexos.url + transResponse.url;
        }
        dispatcherParams.body = body;
        console.log(dispatcherParams);
        execReq.execRequestPost(dispatcherParams,  (err, result) =>{
            if(err){
                console.log(err);
                callback(err)    
            }
            else{
                callback(null, result);
            }

        });

    }


}


module.exports = {
    getExternalService : () =>{
        return new ExternalServiceRequest();        
    },
    getInternalService : () =>{
        return new InternalServiceRequest();        
    }

}