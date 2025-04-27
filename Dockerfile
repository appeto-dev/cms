# Dockerfile
FROM php:7.4-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libssl-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    curl \
    git \
    pkg-config \
    libcurl4-openssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip \
    && docker-php-ext-install pdo pdo_mysql opcache

# Enable Apache rewrite module
RUN a2enmod rewrite

# Fix Apache to use public as DocumentRoot and allow .htaccess
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf && \
    echo '<Directory /var/www/html/public>\nAllowOverride All\nRequire all granted\n</Directory>' >> /etc/apache2/apache2.conf

# Install the MongoDB extension using PECL (correct version for composer.lock)
RUN pecl install mongodb-1.13.0 \
    && docker-php-ext-enable mongodb

# Install IonCube Loader
RUN curl -o ioncube_loader_lin.tar.gz https://downloads.ioncube.com/loader_downloads/ioncube_loaders_lin_x86-64.tar.gz && \
    tar -xzf ioncube_loader_lin.tar.gz && \
    cp ioncube/ioncube_loader_lin_7.4.so /usr/local/lib/php/extensions/no-debug-non-zts-20190902/ && \
    echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20190902/ioncube_loader_lin_7.4.so" >> /usr/local/etc/php/conf.d/00-ioncube.ini && \
    rm -rf ioncube_loader_lin.tar.gz ioncube

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader && \
    echo "---- INSTALL COMPLETE ----" && \
    ls -al /var/www/html && \
    ls -al /var/www/html/vendor || echo "Vendor missing"

# Permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 80

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Set entrypoint
ENTRYPOINT ["entrypoint.sh"]
