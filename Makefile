#!/usr/bin/env

.PHONY: help build clean dev deploy install test

STATUS:="\x1b[96;01m\xE2\x80\xA2\x1b[0m"
ECHO = @echo "\033[0;34m$(1)\033[0m$(2)"

# HELP
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@echo
	@echo 📻 OEM:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo USAGE:
	@echo See README.md
	@echo

.DEFAULT_GOAL := help

# TASKS

build: ## Run build scripts
	@rm -rf ./dist
	@echo $(STATUS) Building docs...
	@npx esbuild \
		./docs/app.ts \
		--bundle \
		--minify-whitespace \
		--minify-syntax \
		--sourcemap \
		--target=es2015 \
		--outfile=./docs/bundle.min.js
	# @echo $(STATUS) Building lib dist...
	# @tsc
	# @echo $(STATUS) Building cdn dist...
	# @npx esbuild \
	# 	./src/index.ts \
	# 	--bundle \
	# 	--minify-whitespace \
	# 	--minify-syntax \
	# 	--sourcemap \
	# 	--target=es2015 \
	# 	--outfile=./dist/cdn/index.min.js

clean: ## Clean the project
	@echo $(STATUS) Cleaning...
	@rm -rf ./docs/bundle.min.js ./docs/bundle.min.js.map ./node_modules ./package-lock.json


dev: ## Run the project in development mode
	@echo $(STATUS) Running in development mode...
	@open ./docs/index.html
	@npx esbuild \
		./docs/app.ts \
		--bundle \
		--sourcemap \
		--target=es2015 \
		--watch \
		--outfile=./docs/bundle.min.js

deploy: ## Deploy the project
	@echo $(STATUS) Deploying...
	@git branch -D gh-pages
	@git checkout -b gh-pages
	@git merge main --no-commit --no-ff
	@make clean
	@npm i
	@make build
	@git add .
	@git commit -m 'deploy'
	@git push -f origin gh-pages
	@git checkout main

install: ## Install the project
	@echo $(STATUS) Installing...
	@npm install

test: ## Run tests
	@echo $(STATUS) Testing...
	@node ./cmd/test.js
