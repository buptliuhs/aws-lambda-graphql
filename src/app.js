'use strict';

const express = require('express');
const body_parser = require('body-parser');
const expressGraphQL = require('express-graphql');

const EncounterSchema = require('./graphql/schemas/Encounter');

const app = express();

app.use(body_parser.json({ limit: '50mb' }));

app.use(
	'/graphql/encounter',
	expressGraphQL({
		schema: EncounterSchema,
		graphiql: true,
	})
);

module.exports = app;
