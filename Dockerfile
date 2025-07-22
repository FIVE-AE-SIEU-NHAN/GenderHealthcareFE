# Step 1: Build app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Vite build ra thư mục 'dist', không phải 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config cho React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]