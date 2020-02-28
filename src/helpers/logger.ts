/**
 * Logs an info message.
 * @param {string} message - The message to log
 * @param {any} misc - Any extra data to log
 */
export function logInfo(message: string, misc?: any) {
	console.info(message, misc || "");
}

/**
 * Logs a error message to the console.
 * @param {string} message - The message to log
 * @param {any} misc - Any extra data to log
 */
export function logError(message: string, misc?: any) {
	console.error(message, misc || "");
}

/**
 * Logs a debug message to the console if debug mode is enabled.
 * @param {string} message - The message to log
 * @param {any} misc - Any extra data to log
 */
export function logDebug(message: string, misc?: any) {
	if (process.env.DEBUG) {
		console.debug(message, misc || "");
	}
}