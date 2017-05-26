call cd W1-REST-Service
call mvn clean install
call cd ../W1-SOAP-Service
call  mvn clean install
call cd ../Dispatcher
call npm install
call tar cvf modules.tar node_modules
call cd ../Enrutador
call npm install
call tar cvf modules.tar node_modules
call cd ../Validador2
call npm install
call tar cvf modules.tar node_modules
call cd ../Orquestador
call npm install
call tar cvf modules.tar node_modules
call docker-compose up -d --build