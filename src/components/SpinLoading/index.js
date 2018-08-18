import React, { Component } from 'react'
import { Spin, Icon, Alert } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class SpinLogin extends Component{


    render(){

        let { loading } = this.props

        return (
            <div className = 'spin-login' style = {{display: loading? 'block':'none'}} >

                <Spin tip = '加载中...' indicator={antIcon}   spinning={ loading } />

            </div>
        )
    }
}

export default SpinLogin