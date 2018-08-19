import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'

class BreadCrunb extends Component {
    constructor(props){
        super(props)

        this.renderItems = this.renderItems.bind(this)
    }

    renderItems () {
        let { pathname } = this.props.location //url中的路由 （/board, /, attend, /attend/mine）
        let { menu_state } = this.props  
        
        if(!menu_state) return ""

        let items = [(
            <Breadcrumb.Item key={'/'}>
                    <Link to={'/'}> 后台首页 </Link>
            </Breadcrumb.Item>
        )]

        if(pathname !== '/'){
            pathname = pathname.substr(1)
            let arr = pathname.split('/')

            // 'attend' 'attend/mine' 'board'
            arr.forEach((item, i) => {
                                        //[attend, mine]
                let path = i > 0 ? `/${ arr[i-1] }/${ item }` : `/${ item }`

                items.push(
          
                    <Breadcrumb.Item key={ path }>

                            { i > 0 ? <Link to={ path }> { item } </Link> : item }

                    </Breadcrumb.Item>
                )
            });
        }


        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                { items }
            </Breadcrumb>
        )

    }

    render () {
        {this.renderItems()}
        console.log(this.props.menu_state)
        return (
            <div className="bread-crunb">
                 { this.renderItems() }
            </div>
        )
    }
}


export default withRouter(BreadCrunb)