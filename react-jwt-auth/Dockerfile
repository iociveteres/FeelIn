FROM node:18-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build
CMD ["node", "src/index.js"]
EXPOSE 8081