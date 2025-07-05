import httpInstance from "../../shared/services/http.instance.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return httpInstance.get(import.meta.env.VITE_USER_ENDPOINT_PATH, {
            params: { dni: signInRequest.dni, password: signInRequest.password }
        });
    }
}