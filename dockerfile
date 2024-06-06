FROM node:21-alpine3.18 AS node
WORKDIR /app
COPY ./IntelicaSecurityWeb .
RUN npm install -g @angular/cli
RUN npm install -f
RUN npm run build
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/intelica-security-web /usr/share/nginx/html