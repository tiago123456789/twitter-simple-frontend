import React, { Component } from "react";
import "./Login.css"
import logo from "../twitter.svg"
import App from "../config/App";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    handlerInputForm = (event) => {
        const valueTypingInput = event.target.value;
        this.setState({ username: valueTypingInput });
    }

    submit = (event) => {
        event.preventDefault();
        if (!this.state.username.length) {
            return;
        }

        localStorage.setItem(App.LOCALSTORAGE_KEY_USERNAME, this.state.username);
        this.props.history.push("/timeline");
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={logo} alt="Logo twitter simple" />
                <form onSubmit={this.submit}>
                    <input type="text" 
                        onChange={this.handlerInputForm}
                        value={this.state.value} placeholder="Digite seu nome de usuário" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}