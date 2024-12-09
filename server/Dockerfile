ARG CODE_VERSION=latest

FROM node:${CODE_VERSION}

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
