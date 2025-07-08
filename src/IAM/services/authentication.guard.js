import { useAuthenticationStore } from "./authentication.store.js";

export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = ['/login'];
    const routeRequiresAuth = !publicRoutes.includes(to.path);
    if (isAnonymous && routeRequiresAuth) {
        next({ name: 'sign-in' });
    } else {
        next();
    }
};