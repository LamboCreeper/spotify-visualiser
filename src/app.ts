import express from "express";
import ejs from "ejs";
import session from "express-session";
import {v1 as generateUUID} from "uuid";
import {logError, logInfo} from "./helpers/logger";
import IndexRoutes from "./routes/IndexRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import PlaylistRoutes from "./routes/PlaylistRoutes";
import LineupPosterRoutes from "./routes/LineupPosterRoutes";

const app = express();

if (process.env.PORT) {
	app.set("views", `${__dirname}/../views`);
	app.set("view engine", "ejs");


	app.use(express.static("public"));
	app.use(session({
		secret: generateUUID()
	}));

	app.use("/", IndexRoutes);
	app.use("/auth", AuthRoutes);
	app.use("/playlist", PlaylistRoutes);
	app.use("/lineup-poster", LineupPosterRoutes);

	app.listen(process.env.PORT, () => {
		logInfo(`Started Express server on port ${process.env.PORT}.`);
	});
} else {
	logError("You must supply a PORT environment variable for the server to run on.");
}