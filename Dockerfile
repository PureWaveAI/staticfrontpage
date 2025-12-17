FROM nginx:1.27-alpine

# Install envsubst for templating PORT into nginx.conf at runtime
RUN apk add --no-cache gettext

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy static site assets
COPY app /var/www/html

EXPOSE 80

# Render PORT into nginx.conf (default to 80 locally) then start nginx
CMD ["sh", "-c", "PORT=${PORT:-80} envsubst '$PORT' </etc/nginx/nginx.conf >/tmp/nginx.conf && exec nginx -c /tmp/nginx.conf -g 'daemon off;'"]

