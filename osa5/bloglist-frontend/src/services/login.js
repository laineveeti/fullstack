import axios from 'axios';
import serviceUtils from './utils';

const baseUrl = '/api/login';

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials);
        return response.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }

};

export default login;