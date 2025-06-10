/**
 * @description Function to validate if a value is numeric.
 * This function checks if the provided value is a number or a string that represents a numeric value.
 * @param value
 * @returns {boolean}
 * @author Julca Minaya Sergio Gino, u202318274
 */
export function isNumeric(value) {
    const stringValue = String(value);
    return /^\d+$/.test(stringValue);
}

/**
 * @description Function to validate if a value is a string.
 * This function checks if the provided value is of type string.
 * @param value
 * @returns {boolean}
 * @author Julca Minaya Sergio Gino, u202318274
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * @description Function to validate if a value is a valid email address.
 * This function uses a simple regular expression to check if the provided value matches the email format.
 * @param value
 * @returns {boolean}
 * @author Julca Minaya Sergio Gino, u202318274
 */
export function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isString(value) && emailRegex.test(value);
}

