
import React, { Component } from 'react'
import './index.scss'


class Attend extends Component {

    componentWillMount(){

        console.log(this.state)
    }
    
    render () {
        return (
            <div className = "app-attend">
                Hello ,this is Attend!
         
            </div>
        )
    }

}

export default Attend