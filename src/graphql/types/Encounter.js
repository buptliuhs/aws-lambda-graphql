'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} = GraphQL;

const Location = require('./Location');
const PeriodDateTime = require('./PeriodDateTime');

const Encounter = new GraphQLObjectType({
	name: 'Encounter',
	description: 'The model of Encounter',

	fields: {
		id: {
			type: GraphQLString,
			description: 'The id of the encounter',
		},
		location: {
			type: Location,
			description: 'The location of the encounter',
		},
		status: {
			type: GraphQLString,
			description: 'The status of the encounter',
		},
		period: {
			type: PeriodDateTime,
			description: 'The period of the encounter',
		},
		specialties: {
			type: new GraphQLList(GraphQLString),
			description: 'The specialties of the encounter.',
		},
	}
});

module.exports = Encounter;
