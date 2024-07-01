FROM node:20-alpine AS builder

# Env

ARG env

# Packages

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm ci

# App

COPY index.html tsconfig.json tsconfig.node.json vite.config.ts .prettierrc.json .eslintrc.cjs .eslintignore .env.${env} ./
COPY src ./src
COPY public ./public

ENV DOCKER_DEPLOY=true
ENV ALLOW_CONFIG_MUTATIONS=true
ENV NODE_ENV=${env}

RUN npm run build:${env}

# --------------------------

FROM nginx:1.27.0-alpine

WORKDIR /

# Nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

# Copy build

COPY --from=builder /server/dist /usr/share/nginx/html

# Run

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
