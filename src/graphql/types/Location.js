'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = GraphQL;

const Location = new GraphQLObjectType({
	name: 'Location',
	description: 'The model of Location',

	fields: {
		facility: {
			type: GraphQLString,
			description: 'facility of the location',
		},
		building: {
			type: GraphQLString,
			description: 'building of the location',
		},
		ward: {
			type: GraphQLString,
			description: 'ward of the location',
		},
		room: {
			type: GraphQLString,
			description: 'room of the location',
		},
		bed: {
			type: GraphQLString,
			description: 'bed of the location',
		},
	}
});

module.exports = Location;
