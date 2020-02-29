import express from "express";
import ejs from "ejs";
import {logError, logInfo} from "./helpers/logger";
import IndexRoutes from "./routes/IndexRoutes";

const app = express();

if (process.env.PORT) {
	app.set("views", `${__dirname}/../views`);
	app.set("view engine", "ejs");

	app.use("/", IndexRoutes);

	app.listen(process.env.PORT, () => {
		logInfo(`Started Express server on port ${process.env.PORT}.`);
	});
} else {
	logError("You must supply a PORT environment variable for the server to run on.");
}