
import React, { Component } from 'react'
import './index.scss'
import LineCharts from './LineCharts'


class Attend extends Component {

    componentWillMount(){

        console.log(this.state)
    }
    
    render () {
        return (
            <div className = "app-attend">
                <LineCharts/>
            </div>
        )
    }

}

export default Attend