'use strict';

const Fhir = require('fhir.js');
const Log = require('./Log');
const PropertiesReader = require('properties-reader');

const properties = PropertiesReader('./default.properties');
const apiBaseUrl = properties.get('api.base_url');

class FhirClient {
	constructor(headers) {
		this.headers = headers;
	}

	get() {
		const authorization = this.headers['authorization'];
		const token = authorization && authorization.toLowerCase().startsWith('bearer ')
			?
			authorization.substring('bearer '.length)
			:
			null;
		const auth = {
			bearer: token
		};
		const param = {
			baseUrl: apiBaseUrl,
			auth: auth
		};

		Log.logJson('Fhir client parameters: ', param);
		return Fhir(param);
	}
}

module.exports = FhirClient;
