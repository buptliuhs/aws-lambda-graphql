'use strict';

const Log = require('../util/Log');
const PrivacyMapper = require('../util/PrivacyMapper');
const StringUtils = require('../util/StringUtils');
const OperationOutcomeMapper = require('../util/OperationOutcomeMapper');
const CodeableConceptMapper = require('../util/CodeableConceptMapper');

function getReference(contained, reference, resourceType) {
	for (var i = 0; i < contained.length; i++) {
		if (reference === '#' + contained[i].id && contained[i].resourceType === resourceType) {
			return contained[i];
		}
	};
	console.error('Unable to find the reference: ' + reference);
}

function transformLocationName(locationReference) {
	return locationReference.description || locationReference.identifier[0].value;
}

function transformLocation(fhirEncounter) {
	if (!fhirEncounter.location)
		return {};
	const __location = {};
	fhirEncounter.location.forEach(location => {
		const locationReference = getReference(fhirEncounter.contained, location.location.reference, 'Location');
		if (locationReference && locationReference.physicalType) {
			if (locationReference.physicalType.text === 'facility') {
				__location.facility = transformLocationName(locationReference);
			} else if (locationReference.physicalType.text === 'building') {
				__location.building = transformLocationName(locationReference);
			} else if (locationReference.physicalType.text === 'ward') {
				__location.ward = transformLocationName(locationReference);
			} else if (locationReference.physicalType.text === 'room') {
				__location.room = transformLocationName(locationReference);
			} else if (locationReference.physicalType.text === 'bedSpace') {
				__location.bed = transformLocationName(locationReference);
			}
		}
	});
	return __location;
}

function transformPeriod(fhirEncounter) {
	const __period = {};
	__period.start = fhirEncounter.period.start;
	__period.end = fhirEncounter.period.end;
	return __period;
}

function transformSpecialties(fhirEncounter, codingSystem) {
	return fhirEncounter.type
		.map(type => CodeableConceptMapper.mapTextFromCodeableConcept(type, codingSystem))
		.filter(StringUtils.isNotBlank);
}

function transformEncounter(fhirEncounter, codingSystem) {
	Log.logJson('Transforming encounter: ', fhirEncounter.id);
	const __encounter = {};
	// Begin
	// Transform ID
	__encounter.id = fhirEncounter.id;
	// Transform status
	__encounter.status = fhirEncounter.status;
	// Transform location
	__encounter.location = transformLocation(fhirEncounter);
	// Transform period
	__encounter.period = transformPeriod(fhirEncounter);
	// Transform specialties
	__encounter.specialties = transformSpecialties(fhirEncounter, codingSystem);
	// End
	Log.logJson('Encounter: ', __encounter);
	return __encounter;
}

function transformEncounterInEnvelope(entry, codingSystem) {
	return {
		links: PrivacyMapper.transformLinks(entry.link),
		resource: transformEncounter(entry.resource, codingSystem),
	}
}

function hasResource(entry) {
	return entry.resource != null;
}

function isEncounterEntry(entry) {
	return entry.resource.resourceType === "Encounter";
}

function matchStatus(fhirEncounter, status) {
	if (!status || status.length === 0)
		return true;

	for (var i = 0; i < status.length; ++i) {
		if (fhirEncounter.status === status[i])
			return true;
	}
	return false;
}

function getFhirEncounterEntries(data, status, max) {
	if (data.entry) {
		var entries = data.entry
			.filter(hasResource)
			.filter(isEncounterEntry)
			.filter(entry => matchStatus(entry.resource, status))
			.sort(compare);
		const size = entries.length;
		if (max != null && size > max)
			entries = entries.slice(0, max);
		return entries;
	} else {
		return [];
	}
}

function getStart(fhirEncounter) {
	return fhirEncounter.period.start ? fhirEncounter.period.start : '1970-01-01T00:00:00+00:00';
}

function compare(entry1, entry2) {
	return getStart(entry2.resource).localeCompare(getStart(entry1.resource));
}

// Response Handler
function responseHandler(data, status, codingSystem, max) {
	Log.logJson('FHIR Response: ', data);
	const resourceList = getFhirEncounterEntries(data, status, max)
		.map(entry => transformEncounterInEnvelope(entry, codingSystem));
	const links = PrivacyMapper.transformLinks(data.link);
	const operationOutcomes = OperationOutcomeMapper.transformOperationOutcomes(data);
	return {
		links: links,
		resourceList: resourceList,
		operationOutcomes: operationOutcomes,
		total: resourceList.length
	};
}

// Error Handler
function errorHandler(error) {
	console.log('Error', error)
}

// Resolver
const Resolver = {
	searchEncounters(client, args) {
		const param = {
			type: 'Encounter',
			query: {
				'patient.identifier': args.patientSystem + '|' + args.patientCode
			}
		};
		Log.logJson('Querying encounters: ', param);

		return client
			.get()
			.search(param)
			.then((response) => responseHandler(response.data, args.status, args.codingSystem, args.max))
			.catch(errorHandler);
	}
}

module.exports = Resolver;