import {Request, Response} from "express";
import SpotifyService from "../services/SpotifyService";

export async function get(req: Request, res: Response): Promise<void> {
	const { accessToken }: any = req.session;

	if (accessToken) {
		let artists: any = await SpotifyService.getUserTopArtists(accessToken);

		return res.status(200).render("lineup-poster", {
			artists
		});
	}

	return res.redirect("/");
}