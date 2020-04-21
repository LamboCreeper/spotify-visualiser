import {Request, Response} from "express";
import generateURL from "../helpers/generateURL";
import SpotifyService from "../services/SpotifyService";

const SPOTIFY_BASE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_RESPONSE_TYPE = "code";
const SPOTIFY_SCOPES = "playlist-read-private,user-top-read";

export async function get(req: Request, res: Response): Promise<void> {
	const { accessToken }: any = req.session;

	if (accessToken) {
		const playlists = await SpotifyService.getUsersPlaylists(accessToken);

		return res.status(200).render("dashboard", {
			playlists
		});
	}

	return res.status(200).render("index", {
		signInURL: generateURL(SPOTIFY_BASE_URL, {
			client_id: SpotifyService.clientId,
			redirect_uri: SpotifyService.redirectURI,
			response_type: SPOTIFY_RESPONSE_TYPE,
			scope: SPOTIFY_SCOPES
		})
	});
}