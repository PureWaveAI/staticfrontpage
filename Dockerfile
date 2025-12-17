FROM nginx:1.27-alpine

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy static site assets
COPY app /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


