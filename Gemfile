source "https://rubygems.org"

# Ruby 3.4.6 compatible Jekyll setup
gem "jekyll", "~> 4.3.4"

# Required for Ruby 3.4+ compatibility - these were removed from standard library
gem "csv"
gem "base64"
gem "logger"

# GitHub Actions deployment compatible gems
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap", "~> 1.4"

# Modern pagination (jekyll-paginate-v2 for advanced features)
# Note: This requires GitHub Actions deployment, not compatible with standard GitHub Pages
gem "jekyll-paginate-v2", "~> 3.0"

# SEO and performance
gem "jekyll-seo-tag", "~> 2.8"

# Sass processing
gem "jekyll-sass-converter", "~> 3.0"

# Development dependencies
group :development, :test do
  gem "html-proofer", "~> 5.0"
end

# Windows-specific gems
platforms :windows do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
# Note: wdm has compatibility issues with Ruby 3.3+, commenting out
#gem "wdm", "~> 0.1.1", :platforms => [:windows]
gem 'wdm', '>= 0.1.0' if Gem.win_platform?

# Lock http_parser.rb gem to 0.6.x on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
