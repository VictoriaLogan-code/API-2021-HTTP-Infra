FROM php:7.2-apache

# on écrase pas tout apache2, on rajoute simplement des choses dans le dossier conf de apache2
COPY conf/ /etc/apache2

# activation des modules nécessaires
RUN a2enmod proxy proxy_http

# activation des virtual host
RUN a2ensite 000-* 001-*
