'use strict';

const AccessLevel = require('../types/AccessLevel');

class PrivacyMapper {
	static transformLinks(links) {
		if (links) {
			return links
				.filter(link => link.relation != 'self')
				.map(link => this.transformLink(link));
		} else {
			return [];
		}
	}

	static transformLink(link) {
		return {
			accessLevel: this.transformAccessLevel(link.relation),
			relation: link.relation,
			url: link.url,
		};
	}

	static transformAccessLevel(relation) {
		switch (relation) {
			case 'describe-redacted': return this.getAccessLevel('SEALED');
			case 'describe-unredacted': return this.getAccessLevel('SEAL_OPEN');
			default: return this.getAccessLevel('UNKNOWN');
		}
	}

	static getAccessLevel(name) {
		return AccessLevel.getValue(name).value;
	}
}

module.exports = PrivacyMapper;
