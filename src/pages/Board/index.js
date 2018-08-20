
import React, { Component } from 'react'
import './index.scss'


import { Table, Button, Divider, Select, Modal  } from 'antd';
import Search from 'antd/lib/transfer/search';

const Option = Select.Option; // 选择器


class Board extends React.Component {
  constructor(props){
    super(props)

    this.searchChange = this.searchChange.bind(this)
    this.Look = this.Look.bind(this)
    this.taggleLook = this.taggleLook.bind(this)
  }
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    modal_visible: false, // 控制弹窗状态
    LookContent: {}, // 弹窗内容
    types: [], // 分类
    columns: [{
      title: 'Title',
      dataIndex: 'title',
    }, {
      title: 'Content',
      dataIndex: 'content',
    }, {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <span>
          <a href="javascript:;"> 修改 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;"> 删除 </a>
          <Divider type="vertical" />
          <a onClick = {this.Look.bind(this, record.id)} href="javascript:;"> 查看 </a>            
        </span>
        )
      },
    }
  ]
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  

  getData (type_id = 0) { // 获取数据
        this.$http.ajax({
            url: '/api/board-'+type_id+'.json'
        }).then(res => {
            // console.log(res)
            this.setState({ data: res.boardlist.map(item => {
                item.key = item.id
                return item
            }) })
        })
    }

  getTypes () { // 获取分类
      this.$http.ajax({
        url: '/api/board-type.json'
      }).then(res => {
          this.setState({ types: res.boardlist })
      })
  }


    
  componentDidMount () {
      this.getData()
      this.getTypes()
  }


  searchChange (value) {
    this.getData(value)
  }


  taggleLook () { // 控制弹窗方法
    this.setState({ modal_visible: !this.state.modal_visible })
  }
  Look (id) {
    for (let i = 0; i < this.state.data.length; i++) {
      const item = this.state.data[i]
      if( item.id === id ){
        this.setState({ LookContent: item })
      }
    }
    this.taggleLook()
  }


  render() {
    const { loading, selectedRowKeys, data, columns, modal_visible, LookContent, types } = this.state;
    // const { columns } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    console.log(types)
    return (
      <div className="app-board">
        <div style={{ marginBottom: 16 }}>


          <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a type"
                onChange = { this.searchChange }
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option key={0} value={0}> 全部 </Option>
                { types.map(type => (<Option key={type.id} value={type.id}>{ type.title }</Option>)) }
            </Select>



          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />


        <Modal
          title= { LookContent.title }
          visible={this.state.modal_visible}
          onOk={this.taggleLook}
          onCancel={this.taggleLook}
        >
          <p> { LookContent.content } </p>
        </Modal>
      </div>
    );
  }
}




export default Board