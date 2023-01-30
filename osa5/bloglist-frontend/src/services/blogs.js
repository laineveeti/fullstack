import axios from 'axios';
import serviceUtils from './utils';

let token = '';
const setToken = (userToken) => {
    token = `bearer ${userToken}`;
};
const emptyToken = () => {
    token = '';
};

const baseUrl = '/api/blogs';

const getAll = async () => {
    try{
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }
};

const createNew = async (data) => {
    const config = {
        headers: { Authorization: token }
    };
    try{
        const response = await axios.post(baseUrl, data, config);
        return response.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }
};

const update = async (id, data) => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.put(`${baseUrl}/${id}`, data, config);
    return response.data;
};

const like = async (id) => {
    try{
        const blog = (await axios.get(`${baseUrl}/${id}`)).data;
        ++blog.likes;
        delete blog.id;
        const updatedBlog = await update(id, blog);
        return updatedBlog;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    };
    try{
        const response = await axios.delete(`${baseUrl}/${id}`, config);
        return response.data;
    } catch (exception) {
        serviceUtils.handleAxiosError(exception);
    }
};

export default { getAll, setToken, emptyToken, createNew, like, remove };