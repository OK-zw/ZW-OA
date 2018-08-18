
import React, { Component } from 'react'
import './index.scss'


class Home extends Component {

    componentWillMount(){

        console.log(this.state)
    }
    
    render () {
        return (
            <div className = "app-home">
                Hello ,this is Home!
         
            </div>
        )
    }

}

export default Home