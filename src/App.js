import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import connect from './modules/connect'
import SpinLogin from './components/SpinLoading'


class App extends Component {


  state = {
    isLogin: false
  }

  componentWillReceiveProps(props){
    // console.log(this.props.commons.user_state)

    let { pathname } = props.location
    if(pathname !== this.props.location.pathname){ // 如果去的地方不是
      this.checkLogin(props)
    }
  }

  componentWillMount(){
    // console.log(this.props.commons.user_state)

      this.checkLogin(this.props)
      this.bus.on('change-loading', () => {
        this.setState({isLogin: !this.state.isLogin})
      })
  }

  checkLogin (props) {
    let { commons, history } = this.props
    if(props.location.pathname !== '/login'){ // 如果没在登入页面
      if(!commons.user_state){  // 如果登入状态没有
          history.replace('/login')
      }
    }
  }




  render() {
    let { isLogin } = this.state
    return (
      <div className="App">
          { this.props.children }

          <SpinLogin loading = { isLogin } />
      </div>
    );
  }
}

export default withRouter(connect(App, 'commons'));
