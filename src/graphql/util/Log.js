'use strict';

class Log {
	static logJson(message, json) {
		console.log(message + JSON.stringify(json, null, 2));
	}
}

module.exports = Log;
