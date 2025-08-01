#!/usr/bin/env

.PHONY: help build clean cdn dev dist docs deploy examples install publish test

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

cdn: ## Build for CDN
	@echo $(STATUS) Building cdn dist...
	@npx esbuild \
		./src/index.ts \
		--bundle \
		--minify-whitespace \
		--minify-syntax \
		--sourcemap \
		--format=iife \
		--target=es2015 \
		--global-name=oem \
		--outfile=./dist/oem.min.js

clean: ## Clean the project
	@echo $(STATUS) Cleaning...
	@rm -rf ./docs/bundle.min.js ./docs/bundle.min.js.map ./node_modules ./package-lock.json ./dist


dev: ## Run the project in development mode
	@echo $(STATUS) Running in development mode...
	@open ./docs/index.html
	@npx esbuild \
		./docs/app.ts \
		--bundle \
		--minify \
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
	@make docs
	@git add .
	@git commit -m 'deploy'
	@git push -f origin gh-pages
	@git checkout main

dist: ## Build for distribution
	@echo $(STATUS) Building dist...
	@bun build ./src/index.ts \
		--outdir=./dist \
		--entry-naming oem.esm.js
		--target browser
	# @npx esbuild \
	# 	./src/index.ts \
	# 	--bundle \
	# 	--minify-whitespace \
	# 	--minify-syntax \
	# 	--sourcemap \
	# 	--format=esm \
	# 	--target=es2015 \
	# 	--global-name=oem \
	# 	--outfile=./dist/oem.min.js
	@open http://localhost:3000
	@bun run ./dist/index.html

docs: ## Build docs
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

dev_todo: ## Dev todo example
	@echo $(STATUS) Building examples...
	@open ./examples/todo/index.html
	@npx esbuild --bundle ./examples/todo/src/index.ts --outdir=./examples/todo --watch  --sourcemap --minify

install: ## Install the project
	@echo $(STATUS) Installing...
	@npm install

publish: ## Publish the project to npm
	@echo $(STATUS) Publish package...
	@npm publish --access public

test: ## Run tests
	@echo $(STATUS) Testing...
	@node ./cmd/test.js FILTER=$(FILTER)



