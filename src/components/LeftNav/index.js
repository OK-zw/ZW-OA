import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class LeftNav extends Component {

    constructor(props){
        super(props)

        this.state = {
            openKeys: [this.getOpenKey()]
        }

        this.renderMenu = this.renderMenu.bind(this)
        this.getOpenKey = this.getOpenKey.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleTitleClick = this.handleTitleClick.bind(this)
    }

    renderMenu(){
        let { menu_state } = this.props
        if(!menu_state) return ""
        return <Menu onClick={this.handleMenuClick} theme="dark" openKeys={this.state.openKeys} selectedKeys={[this.props.location.pathname]} mode="inline">
                    { menu_state.map(item => { // 循环一级路由
                        if(item.children && item.children.length){
                            return (
                                <SubMenu
                                onTitleClick = { this.handleTitleClick }
                                key={ item.path }
                                title={<span><Icon type="user" /><span>{ item.title }</span></span>}
                                >

                                {item.children.map(m => {  // 循环二级路由
                                    return (
                                        <Menu.Item key={ m.path }>{ m.title }</Menu.Item>
                                    )
                                })}
                                </SubMenu>
                            )
                        }
                        return  (<Menu.Item key= {item.path}>
                                    <Icon type="pie-chart" />
                                    <span>{ item.title }</span>
                                </Menu.Item>)
                    }) }
                </Menu>
    }


    handleMenuClick ({ item, key, keyPath }) {
        this.props.history.push(key)
    }

    handleTitleClick ({key}) {
      
        this.setState({ openKeys: [key] })
    }
 

    getOpenKey () { 
        let { pathname } = this.props.location
        let { menu_state } = this.props
        if (!menu_state) return ''
        for (let i = 0; i < menu_state.length; i++) {
            
            if(menu_state[i].children){
                for (let j = 0; j < menu_state[i].children.length; j++) {
               
                    if(menu_state[i].children[j].path === pathname){ // 找到二级路由
                       
                        return menu_state[i].path //一级路由
                    }
            }
        }
    }
}
     


    render(){
      
        return (
            <div className="left-nav">
                    
                { this.renderMenu() }

            </div>
        )
    }
}


export default withRouter(LeftNav)