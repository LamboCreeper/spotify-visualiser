import {Router} from "express";
import {get} from "../controllers/PlaylistController";

const PlaylistRoutes = Router();

PlaylistRoutes.get("/:id", get);

export default PlaylistRoutes;