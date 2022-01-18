FROM php:7.2-apache

# Pour pouvoir utiliser vim, on va donc faire ça au moment de la création de l'image
RUN apt-get update && \
	apt-get install -y vim

# on écrase pas tout apache2, on rajoute simplement des choses dans le dossier conf de apache2
COPY conf/ /etc/apache2

# activation des modules nécessaires
RUN a2enmod proxy proxy_http

# activation des virtual host
RUN a2ensite 000-* 001-*
