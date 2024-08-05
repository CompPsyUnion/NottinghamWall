import { defineStore } from 'pinia';

export const useTokenStore = defineStore({
    id: 'token',
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
            localStorage.setItem('token', newToken);
        },
        removeToken() {
            this.token = '';
            localStorage.removeItem('token');
        }
    },
    persist: true
});
