module.exports = (app) => {
	app.get("/", (req, res) => {
		res.json({ message: "Welcome to the Node MySQL Boilerplate API!" });
	});
};
