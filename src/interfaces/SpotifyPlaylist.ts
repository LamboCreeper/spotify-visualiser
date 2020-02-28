interface SpotifyPlaylist {
	id: string;
	owner: string;
	name: string;
	description: string;
	image: string;
	url: string;
	public: boolean;
	total_tracks: number;
}

export default SpotifyPlaylist;