<?php
    require_once "TransformacionAPI.php";
    $transformacionAPI = new TransformacionAPI();
    if ($_GET['action'] == 'getTransformacion') {
    	$transformacionAPI->getTransformacion();	
    } else {
    	$retorno = array();
    	$retorno["error"] = "Funcion no encontrada";
    	echo json_encode($retorno);
    }
    