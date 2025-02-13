import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useJwtStore = create((set) => ({
    jwt: '',
    decodedJwt: {},

    setJwt: (token) => {
        try {
            //jwt.verify(token, 'secretToken');
            const decoded = jwtDecode(token);
            // console.log('JWT Decoded:', decoded);
            set({ jwt: token });
            set({ decodedJwt: decoded });
        } catch (error) {
            console.error('JWT is invalid', error);
            console.error('Failed to decode JWT:', error.message);
            console.error('Token:', token);
            set({ jwt: '' });
        }
    },

    removeJwt: () => set({ jwt: '' }),

    getJwt: () => {
        return 'Bearer ' + useJwtStore.getState().jwt;
    }
}));

export default useJwtStore;
