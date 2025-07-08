import { useAuthenticationStore } from "./authentication.store.js";

export const authenticationInterceptor = (config) => {
    const authenticationStore = useAuthenticationStore();
    if (authenticationStore.isSignedIn) {
        config.headers.Authorization = `Bearer ${authenticationStore.currentToken}`;
    }
    return config;
};