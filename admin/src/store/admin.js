// store/userStore.js
import { defineStore } from 'pinia';

export const useAdminStore = defineStore( {
    id: 'admin',
    state: () => ({
        admin: localStorage.getItem('admin') || ''
    }),
    actions: {
        setAdmin(userName) {
            this.admin = userName;
            localStorage.setItem('admin', userName);
        },
        clearAdmin() {
            this.admin = '';
            localStorage.removeItem('admin');
        }
    },
    persist: true // 启用持久化
});
