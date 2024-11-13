// prueba
FROM node:22-alpine3.19 AS node
WORKDIR /app
COPY ./IntelicaSecurityWeb .
RUN yarn add @angular/cli
RUN yarn install --force
RUN npm run build

FROM nginx:alpine
RUN apk update && apk add tzdata
ENV TZ=America/Lima
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/intelica-security-web /usr/share/nginx/html
