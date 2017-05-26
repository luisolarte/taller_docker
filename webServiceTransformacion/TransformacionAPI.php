<?php
	class TransformacionAPI {    
	    public function getTransformacion(){
	        header('Content-Type: application/JSON');
	        $respuesta = array();
	        if ($_GET['metodo'] != "" && $_GET['servicio'] != "" && $_GET['factura'] != "") {
	        	$metodo = $_GET['metodo'];
	        	$servicio = $_GET['servicio'];
	        	$factura = $_GET['factura'];
	        	$valor = ($_GET['valor'] ? $_GET['valor'] : 0);
	        	$respuesta = $this->transformacion($metodo, $servicio, $factura, $valor);
	        } else {
	        	$respuesta["error"] = "No se encontro transformacion";
	        }
	        echo json_encode($respuesta);
	    }    

	    public function transformacion($metodo, $servicio, $factura, $valor = 0)
	    {
	    	$retorno = array();
	    	switch ($servicio) {
	    		case 'luz':
	    		case 'telefono':
	    		case 'celular':
	    		case 'gas':
	    			$retorno['url'] = "/servicios/pagos/v1/payments/" . $factura;
	    			switch ($metodo) {
	    				case 'consultar':
	    					$retorno["method"] = "GET";
	    					$retorno["error"] = "";
	    					break;
	    				case 'pagar':
	    					$retorno["method"] = "POST";
	    					$retorno["error"] = "";
	    					break;
    					case 'compensar':
    						$retorno["method"] = "DELETE";
	    					$retorno["error"] = "";
	    					break;
	    				default:
	    					$retorno['url'] = "";
	    					$retorno["method"] = "";
	    					$retorno["error"] = "No se encontro transformacion";
	    					break;
	    			}
	    			$retorno["payload"] = "";
	    			break;
	    		case 'agua':
	    			$retorno["url"] = "";
	    			switch ($metodo) {
	    				case 'consultar':
	    					$retorno["payload"] = '{"referenciaFactura": ' . $factura . '}';
							$retorno["error"] = "";
							$retorno["method"] = "Cosultar";
	    					break;
	    				case 'pagar':
	    					$retorno["payload"] = '{"referenciaFactura":  {"referenciaFactura": ' . $factura . '}, "totalPagar": ' . $valor . '}';
							$retorno["error"] = "";
							$retorno["method"] = "Pagar";
	    					break;
    					case 'compensar':
	    					$retorno["payload"] = '{"referenciaFactura":  {"referenciaFactura": ' . $factura . '}, "totalPagar": ' . $valor . '}';
							$retorno["error"] = "";
							$retorno["method"] = "Compensar";
	    					break;
	    				default:
	    					$retorno["method"] = "";
	    					$retorno["payload"] = "";
	    					$retorno["error"] = "No se encontro transformacion";
	    					break;
	    			}
	    			break;
	    		default:
	    			$retorno["method"] = "";
	    			$retorno["payload"] = "";
	    			$retorno["url"] = "";
	    			$retorno["error"] = "No se encontro transformacion";
	    			break;
	    	}
	    	return $retorno;
	    }
	}