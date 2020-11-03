'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = GraphQL;

const PeriodDateTime = new GraphQLObjectType({
	name: 'PeriodDateTime',
	description: 'The model of the PeriodDateTime type of IDateTime.',

	fields: {
		start: {
			type: GraphQLString,
			description: 'The start date time of the period',
		},
		end: {
			type: GraphQLString,
			description: 'The end date time of the period',
		},
	}
});

module.exports = PeriodDateTime;
