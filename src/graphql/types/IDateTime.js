'use strict';

const GraphQL = require('graphql');
const {
	GraphQLUnionType
} = GraphQL;

const SimpleDateTime = require('./SimpleDateTime');
const PeriodDateTime = require('./PeriodDateTime');

const IDateTime = new GraphQLUnionType({
	name: 'IDateTime',
	description: 'The model of IDateTime',
	types: [SimpleDateTime, PeriodDateTime],
	resolveType: resolveDateTimeType
});

function resolveDateTimeType(value) {
	return value.start ? PeriodDateTime : SimpleDateTime;
}

module.exports = IDateTime;
