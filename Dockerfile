FROM wordpress:php8.3-apache
RUN apt-get update && apt-get install -y --no-install-recommends libsqlite3-dev unzip curl && docker-php-ext-install pdo_sqlite && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://downloads.wordpress.org/plugin/sqlite-database-integration.latest-stable.zip -o /tmp/sqlite.zip && unzip -q /tmp/sqlite.zip -d /usr/src/wordpress/wp-content/plugins/ && cp /usr/src/wordpress/wp-content/plugins/sqlite-database-integration/db.copy /usr/src/wordpress/wp-content/db.php && rm /tmp/sqlite.zip
COPY wp-config.php /usr/src/wordpress/wp-config.php
RUN chown -R www-data:www-data /usr/src/wordpress/wp-content
EXPOSE 80
