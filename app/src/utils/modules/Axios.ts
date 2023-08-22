import {DEBUG, API_URL} from '@env';
import axios from "axios";
import FormData from 'form-data';

export default class Axios {
    private static localApiUrl: string = "http://10.0.2.2:8000";

    static async get(endpoint: string) {
        const debug = DEBUG === 'true';
        if (debug)
            return await axios.get(`${this.localApiUrl}/api${endpoint}`);
        else
            return await axios.get(`${API_URL}/api${endpoint}`);
    }

    static async patch(endpoint: string) {
        const debug = DEBUG === 'true';
        if (debug)
            return await axios.patch(`${this.localApiUrl}/api${endpoint}`);
        else
            return await axios.patch(`${API_URL}/api${endpoint}`);
    }

    static async post(endpoint: string, data: FormData | undefined = undefined) {
        const debug = DEBUG === 'true';
        const config = data ? {headers: data.getHeaders ? data.getHeaders() : {'Content-Type': 'multipart/form-data'}} : undefined;
        if (debug)
            return await axios.post(`${this.localApiUrl}/api${endpoint}`, data, config);
        else
            return await axios.post(`${API_URL}/api${endpoint}`, data, config);
    }
}
