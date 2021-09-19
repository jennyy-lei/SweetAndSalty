import axios from "axios";

const prefix = "http://localhost:5000";
export const httpGet = (endpoint) => {
    const url = prefix + endpoint;
    return axios
        .get(url, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .catch((error) => {
            throw error;
        });
};

export const httpPost = (endpoint, body) => {
    const url = prefix + endpoint;
    return new Promise((resolve, reject) => {
        axios
            .post(url, body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const httpPut = (endpoint, body) => {
    const url = prefix + endpoint;
    return new Promise((resolve, reject) => {
        axios
            .put(url, body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
