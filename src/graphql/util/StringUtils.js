'use strict';

class StringUtils {
	static isNotBlank(str) {
		return Boolean(str && str.trim());
	}

	static isBlank(str) {
		return !StringUtils.isNotBlank(str);
	}
}

module.exports = StringUtils;
