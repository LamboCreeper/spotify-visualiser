import {Router} from "express";
import {get} from "../controllers/LineupPosterController";

const LineupPosterRoutes = Router();

LineupPosterRoutes.get("/", get);

export default LineupPosterRoutes;