import HTTPRequest from "../utils/HTTPRequest";
import HTTPRequestMethod from "../enums/HTTPRequestMethod";
import generateURL from "../helpers/generateURL";

class SpotifyService {
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
		const baseURL = "https://accounts.spotify.com/api/token";

		const url = generateURL(baseURL, {
			code,
			grant_type: "authorization_code",
			client_id: this.clientId,
			client_secret: this.clientSecret,
			redirect_uri: this.redirectURI,
		});

		const { access_token } = await HTTPRequest(HTTPRequestMethod.POST, url);

		return access_token;
	}
}

export default new SpotifyService();