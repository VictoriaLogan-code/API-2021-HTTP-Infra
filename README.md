# Labo HTTP Infra

## Informations générales
* Pour tuer (stopper) tous les containers actifs : 
**docker kill $(docker ps -q)**
* Pour supprimer tous les containers : 
**docker rm $(docker ps -a -q)**

## Step 1: Server HTTP statique avec apache http

* GitHub repo : **https://github.com/VictoriaLogan-code/API-2021-HTTP-Infra.git**
* build the Docker image : **docker build -t res/apache_php .**
   run the Docker image   : **docker run -p 9090:80 res/apache_php**
   * pour accéder au contenu depuis le browser une fois le container lancé, taper **localhost:9090** dans la barre de recherche ; la page interprétant le code du fichier source **/content/index.html/** apparaît
* dans le Dockerfile, changé **src/** à **content/** pour que lorsque l'on lance un docker il aille chercher l'image de ce docker directement dans content/ au lieu de src/
* en faisant la commande **docker exec -it nom_container bin/bash**, on ouvre un terminal depuis le serveur (container)
--> depuis ce terminal, en allant dans **/etc/apache2/sites-available**, puis exécutant **more 000-default.cong**, on peut voir (typiquement) si un host virtuel écoute, et sur quel port
* enfait, le contenu se trouve sous **/var** dans le container, et la configuration du serveur apache dans **/etc/apache2**


## Step 2: Server HTTP dynamique avec express.js

* Dans notre implémentation de express-image/src/index.js, on génère aléatoirement des situations initiale pour une scène d'improvisation théâtrale. Pour changer de l'exemple donné en cours, on laisse au joueur le choix de son nom, prénom et genre, mais on lui impose la durée de l'improvisation (entre 30 sec et 20 mn), l'année, le pays, le jour de la semaine, la lettre de début de la pièce dans laquelle iel se trouve, ainsi que son animal de compagnie.

* Pour la démo : 
* depuis le terminal : **docker build -t api/express_students**  pour la première fois, puis **docker run -p 9090:3000 api/express_students**
* puis depuis browser: **localhost:3000** pour avoir la réponse du serveur


## Step 3: Reverse proxy avec apache (configuration statique)

Pour la démo : 
* démarrer les 3 serveurs : 
**docker run -d --name apache_static api/apache_php** , 
**docker run -d --name express_dynamic api/express_students**, 
**docker run -p 8080:80 --name apache_rp api/apache_rp**

* en tapant **api.demo.ch:8080** dans le browser, on tombe sur la page configurée en section 1 de ce projet (réponse du serveur apache)

* en tapant **api.demo.ch:8080/api/students/** dans le browser, s'affiche les réponses aléatoires configurées en section 2 de ce projet (réponse du serveur express)


## Step 4: Requêtes AJAX avec JQuery

* Dans le browser, si on inspecte l'élément et qu'on va sous "Réseau" -> "XHR", on voit les requêtes AJAX qui sont faites (périodiquement dans notre configuration).

* En cliquant sur une requête, "Student" à gauche, on voit le contenu de la requête en question


## Step 5: Configuration dynamique du reverse proxy 

Le fait d'avoir rendu la configuration de notre reverse proxy dynamique nous permet donc de ne pas écrire les adresses IP des serveurs avec lesquels on veut que notre serveur reverse proxy communique. 

Pour tester notre implémentation, on va donc lancer plusieurs serveurs apache et express pour être sûr.e.s de varier les adresses ip utilisées et ainsi tester cette configuration dynamique en passant donc les adresses ip en paramètres de variables d'environnement lors de l'exécution de notre serveur reverse proxy.

Pour la démo :

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

* Soit ip_static l'adresse ip du serveur apache et ip_dynamic l'adresse ip du serveur express, on les indique donc au container reverse proxy lors de son run, ainsi que leur port d'écoute respectifs et en mappant par la même occasion le port 80 du reverse proxy au port 8080 de notre machine : 
**docker run -d -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.9:3000 --name apache_rp -p 8080:80 api/apache_rp**

* Accéder au contenu en tappant dans le browser : 
**api.demo.ch:8080**


# A FAIRE : 

- Be aware that the webcasts have been recorded in 2016. There is no change in the list of tasks to be done, but of course there are some differences in the details. For instance, the Docker images that we use to implement the solution have changed a bit and you will need to do some adjustments to the scripts. This is part of the work and we ask you to DOCUMENT WHAT THE REQUIRED ADAPTATIONS ARE, IN YOUR REPORT.

- Make sure to document your choices in the report. (Learning to discuss requirements with a "customer" (even if this one pays you with a grade and not with money) is part of the process!)

- We will request demos as needed. When you do your demo, be prepared to that you can go through the procedure quickly (there are a lot of solutions to evaluate!)

- You have to write a report. Please do that directly in the repo, in one or more markdown files. Start in the README.md file at the root of your directory.

- The report must contain the procedure that you have followed to prove that your configuration is correct (what you would do if you were doing a demo).

# ATTENTION 

- Read carefully all the acceptance criteria.


