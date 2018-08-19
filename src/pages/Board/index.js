
import React, { Component } from 'react'
import './index.scss'


class Board extends Component {

    componentWillMount(){

        console.log(this.state)
    }
    
    render () {
        return (
            <div className = "app-board">
                Hello ,this is Board!
         
            </div>
        )
    }

}

export default Board