all: build run

build:
	docker-compose build

run:
	docker-compose up

tag:
	docker tag tokens_backend ptrvldz/tokens-backend
	docker tag tokens_frontend ptrvldz/tokens-frontend
