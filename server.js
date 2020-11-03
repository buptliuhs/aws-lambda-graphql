'use strict';

const app = require('./src/app');
const PropertiesReader = require('properties-reader');

const properties = PropertiesReader('./default.properties');
const port = properties.get('app.port') || 1337;

// let's set the port on which the server will run
app.set('port', port);

// start the server
app.listen(
	app.get('port'),
	() => {
		console.log('GraphQL Server Running at http://127.0.0.1:' + app.get('port'));
	}
);
