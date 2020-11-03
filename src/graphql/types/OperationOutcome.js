'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList
} = GraphQL;

const Issue = require('./Issue');

const OperationOutcome = new GraphQLObjectType({
	name: 'OperationOutcome',
	description: 'The model of OperationOutcome',

	fields: {
		issues: {
			type: new GraphQLList(Issue),
			description: 'The issues of the operation outcome.',
		},
	}
});

module.exports = OperationOutcome;
