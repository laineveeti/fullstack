import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons/'

const create = (object) => axios.post(baseUrl, object).then(response => response.data);

const getAll = () => axios.get(baseUrl).then(response => response.data);

const remove = (id) => axios.delete(baseUrl + id).then(response => response.data);

const update = (id, object) => axios.put(baseUrl + id, object).then(response => response.data);

export default {create, getAll, remove, update};