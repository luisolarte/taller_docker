var soap = require('soap');


soap.createClient("http://localhost:8080/w1-soap-svr/PagosService?wsdl", (err, client) =>{

    var func = client["Pagar"];
    func({"referenciaFactura": "123"}, (err, resp) => {
        console.log(resp);
    });

});




