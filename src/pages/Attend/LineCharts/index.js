
import React, { Component } from 'react'
import './index.scss'
import echarts from 'echarts'
import { Button } from 'antd'

let option = {
    title: {
        text: '',
        textStyle: { fontSize: 14 }
    }, 
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['上班时间','下班时间']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: []
}

class LineChart extends Component {
    constructor (props) {
        super(props);
        // this.changeWeek = this.changeWeek.bind(this)
    }
    state = {
        week: 1,
        datas:[]
    }
    
    getTimes () {//获取时间
        this.$http.ajax({
            url: '/api/GoWork.json'
        }).then( res => {
            this.setState({ datas: res })
            this.handleData(res)
        })
    }

    handleData (datas, week) {
        if ( !week ) week = this.state.week
        //对应的周数的数据
        let data = datas.filter(item => item.week === week)[0]

        option.title.text = '个人考勤情况(第'+week+'周)'
        option.series = [{
            name:'上班时间',
            type:'line',
            data:data.times.morning
        },{
            name:'下班时间',
            type:'line',
            data:data.times.evening
        }]

        this.chart.setOption(option, true)

    }

    changeWeek (num) {
        let { week } = this.state
        week += num;
        if ( week >= 4 ) week = 4;
        if ( week <= 1 ) week = 1;
        this.setState({ week })
    }

    shouldComponentUpdate (props, state) {
        if ( state.week !== this.state.week ) {
            this.handleData(this.state.datas, state.week)
        }
        return true;
    }

    render () {
        let { week } = this.state
        return (
            <div className = "line-charts">
                <div ref = {el => this.el = el} className="content"></div>
                <Button disabled = { week === 1 } onClick = { this.changeWeek.bind(this, -1) } type="primary">上一周</Button>
                <Button disabled = { week === 4 } onClick = { this.changeWeek.bind(this, 1) } type="primary">下一周</Button>
            </div>
        )
    }
    componentDidMount () {
        this.getTimes()
        this.chart = echarts.init(this.el)
        
    }

}

export default LineChart