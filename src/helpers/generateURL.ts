export default function generateURL(baseURL: string, queryParams: any) {
	const query = new URLSearchParams(queryParams);

	return `${baseURL}?${query.toString()}`;
}