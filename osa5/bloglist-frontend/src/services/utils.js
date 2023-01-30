const handleAxiosError = (error) => {
    console.log(error);
    throw error.response.data.error;
};

export default { handleAxiosError };