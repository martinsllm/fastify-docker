FROM node:alpine

WORKDIR /app-backend

COPY package* .

RUN yarn

COPY . . 

ENTRYPOINT [ "yarn" ]
CMD [ "dev" ]