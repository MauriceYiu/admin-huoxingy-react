import React, { Component } from 'react';
import './statement.scss';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { getStoreState } from './../../../../api/statement';

class Statement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sevStateInfo: [],
            yesterdayData: {}
        }
    }
    render() {
        const { yesterdayData } = this.state;
        return (
            <div id="statement">
                <div className="yesterday-statement" ref={(e) => this.yesterdayWrap = e}>
                    <div className="state-name">昨日概况</div>
                    <div className="yesterday-statement-pie left" ref={(e) => this.yesterday = e}></div>
                    <div className="yesterday-statement-info">
                        <ul ref={(e) => this.yesterdayUl = e}>
                            <li className="info-item left">
                                <div className="item-inner">
                                    <div className="info-name">流失会员</div>
                                    <div className="info-num">{yesterdayData.lost_count}</div>
                                    <div className="info-desc">连续15天未消费</div>
                                </div>
                            </li>
                            <li className="info-item left">
                                <div className="item-inner">
                                    <div className="info-name">活跃会员</div>
                                    <div className="info-num">{yesterdayData.active_count}</div>
                                    <div className="info-desc">昨日有消费</div>
                                </div>
                            </li>
                            <li className="info-item left">
                                <div className="item-inner">
                                    <div className="info-name">新增会员</div>
                                    <div className="info-num">{yesterdayData.new_count}</div>
                                    <div className="info-desc">昨日新增</div>
                                </div>
                            </li>
                            <li className="info-item left">
                                <div className="item-inner">
                                    <div className="info-name">总会员数</div>
                                    <div className="info-num">{yesterdayData.total}</div>
                                    <div className="info-desc">包含不活跃</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="last-7days-statement">
                    <div className="state-name">近七日概况</div>
                    <div className="last-7days-statement-bar" ref={(e) => this.lastSevDays = e}></div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        // 将流失会员等li垂直居中
        this.yesterdayUl.style.paddingTop = this.yesterdayWrap.clientHeight * 0.25 + 'px';
        const storeId = this.props.match.params.storeId;
        try {
            let sevStateInfo = await getStoreState(storeId);
            this.setState({
                sevStateInfo
            });
            this.initStatement();
        } catch (error) {
            console.log(error);
        }
    }
    initStatement() {
        let yesterdayState = echarts.init(this.yesterday);
        let lastSevDaysState = echarts.init(this.lastSevDays);

        const sevStateData = this.state.sevStateInfo;

        // 获取昨日数据
        const yesterdayData = sevStateData[sevStateData.length - 1];

        this.setState({
            yesterdayData
        });

        // 遍历近七日数据生成source
        let sourceData = [];
        for (let i = 0; i < sevStateData.length; i++) {
            let obj = { date: sevStateData[i].bizdate, '流失': sevStateData[i].lost_count, '新增': sevStateData[i].new_count, '活跃': sevStateData[i].active_count };
            sourceData.push(obj);
        }

        yesterdayState.setOption({
            color: ['#ff6138', '#fdc57b', '#11cbd7'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: '2%',
                data: ['流失', '新增', '活跃']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: yesterdayData.lost_count, name: '流失' },
                        { value: yesterdayData.new_count, name: '新增' },
                        { value: yesterdayData.active_count, name: '活跃' }
                    ]
                }
            ]
        });
        lastSevDaysState.setOption({
            color: ['#ff6138', '#fdc57b', '#11cbd7'],
            legend: {
                bottom: '2%'
            },
            tooltip: {},
            dataset: {
                dimensions: ['date', '流失', '新增', '活跃'],
                source: sourceData
            },
            xAxis: { type: 'category' },
            yAxis: {},
            grid: {
                left: '5%',
                right: '3%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {
                    type: 'bar', barWidth: '10%', label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    }
                },
                {
                    type: 'bar', barWidth: '10%', label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    }
                },
                { type: 'line' },
            ]
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default Statement;