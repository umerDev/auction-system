FROM node:18-alpine AS auction
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm run", "start"]
