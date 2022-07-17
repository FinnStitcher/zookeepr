const fs = require("fs");
const path = require("path");

function filterByQuery(query, keepersArray) {
	let filteredResults = keepersArray;

	// using ifs and not else-ifs to account for there being multiple query parameters
	if (query.name) {
		filteredResults = filteredResults.filter(
			(keeper) => keeper.name === query.name
		);
	}

	if (query.age) {
		filteredResults = filteredResults.filter(
			(keeper) => keeper.age === Number(query.age)
            // Number() here is converting a string to a number
		);
	}

	if (query.favoriteAnimal) {
		filteredResults = filteredResults.filter(
			(keeper) => keeper.favoriteAnimal === query.favoriteAnimal
		);
	}

	return filteredResults;
}

function findById(id, keepersArray) {
	const result = keepersArray.filter((keeper) => keeper.id === id)[0];
	// index is there because array.filter always returns an array
	return result;
}

function createNewKeeper(body, keepersArray) {
	const keeper = body;
	keepersArray.push(keeper);

	// now we have to actually get it into the json file
	fs.writeFileSync(
		path.join(__dirname, "../data/keepers.json"),
		JSON.stringify({ keepers: keepersArray }, null, 2)
	);
	// __dirname = the directory this is being run from; we use path.join to create an absolute address
	// using JSON.stringify to process keepersArray
	// the second 2 arguments mean 1. we dont want to edit the data, and 2. we want whitespace

	// send the keeper's info back
	// this will go to the .post() route we established down below, so the user can see it
	return keeper;
}

function validateKeeper(keeper) {
	if (!keeper.name || typeof keeper.name !== "string") {
		return false;
	}
	if (!keeper.age || typeof keeper.age !== "number") {
		return false;
	}
	if (!keeper.favoriteAnimal || typeof keeper.favoriteAnimal !== "string") {
		return false;
	}
	return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewKeeper,
    validateKeeper
}