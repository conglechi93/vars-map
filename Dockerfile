FROM node:16-alpine
WORKDIR /vars-cms
COPY package*.json ./
COPY . .
RUN npm install --force
EXPOSE 3000
CMD ["npm","run","start"]
