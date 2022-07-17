const fs = require("fs");

const { filterByQuery, findById, createNewKeeper, validateKeeper, } = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

test("creates zookeeper object", () => {
	const keeper = createNewKeeper(
		{ name: "Darlene", id: "99999" },
		zookeepers
	);

	expect(keeper.name).toBe("Darlene");
	expect(keeper.id).toBe("99999");
});

test("filters by query", () => {
	const starting = [
		{
			id: "0",
			name: "Kim",
			age: 28,
			favoriteAnimal: "dolphin",
		},
		{
			id: "1",
			name: "Raksha",
			age: 31,
			favoriteAnimal: "penguin",
		},
	];
	const updated = filterByQuery({ age: 28 }, starting);

	expect(updated.length).toBe(1);
});

test("finds by id", () => {
	const starting = [
		{
			id: "0",
			name: "Kim",
			age: 28,
			favoriteAnimal: "dolphin",
		},
		{
			id: "1",
			name: "Raksha",
			age: 31,
			favoriteAnimal: "penguin",
		},
	];
	const result = findById("1", starting);

	expect(result.name).toBe("Raksha");
});

test("validates data", () => {
	const validZookeeper = {
		id: "1",
		name: "Raksha",
		age: 31,
		favoriteAnimal: "penguin",
	};
	const invalidZookeeper = {
		id: "1",
		name: "Raksha",
		age: 31,
	};

	const validResult = validateKeeper(validZookeeper);
	const invalidResult = validateKeeper(invalidZookeeper);

	expect(validResult).toBe(true);
	expect(invalidResult).toBe(false);
});
