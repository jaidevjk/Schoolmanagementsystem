// API utility for making authenticated requests
const API_BASE_URL = "http://localhost:4003";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
};

// Generic fetch wrapper
export const apiCall = async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...getHeaders(),
            ...options.headers
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `API error: ${response.status}`);
    }

    return response.json();
};

// GET request
export const apiGet = (url) => {
    return apiCall(url, { method: "GET" });
};

// POST request
export const apiPost = (url, body) => {
    return apiCall(url, {
        method: "POST",
        body: JSON.stringify(body)
    });
};

// PUT request
export const apiPut = (url, body) => {
    return apiCall(url, {
        method: "PUT",
        body: JSON.stringify(body)
    });
};

// DELETE request
export const apiDelete = (url) => {
    return apiCall(url, { method: "DELETE" });
};

export default apiCall;
