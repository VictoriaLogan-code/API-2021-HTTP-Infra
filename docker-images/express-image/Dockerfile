# version de l'image de Node qu'on va utiliser
FROM node:16.13.2

# Pour pouvoir utiliser vim, on va donc faire ça au moment de la création de l'image
RUN apt-get update && \
	apt-get install -y vim

# copie le contenu de src de ce projet à l'emplacement /opt/app de notre image
COPY src /opt/app

# spécifie la commande à exécuter quand on lance un docker sur la base de cette image, va donc exécuter notre
# script index.js
CMD ["node", "/opt/app/index.js"]