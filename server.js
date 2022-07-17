const express = require("express");
const fs = require("fs");
const path = require("path");

const { animals } = require("./data/animals");
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html");
// with no file specified, here, it'll default to reading index.js
// that's why we used that file name twice

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
	console.log(`Express server now live on port ${PORT}`);
});
