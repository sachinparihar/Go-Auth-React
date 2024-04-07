# syntax=docker/dockerfile:1.4

# 1. Build React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN npm run build

# 2. Setup Nginx
FROM nginx:alpine

# Copy Nginx configuration
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]