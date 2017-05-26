<?php
    require_once "LoginAPI.php";    
    $loginAPI = new LoginAPI();
    if ($_GET['action'] == "login") {
    	$loginAPI->ingresar();	
    } else {
    	$retorno = array();
    	$retorno["error"] = "Funcion no encontrada";
    	echo json_encode($retorno);
    }
    