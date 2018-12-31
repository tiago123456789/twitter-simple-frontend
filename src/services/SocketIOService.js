import io from "socket.io-client";
import App from "../config/App";

export default class SocketIOService {

    constructor() {
        this._socket = null;
        this._subscribesToEvents = {};
        this._initialize();
    }

    _initialize() {
        this._socket = io(App.URL_CONNECTION_SOCKET);
    }

    _processActionsSubscribeOnEvents(event, data) {
        (this._subscribesToEvents[event] || []).map(action => action(data));
    }

    listenEvents() {
        this._socket.on("tweet", (data) => this._processActionsSubscribeOnEvents("tweet", data));
        this._socket.on("liked-tweet", (data) => this._processActionsSubscribeOnEvents("liked-tweet", data));
     }

    subscribe(event, actions = []) {
        this._subscribesToEvents[event] = actions;
    }
}