// store/userStore.js
import { defineStore } from 'pinia';

export const useAdminStore = defineStore( {
    id: 'admin',
    state: () => ({
        admin: localStorage.getItem('admin') || ''
    }),
    actions: {
        setAdminname(newAdmin) {
            this.admin = newAdmin;
            localStorage.setItem('admin', newAdmin);
        },
        clearAdmin() {
            this.admin = '';
            localStorage.removeItem('admin');
        }
    },
    persist: true // 启用持久化
});
