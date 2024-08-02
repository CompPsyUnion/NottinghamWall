import { defineStore } from "pinia";

export const useTokenStore = defineStore({
    id: 'token',
    state: () => ({
        token: ''
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
        removeToken() {
            this.token = '';
        }
    },
    persist: true
});
