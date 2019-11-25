FROM node:10.17.0-alpine3.9

WORKDIR /home/app

COPY . /home/app

RUN ["npm","install","-g","serve"]

EXPOSE 3000

WORKDIR /home/app/todolist

CMD ["serve","-s","build","-l","3000"]