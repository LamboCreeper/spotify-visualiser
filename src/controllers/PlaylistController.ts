import {Request, Response} from "express";
import SpotifyService from "../services/SpotifyService";
import SpotifyTrack from "../interfaces/SpotifyTrack";

export async function get(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	const { accessToken }: any = req.session;

	if (id && accessToken) {
		let tracks: any = await SpotifyService.getPlaylistTracks(id, accessToken);
		let audioFeatures = await SpotifyService.getAudioFeatures(tracks.map((track: SpotifyTrack) => track.id), accessToken);

		tracks = tracks.map((track: SpotifyTrack) => ({
			...track,
			...audioFeatures.find((f) => f.id === track.id)
		}));

		return res.status(200).render("playlist", {
			tracks
		});
	}

	return res.redirect("/");
}