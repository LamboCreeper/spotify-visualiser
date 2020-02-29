import {Router} from "express";
import {get} from "../controllers/IndexController";

const IndexRoutes = Router();

IndexRoutes.get("/", get);

export default IndexRoutes;