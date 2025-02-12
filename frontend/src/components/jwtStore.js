import { create } from 'zustand';

const useJwtStore = create((set) => ({
    jwt: '',

    setJwt: (jwt) => set({ jwt }),

    removeJwt: () => set({ jwt: '' }),

    getJwt: () => {
        return 'Bearer ' + useJwtStore.getState().jwt;
    }
}));

export default useJwtStore;
