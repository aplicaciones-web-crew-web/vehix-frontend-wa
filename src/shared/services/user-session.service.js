/**
 * @description UserSessionService is a simple service to manage user session data.
 * It allows setting and getting the user ID, which can be useful for tracking user sessions in a web application.
 * @summary User Session Management Service
 * @type {{userId: null, setUserId(*): void, getUserId(): null}}
 * @author u202318274 Julca Minaya Sergio Gino
 */
export const UserSessionService = {
    setUserId(id) {
        sessionStorage.setItem("userId", id);
    },
    getUserId() {
        return sessionStorage.getItem("userId");
    },
    clearSession() {
        sessionStorage.removeItem("userId");
    }
};