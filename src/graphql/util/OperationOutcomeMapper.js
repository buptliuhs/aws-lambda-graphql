'use strict';

class OperationOutcomeMapper {
	static transformOperationOutcomes(data) {
		return data.entry
			?
			data.entry
				.filter(entry => entry.resource != null)
				.filter(entry => entry.resource.resourceType === 'OperationOutcome')
				.map(entry => this.transformOperationOutcome(entry.resource))
			:
			[];
	}

	static transformOperationOutcome(fhirOperationOutcome) {
		const issues = fhirOperationOutcome.issue.map(issue => this.transformIssue(issue));
		return {
			issues: issues
		};
	}

	static transformIssue(issue) {
		return {
			code: issue.code,
			severity: issue.severity,
			diagnostics: issue.diagnostics,
			details: this.transformDetails(issue.details)
		};
	}

	static transformDetails(details) {
		return details
			?
			(details.text
				?
				details.text
				:
				(
					details.coding[0].display
						?
						details.coding[0].display
						:
						details.coding[0].code
				)
			)
			:
			null;
	}
}

module.exports = OperationOutcomeMapper;