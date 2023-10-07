FROM node:lts-alpine

ENV NODE_ENV=development

EXPOSE 4000

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm" ,"start"]