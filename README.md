# Labo HTTP Infra
- AUTEUR.E.S : Logan Victoria & Jeanneret Hugo -

## Prélude et informations générales

* Le repo de ce projet se trouve à :
**https://github.com/VictoriaLogan-code/API-2021-HTTP-Infra.git**

* Pour l'étape n°4 de ce laboratoire, le fichier **improvInitialSituation.js** que nous avons du écrire nous a fait réaliser que nous avions enlevé du code html du template de base qui manquait apparemment à d'autres scripts javascript pour s'exécuter correctement. Nous avons donc repris le template de base et changé ce que l'on souhaitait changé, sans effacer de section de la structure de base de ce template ; le but de ce laboratoire n'étant pas sur le code lui-même mais plutôt sur l'infrastructure HTTP.

* Pour l'étape n°5 de ce laboratoire, on a besoin du Dockerfile de l'image php:apache qu'on a utilisée. De ce fait et pour éviter d'aller retoucher des fichiers dans d'autres branches en cours de route, il est conseillé d'utiliser directement une version dont le Dockerfile est trouvable sur le github des images officielles php : **https://github.com/docker-library/php**. Nous avons décidé d'utiliser la version la plus récente : **php:8.1-apache**
Aussi, n'ayant eu cette information qu'à l'étape 5 et ceci n'ayant pas d'incidence sur les autres branches, nous avons laissé la version 7.3 (que nous avions initialement décidé d'utiliser mais dont le Dockerfile n'est plus disponible sur github) sur ces dernières.

* Pour tuer (stopper) tous les containers actifs : 
**docker kill $(docker ps -q)**
* Pour supprimer tous les containers : 
**docker rm $(docker ps -a -q)**


## Etape 1: Server HTTP statique avec apache http

### Webcasts

