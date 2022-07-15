const $animalForm = document.querySelector("#animals-form");
const $displayArea = document.querySelector("#display-area");

const printResults = (resultArr) => {
	const animalHTML = resultArr.map(
		({ id, name, personalityTraits, species, diet }) => {
			return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Species: ${
			species.substring(0, 1).toUpperCase() + species.substring(1)
		}<br/>
      Diet: ${diet.substring(0, 1).toUpperCase() + diet.substring(1)}<br/>
      Personality Traits: ${personalityTraits
			.map(
				(trait) =>
					`${
						trait.substring(0, 1).toUpperCase() + trait.substring(1)
					}`
			)
			.join(", ")}</p>
    </div>
  </div>
    `;
		}
	);

	$displayArea.innerHTML = animalHTML.join("");
};

// this function works whether or not there is form data thanks to the default value
const getAnimals = (formData = {}) => {
	let queryUrl = "/api/animals?";

	// Object.entries() unpacks the object into an array full of other arrays, one for each property
	// each array contains two elements: the key, and the value, of the original property
	// once we've unpacked it, we run forEach on the array-of-arrays, used destructuring to get the key and value out, and add to the url
	Object.entries(formData).forEach(([key, value]) => {
		queryUrl += `${key}=${value}&`;
	});

	fetch(queryUrl)
		.then((response) => {
			if (!response.ok) {
				return alert("Error: " + response.statusText);
			} else {
				return response.json();
				// response.json() = turn the response into stringified json
                // it seems like stringified json is being parsed back into js objects automatically in a lot of places. this greatly confuses me
			}
		})
		.then((animalData) => {
			printResults(animalData);
		});
};

// gathers all the information from the form
// packages it as an object
// sends it to getAnimals()
const handleGetAnimalsSubmit = (event) => {
	event.preventDefault();
	const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
	let diet;

	for (let i = 0; i < dietRadioHTML.length; i += 1) {
		if (dietRadioHTML[i].checked) {
			diet = dietRadioHTML[i].value;
		}
	}

	if (diet === undefined) {
		diet = "";
	}

	const personalityTraitArr = [];
	const selectedTraits = $animalForm.querySelector(
		'[name="personality"'
	).selectedOptions;

	for (let i = 0; i < selectedTraits.length; i += 1) {
		personalityTraitArr.push(selectedTraits[i].value);
	}

	const personalityTraits = personalityTraitArr.join(",");

	const animalObject = { diet, personalityTraits };

	getAnimals(animalObject);
};

$animalForm.addEventListener("submit", handleGetAnimalsSubmit);

getAnimals();
