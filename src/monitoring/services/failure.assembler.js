import {Failure} from "../model/failure.entity.js";

/**
 * @class FailureAssembler
 * @summary Assembles Failure entities from various data sources.
 * @author Julca Minaya Sergio Gino, u202318274
 */
export class FailureAssembler{
    /**
     * Converts a raw resource object into a Failure entity.
     * @param {Object} resource - The raw resource object containing failure data.
     * @return {Failure} - An instance of the Failure entity.
     */
    static toEntityFromResource(resource) {
        return new Failure({
            id: resource.id ?? Date.now(),
            simpleName: resource.simpleName,
            technicalCode: resource.technicalCode,
            description: resource.description,
            severityLevel: resource.severityLevel,
            emoji: resource.emoji,
            badPractice: resource.badPractice,
            suggestSolution: resource.suggestSolution
        });
    }

    /**
     * Converts an array of raw resource objects into an array of Failure entities.
     * Useful for loading from local storage.
     * @param {Array<object>} resources - An array of raw data objects.
     * @returns {Array<Failure>} An array of Failure entity instances.
     */
    static toEntitiesFromResources(resources) {
        if (!Array.isArray(resources)) {
            console.error("FailureAssembler.toEntitiesFromResources expects an array.");
            return [];
        }
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}