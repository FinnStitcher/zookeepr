const router = require("express").Router();
const animalRoutes = require("./animalRoutes");
const zookeeperRoutes = require("./zookeeperRoutes");

// using index.js as a hub for api routing

router.use(animalRoutes);
// router.use is bundling the animalRoutes in as part of this Router instance
// i think
router.use(zookeeperRoutes);

module.exports = router;