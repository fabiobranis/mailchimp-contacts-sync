all: clean build-app build-docker
clean:
	rm -rf ./build
build-app:
	npm run build
build-docker:	
	docker build . -t fabio-nunes/mailchimp-contact-integration


