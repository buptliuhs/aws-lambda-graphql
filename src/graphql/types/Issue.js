'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = GraphQL;

const Issue = new GraphQLObjectType({
	name: 'Issue',
	description: 'The model of Issue',

	fields: {
		severity: {
			type: GraphQLString,
			description: 'The severity of the issue.',
		},
		code: {
			type: GraphQLString,
			description: 'The code of the issue.',
		},
		diagnostics: {
			type: GraphQLString,
			description: 'The diagnostics of the issue.',
		},
		details: {
			type: GraphQLString,
			description: 'The details of the issue.',
		},
	}
});

module.exports = Issue;
