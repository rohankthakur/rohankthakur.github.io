#!/bin/bash

echo "========================================="
echo "      Jekyll Portfolio Setup"
echo "========================================="
echo ""
echo "This script will set up your Jekyll portfolio website."
echo "Make sure you have Ruby 3.4+ installed."
echo ""

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby not found! Please install Ruby 3.4+ first."
    echo "Visit: https://www.ruby-lang.org/en/documentation/installation/"
    exit 1
fi

echo "Ruby version:"
ruby --version
echo ""

# Check if Bundler is installed
if ! command -v bundle &> /dev/null; then
    echo "Installing Bundler..."
    gem install bundler
fi

echo "Installing dependencies..."
if bundle install; then
    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo ""
    echo "❌ Bundle install failed!"
    echo ""
    echo "Possible solutions:"
    echo "1. Try: bundle config set --local path vendor/bundle"
    echo "2. Make sure you have development tools installed"
    echo "3. Check Ruby version compatibility"
    echo ""
    exit 1
fi

echo ""
echo "Starting Jekyll server..."
echo "Your site will be available at: http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --watch --livereload

echo ""
echo "Server stopped. Thanks for using Jekyll Portfolio Template!"
