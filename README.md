# Registro

El sistema de registro es el primero que será desplegado ya que se encargara de registra la 
ubicacion y el identificador del resto de componentes.


En pro de cubrir la función de descubrimiento de servicio se hizo la consulta en base a un archivo en donde están almacenados los servicios que están del inventarior.


{
   "autenticacion": {"plantilla":"http://taller_login_1:80/webServiceLogin/login/{}/{}",  "body": {}, "method": "GET" },
   "validacion": {"plantilla": "http://taller_validador_1:8086/validacion/{}",  "body": {}, "method": "GET" },
   "router": {"plantilla":"http://taller_router_1:8087/Enrutar/{}",  "body": {}, "method": "GET" },
   "transformador":{"plantilla": "http://taller_transformador_1:80/webServiceTransformacion/getTransformacion/{}/{}/{}/{}" , "body": {},  "method": "GET"},
   "dispatcher": {"plantilla": "http://taller_dispatcher_1:8081/api/aes/mva/taller/dispatcher", 
                  "body": {
                            "typeService": "SOAP",
                            "soapService": {
                                    "wsdl": "http://localhost:8080/w1-soap-svr/PagosService?wsdl",
                                    "functionToCall": "Cosultar",
                                    "args": {"referenciaFactura": 123, "totalPagar": 20000}
                            },
                            "restService":{
                                "method": "GET",
                                "urlBase": "http://localhost:8080/servicios/pagos/v1/payments/123",
                                "urlParts": [],
                                "postBodyArgs": {}
                            }
                    }, "method": "GET"
                 }
}


# Autenticador

Estara en un contenedor y expondrá un servicio que recibirá por parte del "Orquestador" las 
variables credecianles y reponderá hacia el mismo si estas son válidad o no

# Validador

Una vez discriminado por parte del autenticador y con una respuesta "true" en el "Orquestador"
ese siguiente proceso se encargará de verificar si la variables de entrada de sistema "Nímero de factura"
se refiere a un recibo de Agua o Luz

# Transformador

Sevicio encargado de generara los payload o las estructuras de datos que van a recibir los servicios.

# Router

Se encarga con base en el servicio cual el el servidor que lo va a atender.

Para los servicios de datos se usó la siguiente estructura de datos.

	luz|http://externalrest:9090/servicios/pagos/v1/payments/|rest
	gas|http://externalrest:9090/servicios/pagos/v1/payments/|rest
	telefono|http://externalrest:9090/servicios/pagos/v1/payments/|rest
	agua|http://externalsoap:7070/w1-soap-svr/PagosServiceService?wsdl|soap
	celular|http://externalrest:9090/servicios/pagos/v1/payments/|rest


# Dispacher

Componente encargado de realizar la comunicacion hacia los sistemas extermos, realizando las tranformaciones necesarias

CONTRATO

	 		   {
                            "typeService": "SOAP",
                            "soapService": {
                                    "wsdl": "http://localhost:8080/w1-soap-svr/PagosService?wsdl",
                                    "functionToCall": "Cosultar",
                                    "args": {"referenciaFactura": 123, "totalPagar": 20000}
                            },
                            "restService":{
                                "method": "GET",
                                "urlBase": "http://localhost:8080/servicios/pagos/v1/payments/123",
                                "urlParts": [],
                                "postBodyArgs": {}
                            }



# Orquestador

Componente de entrada de usauario u que dependiendo de proceso en el que se encuentre utiliza o consume
uno u otro servicio.

# WS Pago LUZ

Sistema externo que recibe la peticion desde el dispacher y realizará el correspondiente pago del servicio de la Luz

#WS pago agua

Sistema externo que recibe la peticion desde el dispacher y realizará el correspondiente pago del servicio del agua


