call npm install
call tar cvf modules.tar node_modules
call docker build -t luisolarte/servicio_docker_ejemplo .
call docker run -p 8080:8080 -d luisolarte/servicio_docker_ejemplo