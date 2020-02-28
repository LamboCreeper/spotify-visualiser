import axios from "axios";
import HTTPRequestMethod from "../enums/HTTPRequestMethod";
import HTTPRequestOptions from "../interfaces/HTTPRequestOptions";
import {logError} from "../helpers/logger";

async function HTTPRequest(method: HTTPRequestMethod, url: string, options?: HTTPRequestOptions): Promise<any> {
	try {
		const { body, headers } = options || {body: undefined, headers: undefined};
		const request = await axios({
			method,
			url,
			data: body,
			headers
		});

		if (request.status == 200) {
			return request.data;
		}

		logError("There was an error requesting data.", request);
	} catch (error) {
		logError(error.message, error);

		return;
	}
}

export default HTTPRequest;