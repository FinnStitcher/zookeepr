const express = require("express");
const { animals } = require("./data/animals");

const PORT = process.env.PORT || 3001;

const app = express();

function filterByQuery(query, animalsArray) {
	let filteredResults = animalsArray;

	let personalityTraitsArray = [];

	if (query.personalityTraits) {
		// making sure personality traits are saved as an array
		if (typeof query.personalityTraits === "string") {
			personalityTraitsArray = [query.personalityTraits];
		} else {
			personalityTraitsArray = query.personalityTraits;
		}
	}

	// looping through personalityTraitsArray and filtering down the results
	// each iteration removes all animals that don't have the current trait
	// at the end, only animals that have all of them will be included
	personalityTraitsArray.forEach((trait) => {
		filteredResults = filteredResults.filter(
			(animal) => animal.personalityTraits.indexOf(trait) !== -1
		);
	});

	// using ifs and not else-ifs to account for there being multiple query parameters
	if (query.diet) {
		filteredResults = filteredResults.filter(
			(animal) => animal.diet === query.diet
		);
	}

	if (query.species) {
		filteredResults = filteredResults.filter(
			(animal) => animal.species === query.species
		);
	}
	if (query.name) {
		filteredResults = filteredResults.filter(
			(animal) => animal.name === query.name
		);
	}

	return filteredResults;
}

function findById(id, animalsArray) {
	const result = animalsArray.filter((animal) => animal.id === id)[0];
	// index is there because array.filter always returns an array
	return result;
}

// important to not include the dot
app.get("/api/animals", (req, res) => {
	let results = animals;

	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	// if there is a query parameter attached to the url, turn it into JSON and give it to filterByQuery() as a parameter

	res.json(results);
});
// req and res stand for request and response
// app.get takes two parameters:
// 1. a route that tells where the data will come from
// 2. a callback that will execute every time that route receives a GET request

app.get("/api/animals/:id", (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

app.listen(PORT, () => {
	console.log(`Express server now live on port ${PORT}`);
});
