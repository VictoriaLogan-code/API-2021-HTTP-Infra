$(function() {
	console.log("Loading improv initial situations");

	function loadImprovInitialSituations() {
		$.getJSON( "/api/students/", function( initialSituation ) {
			console.log(initialSituation);
			var message = initialSituation[0].year + ", " + initialSituation[0].country + ", " + initialSituation[0].characterProfession + ", name of initial room starts with " + initialSituation[0].placeNameMustStartsWithLetter + ", you have " + initialSituation[0].time + " minutes";
			$(".btn").text(message);
		});
	};
	
	loadImprovInitialSituations();
	setInterval( loadImprovInitialSituations, 2000 );

});