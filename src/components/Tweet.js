import React, { Component } from "react";
import likeLogo from "../like.svg"
import "./Tweet.css"
import TweetService from "../services/TweetService";

export default class Tweet extends Component {

    constructor(props) {
        super(props);
        this._tweetService = new TweetService();
    }

    likedTweet = async (id) => {
        await this._tweetService.likedTweet(id);
    }

    render() {
        const { tweet } = this.props;
        return (
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>
                    {tweet.content}
                </p>
                <button onClick={() => this.likedTweet(tweet._id)}>
                    <img height={23} src={likeLogo} alt="like"/> {tweet.likes}
                </button>
            </li>
        )
    }
}