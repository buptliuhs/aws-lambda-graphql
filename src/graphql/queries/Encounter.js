'use strict';

const FhirClient = require('../util/FhirClient');

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLString,
	GraphQLInt
} = GraphQL;

// Types
const ResourceListPrivacyEnvelope = require('../types/ResourceListPrivacyEnvelope');

// Resolver
const Resolver = require('../resolvers/Encounter');

// Query
const Query = {
	searchEncounters() {
		return {
			type: ResourceListPrivacyEnvelope,
			description: 'Searches a list of encounters that match the patient\'s system/code and, if there is any, the status.',
			args: {
				patientSystem: {
					type: GraphQLString,
					description: 'the patient system',
				},
				patientCode: {
					type: GraphQLString,
					description: 'the patient code',
				},
				status: {
					type: new GraphQLList(GraphQLString),
					description: 'the list of status (Optional)',
				},
				codingSystem: {
					type: new GraphQLList(GraphQLString),
					description: 'the list of coding system (Optional)',
				},
				max: {
					type: GraphQLInt,
					description: 'the maximum number of resources should be returned (Optional)',
				}
			},
			resolve(parent, args, context, info) {
				return Resolver.searchEncounters(new FhirClient(context.headers), args);
			}
		}
	}
}

module.exports = Query;
