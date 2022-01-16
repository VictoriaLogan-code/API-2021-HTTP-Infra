// On va inclu le module chance
var Chance = require('chance');
var chance = new Chance();

// On inclu le module express
var express = require('express');
var app     = express();

// Callback : quand notre appli reçoit une requete HTTP et que cette méthode c'est get et que la ressource visée est le '/', alors je veux exécuter cette fonction de callback en lui donnant l'objet request et l'objet response, je vais retourner cette chaîne de caractères
app.get('/', function(req, res) {
	res.send( generateInitialSituation() );
});

// On se met à l'écoute sur le port 3000, on accepte des requêtes HTTP sur le port 3000
app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000.');
});

// Improv initial situation generator
function generateInitialSituation() {
	var numberOfInitialSituationToChoseFrom = chance.integer({
		min: 1,
		max: 3
	});
	console.log(numberOfInitialSituationToChoseFrom);
	var initialSituation = [];
	for (var i = 0; i < numberOfInitialSituationToChoseFrom; i++) {
		var year           = chance.year();
		var country        = chance.country({ full: true });
		var profession     = chance.profession();
		var roomStartsWith = chance.character({ alpha: true, casing: 'upper' });
		var time           = chance.minute({
			min: 0,
			max: 20
		});
		
		initialSituation.push({
			year: year,
			country: country,
			characterProfession: profession,
			placeNameMustStartsWithLetter: roomStartsWith,
			time: time
		});
	};
	console.log(initialSituation);
	return initialSituation;
}