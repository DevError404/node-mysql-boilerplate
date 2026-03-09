const express = require("express");
const { connectDB, sequelize } = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const main = async () => {
	try {
		const app = express();
		app.use(express.json({ limit: "60mb", extended: true }));
		app.use(express.urlencoded({ limit: "60mb", extended: true }));

		app.use((err, req, res, next) => {
			if (err.type === "entity.parse.failed") {
				return res.status(400).json({ error: "Invalid JSON payload" });
			}
			return next();
		});

		await connectDB();

		await sequelize.sync();
		const routeUrls = require("./routes");
		routeUrls(app);

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});

		return app;
	} catch (error) {
		console.error("Error starting the application:", error);
		process.exit(1);
	}
};

const app = main();

module.exports = app;
