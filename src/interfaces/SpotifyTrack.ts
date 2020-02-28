interface SpotifyTrack {
	id: string;
	name: string;
	releaseDate: string;
	addedAt: string;
	addedBy: string;
	albumType: string;
	albumArtists: string[];
	url: string;
	artwork: string;
}

export default SpotifyTrack;