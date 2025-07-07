import httpInstance from "../../shared/services/http.instance.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return httpInstance.post(
            import.meta.env.VITE_AUTHENTICATION_SIGNIN_ENDPOINT_PATH,
            {
                dni: signInRequest.dni,
                password: signInRequest.password
            }
        );
    }
}

