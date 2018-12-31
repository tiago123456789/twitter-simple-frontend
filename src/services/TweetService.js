import HttpClientService from "./HttpClientService";

export default class TweetService {
    
    constructor() {
        this._httpClientService = new HttpClientService();
    }

    async findAll() {
        return await this._httpClientService.get("/");
    }

    async create(newData) {
        return await this._httpClientService.post("/", newData);
    }

    async likedTweet(id) {
        return await this._httpClientService.put(`/${id}/like`);
    }
}