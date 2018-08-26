
import React, { Component } from 'react'
import './index.scss'
import connect from '../../modules/connect'


class WorkOverTime extends Component {

    componentWillMount(){
        // if (this.props.commons.user_state.level < 9){
        //     alert('没有权限')
        //     this.props.history.go(-1)
        // }
        console.log(this.state)
    }
    
    render () {
        return (
            <div className = "app-work-over-time">
                Hello ,this is WorkOverTime!
         
            </div>
        )
    }

}

export default connect(WorkOverTime)