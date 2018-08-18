import React, { Component } from 'react'
import './index.scss'
import connect from '../../modules/connect'

class Login extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleSubmit (e) {
        e.preventDefault() // 阻止浏览器默认行为
        let username = this.username.value;
        let password = this.password.value;
        this.props.commons_actions.login({
            username,password,
            success: () => {
                this.props.history.replace('/')
            }
        })
    }



    render () {
        return (
            <div className="app-login">

                <div className="container w3layouts agileits">
                    <div className="login w3layouts agileits">
                        <h2>登 录</h2>
                        <form onSubmit = { this.handleSubmit } >
                            <input type="text" ref = { el => this.username=el }  placeholder="用户名" required="" />
                            <input type="password" ref = { el => this.password=el }  placeholder="密码" required="" />
                            <div className="send-button w3layouts agileits">
                            <input type="submit" value="登 录" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(Login, 'commons')