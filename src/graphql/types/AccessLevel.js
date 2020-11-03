'use strict';

const GraphQL = require('graphql');
const {
	GraphQLEnumType
} = GraphQL;

const AccessLevel = new GraphQLEnumType({
	name: 'AccessLevel',
	description: 'The model of AccessLevel',

	values: {
		FULL_ACCESS: { value: 'full_access' },
		SEALED: { value: 'sealed' },
		REQUEST_ACCESS: { value: 'request_access' },
		REQUEST_ADDITIONAL_ACCESS: { value: 'request_additional_access' },
		SEAL_OPEN: { value: 'seal_open' },
		LIST_MORE: { value: 'list_more' },
		LOCKED: { value: 'locked' },
		NO_ACCESS: { value: 'no_access' },
		UNKNOWN: { value: 'unknown' },
	}
});

module.exports = AccessLevel;
