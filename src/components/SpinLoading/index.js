
import React, { Component } from 'react'
import { Spin } from 'antd';
class SpinLoaidng extends Component {

    render () {
        let { loading } = this.props
        return (
            <div style = {{ display: loading ? 'block' : 'none' }} className = "spin-loading">
                <Spin tip="请稍等..." spinning={loading}></Spin>
            </div>
        )
    }

}

export default SpinLoaidng