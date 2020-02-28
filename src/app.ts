import express from "express";
import {logError, logInfo} from "./helpers/logger";

const app = express();

if (process.env.PORT) {
	app.listen(process.env.PORT, () => {
		logInfo(`Started Express server on port ${process.env.PORT}.`);
	});
} else {
	logError("You must supply a PORT environment variable for the server to run on.");
}