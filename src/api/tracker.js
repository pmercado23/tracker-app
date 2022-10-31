import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
    baseURL: 'https://d27a-2600-8800-223-dc00-85bc-d9ab-ef80-7bb8.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;