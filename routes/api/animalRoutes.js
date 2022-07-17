const router = require("express").Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals");
const { animals } = require("../../data/animals");

// important to not include the dot
router.get("/animals", (req, res) => {
	let results = animals;

	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	// if there is a query parameter attached to the url, turn it into JSON and give it to filterByQuery() as a parameter

	res.json(results);
});
// req and res stand for request and response
// router.get takes two parameters:
// 1. a route that tells where the data will come from
// 2. a callback that will execute every time that route receives a GET request

// apparently this needs to go after the general query-based endpoint up there
// unsure why but whatever
router.get("/animals/:id", (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

// the endpoint /api/animals can take GET and POST requests
// somehow between the frontend, where the data is converted into a string, and here, the data is becoming a javascript object again
// removing the JSON.stringify() call in the frontend DOES break everything, but i don't understand what's happening between here and there
// maybe it's to do with the express.json() call up above?
router.post("/animals", (req, res) => {
	// req.body is the incoming content
	// generate id
	req.body.id = animals.length.toString();

	if (!validateAnimal(req.body)) {
		res.status(400).send("Improper formatting.");
	} else {
		const animal = createNewAnimal(req.body, animals);
		// calling createNewAnimal and giving it the relevant data so the animal will be added to the array/json
		// createNewAnimal() will return the animal data after it's added, and it'll go into that const

		res.json(animal);
	}
});

// exporting router and then importing it in server.js lets the server access these routes
// we ARE declaring data, apparently! i think calling get() and post() IS attaching things to the Router instance
module.exports = router;