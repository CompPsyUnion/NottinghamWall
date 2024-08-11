// src/store/token.js
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
    state: () => ({
        token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
    }),
    actions: {
        setToken(token) {
            this.token = token;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('token', token);
            }
        },
        clearToken() {
            this.token = null;
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('token');
            }
        }
    }
});
