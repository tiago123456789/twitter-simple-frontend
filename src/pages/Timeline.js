import React, { Component } from "react";

import App from "../config/App";
import TweetService from "../services/TweetService";
import Tweet from "../components/Tweet";
import logo from "../twitter.svg";
import "./Timeline.css"
import SocketIOService from "../services/SocketIOService";


export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            content: ""
        };
        this._socketIOService = new SocketIOService();
        this._tweetService = new TweetService();
        this._socketIOService.subscribe("tweet", [this.addNewTweetTimeline]);
        this._socketIOService.subscribe("liked-tweet", [this.incrementLikeTweet]);
        this._socketIOService.listenEvents();
    }

    incrementLikeTweet = (data) => {
        const tweetsWithTweetLikeIncremented = this.state.tweets.map(tweet => {
            if (tweet._id == data._id) tweet.likes += 1;
            return tweet;
        });

        this.setState({ tweets: [...tweetsWithTweetLikeIncremented] });
    }

    addNewTweetTimeline = (data) => {
        this.setState({ tweets: [ data, ...this.state.tweets ] });
    }

    handlerInputForm = (event) => {
        const valueTyping = event.target.value;
        this.setState({ content: valueTyping });
    }

    submitTweet = (event) => {
        const keyCodeEnter = 13;
        if (event.keyCode !== keyCodeEnter) {
            return;
        }

        const author = localStorage.getItem(App.LOCALSTORAGE_KEY_USERNAME);
        const newTweet = {
            content: this.state.content,
            author
        };
        this._tweetService.create(newTweet);
        this.setState({ content: "" })
    }

    async componentDidMount() {
        const tweets = await this._tweetService.findAll();
        this.setState({ tweets });
    }

    buildTweets = () => {
        return this.state.tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)
    }

    render() {
        return (
            <div className="timeline-wrapper" >
                <img src={logo} alt="Logo twitter simple" />
                <form>
                    <textarea
                        onChange={this.handlerInputForm}
                        onKeyDown={this.submitTweet}
                        value={this.state.content} placeholder="O que você está pensando?" />
                </form>
                <ul className="tweet-list" >
                    {this.buildTweets()}
                </ul>
            </div>
        );
    }
}