'use strict';

const GraphQL = require('graphql');
const {
	GraphQLUnionType
} = GraphQL;

const Encounter = require('./Encounter');

const Resource = new GraphQLUnionType({
	name: 'Resource',
	description: 'The model of Resource',
	types: [Encounter],
	resolveType: resolveResourceType
});

function resolveResourceType(value) {
	return Encounter;
}

module.exports = Resource;
