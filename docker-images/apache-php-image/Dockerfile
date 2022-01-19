FROM php:8.1-apache

# Pour pouvoir utiliser vim, on va donc faire ça au moment de la création de l'image
RUN apt-get update && \
	apt-get install -y vim

COPY content/ /var/www/html/