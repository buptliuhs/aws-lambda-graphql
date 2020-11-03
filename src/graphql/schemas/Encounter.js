'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;

const Query = require('../queries/Encounter');

const EncounterQuery = new GraphQLObjectType({
	name: 'EncounterQuery',
	description: 'This is the encounter root query',
	fields: {
		searchEncounters: Query.searchEncounters(),
	},
});

const Schema = new GraphQLSchema({
	query: EncounterQuery,
});

module.exports = Schema;
