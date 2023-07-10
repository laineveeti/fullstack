import axios from 'axios';
import serviceUtils from './utils';

const baseUrl = '/api/users';

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }
};

export default { getAll };
