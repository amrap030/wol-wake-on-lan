# app name should be overridden.
# example: make build APP_NAME=<APP_NAME>

APP_NAME = typescript-express
APP_NAME := $(APP_NAME)

.PHONY: build
# Build the container image
build:
	docker build -t ${APP_NAME}\
		-f Dockerfile .

# Clean the container image
clean:
	docker rmi -f ${APP_NAME}

# Run the container image
run:
	docker run -d -it -p 3000:3000 ${APP_NAME}

all: build
