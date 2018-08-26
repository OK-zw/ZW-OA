import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import connect from './modules/connect'
import SpinLogin from './components/SpinLoading'


class App extends Component {


  state = {
    isLogin: false
  }

  componentWillReceiveProps(props){
    console.log(this.props)

    let { pathname } = props.location
    if(pathname !== this.props.location.pathname){ // 如果去的地方不是
      this.checkLogin(props)
    }


    // 全局管理权限
    if (pathname !== this.props.location.pathname && (pathname === '/attend/leave-work' || pathname === '/attend/mine')){

      if(this.props.commons.user_state.level < 8 ){
        alert('没有权限')
        this.props.history.go(-1)
      }
    }
  }

  componentWillMount(){
      this.props.commons_actions.get_initial_user_state(() => { //保存在sessionStorage中的user_state不存在，再进行判断，存在就不用判断了

        this.checkLogin(this.props) // 进入某个路由的时候判断是否登入

      })

      
      this.bus.on('change-loading', (bool) => {
        this.setState({isLogin: bool})
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
