/**
 * @class FaultGeneratorService
 * @summary Generates random car failure reports based on a predefined list of sample failures.
 * @author Julca Minaya Sergio Gino, u202318274
 * @returns {Promise<{simpleName: string, technicalCode: string, description: string, severityLevel: string, emoji: string, badPractice: string, suggestSolution: string}>}
 */
import { listFailures } from './failures.data.js'; // extrae lista si está separada

export class FaultGeneratorService {
    /**
     * Genera una lista de entre 5 y 10 fallas aleatorias, sin repetir.
     * @returns {Array<Object>} Lista de fallas en formato crudo
     */
    static generateRawFailures() {
        const quantityFailures = Math.floor(Math.random() * 6) + 5; // entre 5 y 10
        const shuffled = [...listFailures].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, quantityFailures);
    }
}


