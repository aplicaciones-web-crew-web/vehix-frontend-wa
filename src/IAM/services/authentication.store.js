import { defineStore } from "pinia";
import { AuthenticationService } from "./authentication.service.js";
import { SignInResponse } from "../model/sign-in.response.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({ signedIn: false, userId: 0, username: '' }),
    getters: {
        isSignedIn: (state) => state.signedIn,
        currentUserId: (state) => state.userId,
        currentUsername: (state) => state.username,
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router) {
            authenticationService.signIn(signInRequest)
                .then(response => {
                    const users = response.data;
                    if (Array.isArray(users) && users.length > 0) {
                        const user = users[0];
                        const signInResponse = new SignInResponse(user.id, user.name, 'token');
                        this.signedIn = true;
                        this.userId = signInResponse.id;
                        this.username = signInResponse.name;
                        localStorage.setItem('token', signInResponse.token);
                        router.push({ name: 'home' });
                    } else {
                        router.push({ name: 'sign-in' });
                    }
                })
                .catch(() => {
                    router.push({ name: 'sign-in' });
                });
        },
        signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            router.push({ name: 'sign-in' });
        }
    }
});