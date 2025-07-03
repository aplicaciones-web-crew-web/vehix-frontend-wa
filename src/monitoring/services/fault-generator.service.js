// src/monitoring/services/fault-generator.service.js

/**
 * @class FaultGeneratorService
 * @summary Genera reportes de fallas de auto aleatorias basadas en una lista predefinida.
 * @author Julca Minaya Sergio Gino, u202318274
 * @returns {Promise<{simpleName: string, technicalCode: string, description: string, severityLevel: string, emoji: string, badPractice: string, suggestSolution: string}>}
 */
export class FaultGeneratorService {
    static sampleFailures = [
        {
            simpleName: "Batería descargada",
            technicalCode: "ERR101",
            description: "La batería del vehículo está descargada.",
            severityLevel: "Media",
            emoji: "🔋",
            badPractice: "Dejar luces encendidas",
            suggestSolution: "Recargar o cambiar la batería"
        },
        {
            simpleName: "Fallo en frenos",
            technicalCode: "ERR102",
            description: "El sistema de frenos presenta fallas.",
            severityLevel: "Alta",
            emoji: "🛑",
            badPractice: "No revisar el líquido de frenos",
            suggestSolution: "Revisar y reparar el sistema de frenos"
        },
        // Puedes agregar más fallas aquí
    ];

    /**
     * Genera una lista de entre 5 y 10 fallas aleatorias, sin repetir.
     * @returns {Array<Object>} Lista de fallas en formato crudo
     */
    static generateRawFailures() {
        const quantityFailures = Math.floor(Math.random() * 6) + 5; // entre 5 y 10
        // Lógica para devolver fallas aleatorias, si lo necesitas
        return [];
    }
}

/**
 * Genera una falla de auto aleatoria.
 * @returns {Promise<Object>} Falla aleatoria
 */
export function generateRandomCarFailure() {
    const failures = FaultGeneratorService.sampleFailures;
    const randomIndex = Math.floor(Math.random() * failures.length);
    return Promise.resolve(failures[randomIndex]);
}