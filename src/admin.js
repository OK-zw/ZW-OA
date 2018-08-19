import React from 'react'

import { Layout } from 'antd';

import LeftNav from './components/LeftNav'
import BreadCrunb from './components/BreadCrunb'
import connect from './modules/connect'

const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component {
  state = {
    collapsed: false,
  };


  componentDidMount(){  // 获取左边NAV的数据
    if(!this.props.commons.menu_state){
      this.props.commons_actions.get_menu_config()
    }
  }



  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"></div>
          <LeftNav menu_state = { this.props.commons.menu_state } />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
           
            <BreadCrunb menu_state = { this.props.commons.menu_state } />   {/* 面包屑导航 */} 
           
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                { this.props.children }   {/* 组件切换的位置 */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(Admin, 'commons')