
import React, { Component } from 'react'
import './index.scss'


class WorkOverTime extends Component {

    componentWillMount(){

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

export default WorkOverTime