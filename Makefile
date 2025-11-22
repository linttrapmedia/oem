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

clean: ## Clean the project
	@echo $(STATUS) Cleaning...
	@rm -rf ./docs/bundle.min.js ./docs/bundle.min.js.map ./node_modules ./package-lock.json ./dist


dev: ## Run the project in development mode
	@echo $(STATUS) Running in development mode...
	@open http://localhost:3000
	@bun ./docs/dev.html --watch

deploy: ## Deploy the project to GitHub Pages/oem.js.org
	@echo $(STATUS) Deploying...
	@git branch -D gh-pages
	@git checkout -b gh-pages
	@git merge main --no-commit --no-ff
	@git push -f origin gh-pages
	@git checkout main

docs: ## Build docs
	@echo $(STATUS) Building docs...
	@bun build ./docs/app.ts \
		--sourcemap \
		--minify \
		--bundle \
		--format=iife \
		--outfile=./docs/app.js \
		--target=browser \

examples: ## Dev todo example
	@echo $(STATUS) Building examples...
	@bun ./examples/index.html --watch

install: ## Install the project
	@echo $(STATUS) Installing...
	@bun install

publish: ## Publish the project to npm
	@echo $(STATUS) Publish package...
	@npm publish --access public

test: ## Run tests
	@echo $(STATUS) Testing...
	@bun ./test/unit.html



