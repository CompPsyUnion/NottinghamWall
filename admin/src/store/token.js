import { defineStore } from 'pinia';

export const useTokenStore = defineStore({
    id: 'token',
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        removeToken() {
            this.token = '';
            localStorage.removeItem('token');
        }
    },
    persist: true
});
