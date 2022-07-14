const express = require("express");
const fs = require("fs");
const path = require("path");
const { animals } = require("./data/animals");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    // now we have to actually get it into the json file
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    )
    // __dirname = the directory this is being run from; we use path.join to create an absolute address
    // using JSON.stringify to process animalsArray
    // the second 2 arguments mean 1. we dont want to edit the data, and 2. we want whitespace

    // send the animal's info back
    // this will go to the .post() route we established down below, so the user can see it
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
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

// apparently this needs to go after the general query-based endpoint up there
// unsure why but whatever
app.get("/api/animals/:id", (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

// the endpoint /api/animals can take GET and POST requests
app.post('/api/animals', (req, res) => {
    // req.body is the incoming content
    // generate id
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
        res.status(400).send('Improper formatting.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        // calling createNewAnimal and giving it the relevant data so the animal will be added to the array/json
        // createNewAnimal() will return the animal data after it's added, and it'll go into that const

        res.json(animal);        
    };
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
})

app.listen(PORT, () => {
	console.log(`Express server now live on port ${PORT}`);
});
