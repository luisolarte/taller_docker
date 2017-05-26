FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN tar -xvf /usr/src/app/modules.tar 


EXPOSE 8087

CMD [ "npm", "start" ]