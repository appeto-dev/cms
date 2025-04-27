#!/bin/bash

set -e

echo "🌱 Starting Slim app setup..."

# Copy .env if not exists
if [ -f .env.example ] && [ ! -f .env ]; then
    echo "📄 Copying .env file..."
    cp .env.example .env
fi

# Install Composer dependencies if vendor folder is missing
if [ ! -d vendor ]; then
    echo "📦 Installing composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

echo "✅ Slim app is ready. Starting Apache..."

# Start Apache
exec apache2-foreground
