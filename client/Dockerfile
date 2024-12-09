ARG CODE_VERSION=latest

FROM node:${CODE_VERSION} AS client

WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
