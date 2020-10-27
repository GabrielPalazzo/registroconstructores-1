FROM mhart/alpine-node:latest as development

WORKDIR /usr/src/app

COPY package.json ./

#RUN apk add --no-cache make gcc g++
#RUN npm install -g @nestjs/cli 
RUN NODE_ENV=development npm install 

COPY . .

CMD ["npm", "run", "start"]

#FROM mhart/alpine-node:latest as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#RUN npm build
#
#COPY /usr/src/app/dist ./dist
#
#CMD ["node", "dist/main"]
