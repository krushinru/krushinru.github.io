# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-personal"
  spec.version       = "0.1.0"
  spec.authors       = ["Your Name"]
  spec.email         = ["your.email@example.com"]

  spec.summary       = "Минималистичная темная тема для персонального сайта"
  spec.homepage      = "https://github.com/yourusername/jekyll-theme-personal"
  spec.license       = "MIT"

  spec.files         = Dir["assets/**/*", "_layouts/**/*", "_includes/**/*", "_sass/**/*", "README.md", "LICENSE.txt", "_config.yml"]

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
end
