const $animalForm = document.querySelector("#animal-form");
const $zookeeperForm = document.querySelector("#zookeeper-form");

const handleAnimalFormSubmit = (event) => {
	event.preventDefault();

	// get animal data and organize it
	const name = $animalForm.querySelector('[name="animal-name"]').value;
	const species = $animalForm.querySelector('[name="species"]').value;
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

	const selectedTraits = $animalForm.querySelector('[name="personality"]').selectedOptions;
	const personalityTraits = [];
	for (let i = 0; i < selectedTraits.length; i += 1) {
		personalityTraits.push(selectedTraits[i].value);
	}
	const animalObject = { name, species, diet, personalityTraits };

	// set POST request to the endpoint /api/animals
	// headers indicate the type of data that the server is receiving
	// stringify the object so the server can pick it up
	fetch("/api/animals", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(animalObject),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				alert("Error: " + response.statusText);
			}
		});
};

const handleZookeeperFormSubmit = (event) => {
	event.preventDefault();

	const name = $zookeeperForm.querySelector("[name='zookeeper-name']").value;
	const age = parseInt($zookeeperForm.querySelector("[name='age']").value);
	const favoriteAnimal = $zookeeperForm.querySelector("[name='favorite-animal']").value;

	const zookeeperObject = { name, age, favoriteAnimal };

	fetch("/api/zookeepers", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(zookeeperObject),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				alert("Error: " + response.statusText);
			}
		});
};

$animalForm.addEventListener("submit", handleAnimalFormSubmit);
$zookeeperForm.addEventListener("submit", handleZookeeperFormSubmit);
