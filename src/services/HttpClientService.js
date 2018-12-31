import axios from "axios";
import App from "../config/App";

export default class HttpClientService {

    async get(pathname) {
        return await axios
                        .get(`${App.BASE_URL_API}${pathname}`)
                        .then(this._extractDataInResponse);
    }

    async post(pathname, newData) {
        return await axios
                        .post(`${App.BASE_URL_API}${pathname}`, newData)
                        .then(this._extractDataInResponse);
    }

    async put(pathname, dataModified) {
        return await axios
                        .put(`${App.BASE_URL_API}${pathname}`, dataModified)
                        .then(this._extractDataInResponse);
    }

    _extractDataInResponse(response) {
        if (response.data) {
            return response.data;
        }

        return response;
    }
}