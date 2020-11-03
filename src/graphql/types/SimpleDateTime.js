'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = GraphQL;

const SimpleDateTime = new GraphQLObjectType({
	name: 'SimpleDateTime',
	description: 'The model of the SimpleDateTime type of IDateTime.',

	fields: {
		value: {
			type: GraphQLString,
			description: 'The value of date time',
		},
	}
});

module.exports = SimpleDateTime;
