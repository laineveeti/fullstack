import axios from 'axios';
import serviceUtils from './utils';

const baseUrl = '/api/login';

const login = async (credentials) => {
    try {
        const user = await axios.post(baseUrl, credentials);
        return user.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }

};

export default login;