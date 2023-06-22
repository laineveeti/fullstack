const handleAxiosError = (error) => {
    console.log(`Server error response: ${error.response.data.error}`);
    throw error.response.data.error;
};

export default { handleAxiosError };