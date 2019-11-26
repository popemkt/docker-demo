#Stage 1: Create build artifacts in buid environment
FROM node:10-alpine as buildenv

COPY . /home/app/todolist

WORKDIR /home/app/todolist

RUN npm install

RUN npm run build


#Stage 2: Collect build artifacts then deploy in deploy environment, build environment content is removed
FROM node:10-alpine

WORKDIR /home/app

COPY --from=buildenv /home/app/todolist/build /home/app

RUN npm install -g serve

EXPOSE 3000

WORKDIR /home/app

CMD ["serve","-s",".","-l","3000"]