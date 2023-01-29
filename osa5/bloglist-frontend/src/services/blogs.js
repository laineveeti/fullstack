import axios from 'axios';

let token = '';
const setToken = (userToken) => {
    token = `bearer ${userToken}`;
}
const emptyToken = () => {
    token = '';
}

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

const createNew = async (data) => {
    const config = {
        headers: { Authorization: token }
    };
    console.log(data)
    console.log(config)
    const response = await axios.post(baseUrl, data, config);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, emptyToken, createNew };