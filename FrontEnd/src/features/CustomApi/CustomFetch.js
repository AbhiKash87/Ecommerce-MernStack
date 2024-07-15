const customFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: token,
        };
    }

    const apiEndPoint = '';
    const response = await fetch(apiEndPoint + url, options);

    if (response.status === 401) {
        console.log("error: 401");
        window.localStorage.clear();
        window.location.href = './';
        throw new Error('Unauthorized access. Please log in.');
    }
    return response;
};

const authFetch = async (url, options = {}) => {
    const apiEndPoint = '';
    const response = await fetch(apiEndPoint + url, options);

    return response;
};

// Named exports
export { customFetch, authFetch };
