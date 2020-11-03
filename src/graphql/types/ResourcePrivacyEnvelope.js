'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList
} = GraphQL;

const Link = require('./Link');
const Resource = require('./Resource');

const ResourcePrivacyEnvelope = new GraphQLObjectType({
	name: 'ResourcePrivacyEnvelope',
	description: 'The model of ResourcePrivacyEnvelope',

	fields: {
		links: {
			type: new GraphQLList(Link),
			description: 'The links of the resource that is contained in this envelope.',
		},
		resource: {
			type: Resource,
			description: 'The resource contained in this envelope.',
		},
	}
});

module.exports = ResourcePrivacyEnvelope;
