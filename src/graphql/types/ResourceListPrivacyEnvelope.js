'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt
} = GraphQL;

const Link = require('./Link');
const ResourcePrivacyEnvelope = require('./ResourcePrivacyEnvelope');
const OperationOutcome = require('./OperationOutcome');

const ResourceListPrivacyEnvelope = new GraphQLObjectType({
	name: 'ResourceListPrivacyEnvelope',
	description: 'The model of ResourceListPrivacyEnvelope',

	fields: {
		links: {
			type: new GraphQLList(Link),
			description: 'The links of the resource list that is contained in this envelope.',
		},
		resourceList: {
			type: new GraphQLList(ResourcePrivacyEnvelope),
			description: 'The resource list contained in this envelope.',
		},
		total: {
			type: GraphQLInt,
			description: 'The total number of resources.',
		},
		operationOutcomes: {
			type: new GraphQLList(OperationOutcome),
			description: 'The operation outcomes in this envelope.',
		},
	}
});

module.exports = ResourceListPrivacyEnvelope;
