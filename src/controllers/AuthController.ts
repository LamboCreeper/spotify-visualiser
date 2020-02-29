import {Request, Response} from "express";
import SpotifyService from "../services/SpotifyService";

export async function get(req: Request, res: Response): Promise<void> {
	const { code } = req.query;

	if (code && req.session) {
		req.session.accessToken = await SpotifyService.getAccessToken(code);
	}

	return res.redirect("/");
}