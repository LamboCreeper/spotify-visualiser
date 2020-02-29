import HTTPRequest from "../utils/HTTPRequest";
import HTTPRequestMethod from "../enums/HTTPRequestMethod";
import generateURL from "../helpers/generateURL";
import SpotifyPlaylist from "../interfaces/SpotifyPlaylist";
import SpotifyTrack from "../interfaces/SpotifyTrack";
import SpotifyTrackFeatures from "../interfaces/SpotifyTrackFeatures";

class SpotifyService {
	private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

	readonly baseURL = "https://api.spotify.com/v1";
	readonly clientId = process.env.SPOTIFY_CLIENT_ID;
	readonly redirectURI = process.env.SPOTIFY_REDIRECT_URI;

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

	/**
	 * Get audio features about an array of tracks.
 	 * @param {string[]} tracks - An array of track ids.
	 * @param {string} accessToken - The access token for Spotify's API.
	 * @returns {SpotifyTrackFeatures[]} - an array of Spotify track features.
	 */
	async getAudioFeatures(tracks: string[], accessToken: string): Promise<SpotifyTrackFeatures[]> {
		if (tracks && tracks.length < 101) {
			const url = `${this.baseURL}/audio-features?ids=${tracks.join()}`;

			const { audio_features } = await HTTPRequest(HTTPRequestMethod.GET, url, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			return audio_features.map((track: any) => ({
				id: track.id,
				danceability: track.danceability,
				energy: track.energy,
				key: track.key,
				loudness: track.loudness,
				speechiness: track.speechiness,
				acousticness: track.acousticness,
				instrumentalness: track.instrumentalness,
				liveness: track.liveness,
				valence: track.valence,
				tempo: track.tempo,
				duration: track.duration,
				timeSignature: track.timeSignature
			}));
		} else {
			throw new Error("You can only supply a maximum of 100 tracks.");
		}
	}
}

export default new SpotifyService();