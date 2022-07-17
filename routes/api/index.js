const router = require("express").Router();
const animalRoutes = require("./animalRoutes");

// using index.js as a hub for api routing

router.use(animalRoutes);
// router.use is bundling the animalRoutes in as part of this Router instance
// i think

module.exports = router;