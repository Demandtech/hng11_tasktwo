import app from "./app.js";
import config from "./config.js";

const PORT = config.port || 3300;

const startServer = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		});
	} catch (error) {
		console.log("Error starting server: ", error.message);
	}
};

startServer();
