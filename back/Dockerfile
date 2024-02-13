FROM node:20-alpine

# Env

ARG env

# Timezone

RUN apk update
RUN apk add --update tzdata && \
                     cp /usr/share/zoneinfo/UTC /etc/localtime && \
                     echo "UTC" > /etc/timezone

# Apk

RUN apk add --update --no-cache --virtual runtime-deps \
                                          nano \
                                          readline \
                                          bash \
                                          htop

# Nginx

RUN apk add --update --no-cache nginx \
                                nginx-mod-http-lua && \
                                mkdir -p /run/nginx

# Packages

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm ci

# Nginx Config

COPY ./nginx.conf /etc/nginx/http.d/default.conf

RUN nginx -t

# App

COPY tsconfig.json tsconfig.build.json tsconfig.eslint.json .prettierrc .eslintrc.js .eslintignore ./
COPY src ./src

RUN npm run build

# Build info

ENV DOCKER_DEPLOY true
ENV ALLOW_CONFIG_MUTATIONS true
ENV NODE_ENV ${env}

RUN touch build_info.txt
RUN echo "env: ${env}" >> build_info.txt

# Run

EXPOSE 80

CMD nginx; npm run start:build
