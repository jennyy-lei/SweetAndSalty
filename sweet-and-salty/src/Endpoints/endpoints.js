import axios from "axios";

export const httpGet = (endPoint) => {

    return axios
        .get(endPoint, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .catch((error) => {
            throw error;
        });
};

export const httpPost = (endPoint, body) => {

    return new Promise((resolve, reject) => {
        axios
            .post(endPoint, body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const httpPut = (endPoint, body) => {

    return new Promise((resolve, reject) => {
        axios
            .put(endPoint, body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
