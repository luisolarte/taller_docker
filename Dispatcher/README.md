# Servicio ejemplo aplicacion usando docker

Este es un ejemplo de aplicacion implementada en docker

#Exposición de puertos

En caso que se quiera modificar el puerto por el que se va a publicar la aplicación, seria necesario editar el archivo Dockerfile en la propiedad declarada como EXPOSE, para el ejercicio se expuso el puerto 8080.

```sh
    EXPOSE 8080
```

#Ejecución 

De cara a una ejecución se puede ejecutar el archivo startup.bat, o en su defecto ejecutar los siguientes comandos:
```sh
    //Este comando permite construir la imagen docker
    docker build luisolarte/servicio_docker_ejemplo .
    //Este comando permite la ejecucion de la imagen creada en el equipo
    docker run -p 8080:8080 -d luisolarte/servicio_docker_ejemplo
```

La anterior ejecución aplica en caso que se haya cambiado el puerto ya que el archivo .bat viene con el puerto 8080 por defecto, en caso que se vaya a cambiar se debe reemplazar el parametro -p del comando docker run, por los puertos que se vayan a usar, dejando claro que el primer puerto es puerto origen, es decir el que se va a usar en la maquina donde se usa docker, y el puerto final es el puerto de la imagen que se expuso en el archivo Dockerfile.

#Prueba de servicio

El servicio puede ser probado usando el siguiente link 
```sh
    http://localhost:8080/getHolaMundo
```