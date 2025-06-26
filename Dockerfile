FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_PB_URL
ARG VITE_WEBSOCKET

ENV VITE_PB_URL=$VITE_PB_URL
ENV VITE_WEBSOCKET=$VITE_WEBSOCKET

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]