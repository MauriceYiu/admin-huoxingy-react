/* eslint-disable */
import React, { Component } from 'react';
import './achievement.scss';
import { Menu, Dropdown, Button, Icon, Table, Modal, Select, DatePicker } from 'antd';
import { getEmployeeGrade } from './../../../../api/employee';
import { norCodeImg } from './../../../../static/js/normalImg';
import CropImg from './../../../../components/cropImg/CropImg';
import moment from 'moment';

const { MonthPicker } = DatePicker;

class Achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeGradeList: [],//员工列表信息
            nowMonth:'',
            empListRefHei:0
        };
    }
    render() {
        const Option = Select.Option;
        const columns = [{
            title: '工号',
            dataIndex: 'employeeCode',
            width: '5%'
        }, {
            title: '姓名',
            dataIndex: 'employeeName',
            width: '10%'
        }, {
            title: '岗位',
            dataIndex: 'groupName',
            width: '15%'
        }, {
            title: '总订单量',
            dataIndex: 'orderCount',
            width: '10%'
        }, {
            title: '销售目标',
            dataIndex: 'target',
            width: '10%'
        }, {
            title: '总营业额',
            dataIndex: 'totalAmount',
            width: '10%',
            align: 'center',
            render: text => <span className="have-url">{text.toFixed(2)}</span>
        }, {
            title: '推荐会员数',
            dataIndex: 'addMemberNumber',
            width: '10%',
            align: 'center'
        }, {
            title: '提成金额',
            dataIndex: 'totalCommission',
            width: '10%'
        }];
        const data = this.state.employeeGradeList;
        const {nowMonth} = this.state;
        const empListRefHei = this.state.empListRefHei;
        const onChangeMonth = (date, dateString) => {
            this.setState({
                nowMonth:dateString
            });
            console.log(date, dateString);
        }
        const monthFormat = 'YYYY-MM';
        return (
            <div id="achievement">
                <div className="achievement-state">
                    <div className="add-emp right">
                        <MonthPicker onChange={onChangeMonth} value={moment(nowMonth, monthFormat)}  placeholder="Select month" />
                    </div>
                </div>
                <div className="achievement-list" ref={(e) => this.empListRef = e}>
                    <Table scroll={{ y: empListRefHei }} pagination={false} rowKey='employeeCode' columns={columns} dataSource={data} />
                </div>

                <div id="modal-mask">
                    <div className="get-sure-code" id="get-sure-code" >
                        <Modal
                            title="验证码"
                            visible={this.state.showSureCode}
                            onOk={() => this.setState({
                                showSureCode: false
                            })}
                            onCancel={() => this.setState({ showSureCode: false })}
                            getContainer={() => document.getElementById('get-sure-code')}
                        >
                            <div className="sure-code">
                                <p className="sure-code-info">验证成功后5分钟内有效,请及时操作</p>
                                <div className="code-inp">
                                    <input type="text" placeholder={"请输入验证码..."} />
                                    <span className="get-sure-code">获取验证码</span>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        this.initEmpGradeList();
        let empListRefHei = this.empListRef.clientHeight;
        this.setState({
            empListRefHei
        });
    }
    async initEmpGradeList() {
        const storeId = localStorage.getItem('storeId');
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        this.setState({
            nowMonth:`${year}-${month}`
        });
        let employeeGradeList;
        try {
            employeeGradeList = await getEmployeeGrade(storeId, year, month);
            this.setState({
                employeeGradeList
            });
        } catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default Achievement;