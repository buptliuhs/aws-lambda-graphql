'use strict';

const Log = require('./Log');

class CodeableConceptMapper {
    static mapTextFromCodeableConcept(codeableConcept) {
        return mapTextFromCodeableConcept(codeableConcept, null);
    }

    static mapTextFromCodeableConcept(codeableConcept, systems) {
        if (codeableConcept.text != null)
            return codeableConcept.text;

        const display = CodeableConceptMapper.findDisplay(codeableConcept, systems);
        if (display)
            return display;

        return CodeableConceptMapper.findCodingText(codeableConcept, systems);
    }

    static findCodingText(codeableConcept, systems) {
        var codings = CodeableConceptMapper.findCodingMatchingSystems(codeableConcept, systems);
        if (codings.length === 0) {
            codings = CodeableConceptMapper.findUserSelectedCoding(codeableConcept);
            if (codings.length === 0) {
                codings = CodeableConceptMapper.findCoding(codeableConcept);
                if (codings.length === 0) {
                    return null;
                }
            }
        }
        return codings.map(coding => coding.code + '|' + coding.system)[0];
    }

    static findDisplay(codeableConcept, systems) {
        var codings = CodeableConceptMapper.findCodingWithDisplayMatchingSystem(codeableConcept, systems);

        if (codings.length === 0) {
            codings = CodeableConceptMapper.findUserSelectedCodingWithDisplay(codeableConcept);
            if (codings.length === 0) {
                codings = CodeableConceptMapper.findCodingWithDisplay(codeableConcept);
                if (codings.length === 0) {
                    return null;
                }
            }
        }
        return codings.map(coding => coding.display)[0];
    }

    static findCodingMatchingSystems(codeableConcept, systems) {
        if (!systems || systems.length === 0)
            return [];

        for (var i = 0; i < systems.length; ++i) {
            const codings = CodeableConceptMapper.findCodingsMatchingSystem(codeableConcept, systems[i]);
            if (codings.length > 0)
                return codings;
        }
        return [];
    }

    static findCoding(codeableConcept) {
        return codeableConcept.coding
            .filter(coding => (coding.code && coding.code.length !== 0))
    }

    static findCodingWithDisplayMatchingSystem(codeableConcept, systems) {
        if (!systems || systems.length === 0)
            return [];

        for (var i = 0; i < systems.length; ++i) {
            const codings = CodeableConceptMapper.findCodingsWithDisplayMatchingSystem(codeableConcept, systems[i]);
            if (codings.length > 0)
                return codings;
        }
        return [];
    }

    static findCodingWithDisplay(codeableConcept) {
        return codeableConcept.coding
            .filter(coding => (coding.display && coding.display.length !== 0))
    }

    static findCodingsWithDisplayMatchingSystem(codeableConcept, system) {
        return codeableConcept.coding
            .filter(coding => coding.system === system)
            .filter(coding => (coding.display && coding.display.length !== 0));
    }

    static findCodingsMatchingSystem(codeableConcept, system) {
        return codeableConcept.coding
            .filter(coding => coding.system === system)
            .filter(coding => (coding.code && coding.code.length !== 0));
    }

    static findUserSelectedCodingWithDisplay(codeableConcept) {
        return codeableConcept.coding
            .filter(coding => (coding.userSelected && coding.userSelected === "true"))
            .filter(coding => (coding.display && coding.display.length !== 0));
    }

    static findUserSelectedCoding(codeableConcept) {
        return codeableConcept.coding
            .filter(coding => (coding.userSelected && coding.userSelected === "true"))
            .filter(coding => (coding.code && coding.code.length !== 0));
    }
}

module.exports = CodeableConceptMapper;