import HTTPRequest from "../utils/HTTPRequest";
import HTTPRequestMethod from "../enums/HTTPRequestMethod";
import generateURL from "../helpers/generateURL";
import SpotifyPlaylist from "../interfaces/SpotifyPlaylist";
import SpotifyTrack from "../interfaces/SpotifyTrack";

class SpotifyService {
	baseURL = "https://api.spotify.com/v1";
	clientId = process.env.SPOTIFY_CLIENT_ID;
	clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	redirectURI = process.env.SPOTIFY_REDIRECT_URI;

	constructor() {
		if ([this.clientId, this.clientSecret].includes(undefined)) {
			throw new Error("You must supply a SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to use the Spotify Service.");
		}
	}

	/**
	 * Get a bearer token from Spotify's API.
	 * @param {string} code - The code returned from Spotify's authorize page.
	 * @returns {string} - The access token.
	 */
	async getAccessToken(code: string): Promise<string> {
		const url = generateURL("https://accounts.spotify.com/api/token", {
			code,
			grant_type: "authorization_code",
			client_id: this.clientId,
			client_secret: this.clientSecret,
			redirect_uri: this.redirectURI,
		});

		const { access_token } = await HTTPRequest(HTTPRequestMethod.POST, url);

		return access_token;
	}

	/**
	 * Get an array of the user's playlists.
	 * @param {string} accessToken - The access token for Spotify's API.
	 * @returns {SpotifyPlaylist[]} - an array of the user's Spotify playlists.
	 */
	async getUsersPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
		const url = `${this.baseURL}/me/playlists`;

		const { items } = await HTTPRequest(HTTPRequestMethod.GET, url, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return items.map((playlist: any) => ({
			id: playlist.id,
			owner: playlist.owner.id,
			name: playlist.name,
			description: playlist.description,
			image: playlist.images.url,
			url: playlist.external_urls.spotify,
			public: playlist.public,
			total_tracks: playlist.tracks.total
		}));
	}

	/**
	 * Gets an array of Spotify tracks in a specific playlist.
	 * @param {string} id - The id of the playlist you would like tracks of.
	 * @param {string} accessToken - The access token for Spotify's API.
	 * @returns {SpotifyTrack[]} - an array of Spotify tracks.
	 */
	async getPlaylistTracks(id: string, accessToken: string): Promise<SpotifyTrack[]> {
		const url = `${this.baseURL}/playlists/${id}/tracks`;

		const { items } = await HTTPRequest(HTTPRequestMethod.GET, url, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return items.map((track: any) => ({
			id: track.track.id,
			name: track.track.name,
			releaseDate: track.track.release_date,
			addedAt: track.added_at,
			addedBy: track.added_by.id,
			albumType: track.track.album.album_type,
			url: track.track.external_urls.spotify,
			artwork: track.track.album.images[0]
		}));
	}
}

export default new SpotifyService();