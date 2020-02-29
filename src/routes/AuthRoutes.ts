import {Router} from "express";
import {get} from "../controllers/AuthController";

const AuthRoutes = Router();

AuthRoutes.get("/", get);

export default AuthRoutes;