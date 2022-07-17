const fs = require("fs");

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../lib/animals");
const { animals } = require("../data/animals");

jest.mock("fs");
// really not sure how jest.mock works, but it's making sure we can test these things without actually editing the database
// maybe it's creating a fake instance of fs that isn't connected to anything else?

test("creates animal object", () => {
    const animal = createNewAnimal({name: "Darlene", id: "99999"}, animals);

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("99999");
});

test("filters by query", () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const updatedAnimals = filterByQuery({species: "gorilla"}, startingAnimals);

    expect(updatedAnimals.length).toBe(1);
});

test("finds by id", () => {
    const startingAnimals = [
        {
          id: "3",
          name: "Erica",
          species: "gorilla",
          diet: "omnivore",
          personalityTraits: ["quirky", "rash"],
        },
        {
          id: "4",
          name: "Noel",
          species: "bear",
          diet: "carnivore",
          personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const result = findById("3", startingAnimals);

    expect(result.name).toBe("Erica");
});

test("validates data", () => {
    const validAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };
    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };

    const validResult = validateAnimal(validAnimal);
    const invalidResult = validateAnimal(invalidAnimal);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false);
})