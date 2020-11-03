'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = GraphQL;

const AccessLevel = require('./AccessLevel');

const Link = new GraphQLObjectType({
	name: 'Link',
	description: 'The model of Link',

	fields: {
		accessLevel: {
			type: AccessLevel,
			description: 'The access level in this link.',
		},
		relation: {
			type: GraphQLString,
			description: 'The relation in this link.',
		},
		url: {
			type: GraphQLString,
			description: 'The URL in this link.',
		},
	}
});

module.exports = Link;
