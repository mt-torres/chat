const app = require("./app");

const port = 8000 || 3000;
const server = app.listen(port, () => {
	console.log(`Chat running on port ${port}...`);
});