* [Labo HTTP (1): Serveur apache httpd "dockerisé" servant du contenu statique](https://www.youtube.com/watch?v=XFO4OmcfI3U)

### Notre projet 

*Sous la branche **fb-apache-static** de notre repo*

* Dans le dossier **docker-images** de notre projet (là où on va stocker les dossiers nécessaire à la construction et au lancement des containers qu'on va utiliser dans ce labo), on y crée donc le dossier **apache-php-image** dans lequel on a créé un fichier **Dockerfile** ainsi qu'un dossier **content**

* Dans le dossier **content**, on a mis les fichiers souces d'un template d'interface web téléchargés depuis **https://startbootstrap.com/theme/grayscale**, dont nous avons modifié le fichier **index.html** pour l'adapter à notre projet et afficher quelques textes différents que ceux du template.

* Dans le **Dockerfile**, nous avons mis **FROM php:7.3-apache** qui indique l'image sur laquelle va se construire le docker, puis **COPY content/ /var/www/html/** pour copier le contenu de notre dossier **content** au chemin **/var/www/html/** de notre container

* Une fois le docker lancé, on trouve ses fichiers de configuration apache en ouvrant un terminal du docker avec **docker exec -it apache_static /bin/bash**, puis en se rendant au chemin **/etc/apache2**

### Démo : 

* construire l'image docker : 
**docker build -t api/apache_php .**

* exécuter l'image docker   : 
**docker run -d --name apache_static -p 9090:80 api/apache_php**

* pour accéder au contenu depuis le browser une fois le container lancé, taper **localhost:9090** dans la barre de recherche ; la page interprétant le code du fichier source **/content/index.html/** apparaît


## Etape 2: Server HTTP dynamique avec express.js

### Webcasts

* [Labo HTTP (2a): Application node "dockerisée"](https://www.youtube.com/watch?v=fSIrZ0Mmpis)
* [Labo HTTP (2b): Application express "dockerisée"](https://www.youtube.com/watch?v=o4qHbf_vMu0)

### Notre projet

*Sous la branche **fb-express-dynamic** de notre repo*

* Dans le dossier **docker-images** de notre projet, on y crée donc le dossier **express-image** dans lequel on a créé un fichier **Dockerfile** ainsi qu'un dossier **src**

* Dans le dossier **src**, nous avons créé les fichiers de package json en démarrant une nouvelle app node en effectuant la commande **npm init**, nom application : **students**, version : **0.1.0**, description : **Labo 5 API** et auteurs : **LOGAN Victoria et JEANNERET Hugo**. On a ensuite ajouté le module **chance** dans le package.json en faisant **npm install --save chance** depuis le fichier **src**. Enfin, dans le fichier **/src/index.js**, nous avons écrit le code JSON utilisant notre module chance et permettant de générer aléatoirement entre 1 et 3 situations initiales pour une scène d'improvisation théâtrale. 
Pour changer de l'exemple donné en cours, on laisse au.à la joueur.euse (d'improvisation théâtrale) le choix de son nom, prénom et genre, mais on lui imposera l'année, le pays, le métier qu'iel pratique, la lettre de début de la pièce dans laquelle iel se trouve, ainsi que la durée de l'improvisation (entre 0 et 20 minutes). Ce sera ce script qui sera retourner lors de la requête d'un client sur le container express créé ici.

* Dans le **Dockerfile**, nous avons mis **FROM node:16.13.2** qui indique l'image sur laquelle va se construire le container, **COPY src /opt/app**, pour copier le contenu de notre dossier **src** au chemin **/opt/app** de notre docker et **CMD ["node", "/opt/app/index.js"]**, qui spécifie la commande à exécuter lorsqu'on lance un docker sur la base de cette image ; ce dernier va ainsi exécuter le script **index.js** de notre dossier **src**, dont on a copié le contenu au chemin **/opt/app** de notre docker comme dit ci-dessus

### Démo : 

* Construction de l'image :
**docker build -t api/express_improv .**

* Lancement du docker : 
**docker run -p 9090:3000 api/express_improv**

* Accès au contenu depuis un browser : 
**localhost:3000**


## Etape 3: Reverse proxy avec apache (configuration statique)

### Webcasts

* [Labo HTTP (3a): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=WHFlWdcvZtk)
* [Labo HTTP (3b): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=fkPwHyQUiVs)
* [Labo HTTP (3c): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=UmiYS_ObJxY)

### Notre projet

*Sous la branche **fb-apache-reverse-proxy** de notre repo*

* Dans le dossier **docker-images** de notre projet, on y crée donc le dossier **apache-reverse-proxy** dans lequel on a créé un fichier **Dockerfile** ainsi qu'un dossier **conf**

* Dans le dossier **conf**, on a copié les fichiers de configuration du reverse proxy. On avait vu en point 1 que ces fichiers se trouvent dans le docker sous **/etc/apache2**. Enfait, pour trouver les fichiers de configuration, il faut ensuite aller dans le dossier **sites-available** puis on y trouve le fichier de configuration par défaut **000-default.conf**. On a donc reproduit cette arborescence dans **conf** et mis dans **conf/sites-available** les fichiers de configuration **001-reverse-proxy.conf**, qui indique sur quel container (adresse ip et port) du docker rediriger les requêtes HTTP GET commençant par '/' (nos requêtes sur le serveur apache) ou par '/api/students/' (nos requêtes sur le serveur express) et le fichier de configuration par défaut **000-default.conf** (qui est accédé si la requête HTTP GET n'est ni '/', ni '/api/students/')

* Dans le **Dockerfile**, nous avons mis **FROM php:7.3-apache** qui indique l'image sur laquelle va se construire le docker, puis **COPY conf/ /etc/apache2** pour copier le contenu de notre dossier **conf** au chemin **/etc/apache2**, qui correspond rappelons-le à l'emplacement des fichiers de configuration du container express. Pour lire notre fichier de configuration **001-reverse-proxy.conf**, le container aura également besoin d'activer les modules **proxy** et **proxy_http**, raison pour laquelle on a ajouté la ligne **RUN a2enmod proxy proxy_http** qui va activer ces deux modules lorsqu'on lance notre container. On a également ajouté la ligne RUN a2ensite 000-* 001-* afin d'activer notre site lors d'une requête http, via les fichiers de configuration **000-default.conf** et **001-reverse-proxy.conf**. 

* On a aussi ajouté **RUN apt-get update && \
apt-get install -y vim** au **Dockerfile** pour pouvoir utiliser vim et modifier nos fichiers facilement directement depuis le terminal. À cette étape, on a également ajouté ces deux lignes aux **Dockerfile** de **apache-php-image** et de **express-image**, pour les mêmes raisons.

### Démo :

* Construire les 3 images : 
**docker build -t api/apache_php .**, 
**docker build -t api/express_improv .**, 
**docker build -t api/apache_rp .**

* Démarrer les 3 serveurs : 
**docker run -d --name apache_static api/apache_php** , 
**docker run -d --name express_dynamic api/express_improv**, 
**docker run -p 8080:80 --name apache_rp api/apache_rp**

* en tapant **api.demo.ch:8080** dans le browser, on tombe sur la page configurée en section 1 de ce projet (réponse du serveur apache)

* en tapant **api.demo.ch:8080/api/students/** dans le browser, s'affiche les réponses aléatoires configurées en section 2 de ce projet (réponse du serveur express)

* On peut déduire de ces deux derniers points que le reverse proxy effectue correctement le routage.


## Etape 4: Requêtes AJAX avec JQuery

### Webcasts

* [Labo HTTP (4): AJAX avec JQuery](https://www.youtube.com/watch?v=fgpNEbgdm5k)

### Notre projet

*Sous la branche **fb-ajax-jquery** de notre repo*

* Pour cette étape, nous avons ajouté un script JQuery **improvInitialSituation.js** à **/apache-php-image/content/js/**, dans lequel nous avons écrit du code qui va périodiquement (toutes les deux secondes) faire un appel AJAX (reqûete http en arrière-plan), obtenir des données et mettre à jour le bouton de la page se trouvant sur l'écran d'accueil du template modifié.

* Nous avons également modifié le fichier **index.html** de **/apache-php-image/content/** en ajoutant la ligne **<script src="js/improvInitialSituation.js"></script>** afin que notre nouveau script soit exécuté lors de l'exécution du fichier html. Notons que nous avons aussi du y ajouter **<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>** pour que les requêtes JQuery puissent être interprétées lors de l'exécution.

### Démo :

* Construire les 3 images : 
**docker build -t api/apache_php .**, 
**docker build -t api/express_improv .**, 
**docker build -t api/apache_rp .**

* Démarrer les 3 serveurs : 
**docker run -d --name apache_static api/apache_php** , 
**docker run -d --name express_dynamic api/express_improv**, 
**docker run -p 8080:80 --name apache_rp api/apache_rp**

* En tapant **api.demo.ch:8080** dans le browser, on tombe sur la page configurée en section 1 de ce projet, avec cette fois la situation initiale d'improvisation théâtrale déterminée aléatoirement, qui se refresh (i.e. change) toutes les 2 secondes.

* Si on inspecte l'élément et qu'on va sous **Réseau -> XHR**, on voit les requêtes AJAX qui sont faites (périodiquement dans notre configuration) ; en cliquant sur une requête, "Student" à gauche, on voit le contenu de la requête en question


## Etape 5: Configuration dynamique du reverse proxy 

### Webcasts

* [Labo HTTP (5a): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=iGl3Y27AewU)
* [Labo HTTP (5b): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=lVWLdB3y-4I)
* [Labo HTTP (5c): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=MQj-FzD-0mE)
* [Labo HTTP (5d): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=B_JpYtxoO_E)
* [Labo HTTP (5e): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=dz6GLoGou9k)

### Notre projet

*Sous la branche **fb-dynamic-configuration** de notre repo*

* Dans cette partie du labo, comme énnoncé en prélude, nous avons dû changer la version de php utilisée : nous sommes donc passé.e.s de **php:7.3-apache** à **php:8.1-apache** et avons ainsi premièrement modifié le **FROM** des **Dockerfile** de **apache-php-image** et de **apache-reverse-proxy** en conséquence.

* Pour que notre configuration soit dynamique, nous avons créé un nouveau fichier php **config-template.php** dans **apache-reverse-proxy** qui prend des variables d'environnement en paramètre, qui seront elle-mêmes passées en paramètre lors du lancement du docker reverse-proxy (via **-e**). Ces variables seront ici les adresses ip et ports des deux container (apache et express). 

* Nous avons ensuite observé le Dockerfile de l'image apache à partir de laquelle nous avons construit notre image du reverse proxy (c.f. **https://github.com/docker-library/php**) et avons copié le contenu du **apache2-foreground** de cette image de base dans un nouveau fichier  du même nom dans **apache-reverse-proxy**, y avons ajouté du texte d'affichage ainsi qu'une ligne qui permettra de passer les adresses ip et ports récupérés grâce à **config-template.php** (lors de l'appel à ce script, donc) à notre fichier de configuration **001-reverse-proxy.conf** ; il s'agit de la ligne **php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf**.

### Démo :

* Le fait d'avoir rendu la configuration de notre reverse proxy dynamique nous permet donc de ne pas écrire les adresses IP des serveurs avec lesquels on veut que notre serveur reverse proxy communique. 

* Pour tester notre implémentation, on va donc lancer plusieurs serveurs apache et express pour être sûr.e.s de varier les adresses ip utilisées et ainsi tester cette configuration dynamique en passant donc les adresses ip en paramètres de variables d'environnement lors de l'exécution de notre serveur reverse proxy.

* Construire les images des trois container : 
**docker build -t api/apache_php .** , 
**docker build -t api/apache_rp .**, 
**docker build -t api/express_improv .**

* Lancer plusieurs serveurs apache avec : 
**docker run -d api/apache_php**
* Lancer un serveur apache nommé (celui qu'on va utiliser pour la démo) : 
**docker run -d --name apache_static api/apache_php**

* Lancer plusieurs serveurs express avec : 
**docker run -d api/express_improv**
* Lancer un serveur apache nommé (celui qu'on va utiliser pour la démo) : 
**docker run -d --name apache_dynamic api/express_improv**

* Chercher les adresse ip des deux serveurs nommés : 
**docker inspect apache_static | grep -i ipaddr**, 
**docker inspect apache_dynamic | grep -i ipaddr**

* En remplaçant le x et le y par les valeurs respectives des deux containers connues grâce à la commande précédente (inspect), on indique ainsi au container reverse proxy, lors de son run, les adresses ip du container apache et du container express, ainsi que leur port d'écoute respectifs et en mappant par la même occasion le port 80 du reverse proxy au port 8080 de notre machine : 
**docker run -d -e STATIC_APP=172.17.0.x:80 -e DYNAMIC_APP=172.17.0.y:3000 --name apache_rp -p 8080:80 api/apache_rp**

* Accéder au contenu en tappant dans le browser : 
**api.demo.ch:8080**