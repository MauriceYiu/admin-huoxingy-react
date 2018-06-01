/* eslint-disable */
import React, { Component } from 'react';
import './employee.scss';
import { Menu, Dropdown, Button, Icon, Table, Modal } from 'antd';
import { getEmployeeList } from './../../../../api/employee';
import { norCodeImg } from './../../../../static/js/normalImg';
import CropImg from './../../../../components/cropImg/CropImg';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            nowMenuClick: 'on',
            empListRefHei: 0,
            showMask: false,
            showBossCode: false,
            showSureCode: false,
            wcCodeImg: norCodeImg,
            aliCodeImg: norCodeImg,
            showCrop:false,
            imgBase:'',
            cropImgWidth:600,
            cropImgHeight:600
        };
        this.editEmp = this.editEmp.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.doShowSureCodeByOk = this.doShowSureCodeByOk.bind(this);
        this.upImg = this.upImg.bind(this);
    }
    render() {
        const nowMenuClick = this.state.nowMenuClick;

        const columns = [{
            title: '工号',
            dataIndex: 'code',
            width: '5%'
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: '10%'
        }, {
            title: '电话',
            dataIndex: 'mobile',
            width: '15%'
        }, {
            title: '岗位',
            dataIndex: 'groupName',
            width: '10%'
        }, {
            title: '销售目标',
            dataIndex: 'target',
            width: '10%'
        }, {
            title: '微信收款码',
            dataIndex: 'wechatPayUrl',
            width: '10%',
            align: 'center',
            render: text => text ? <span className="have-url">{'已设置'}</span> : <span className="no-have-url">{'未设置'}</span>
        }, {
            title: '支付宝收款码',
            dataIndex: 'aliPayUrl',
            width: '10%',
            align: 'center',
            render: text => text ? <span className="have-url">{'已设置'}</span> : <span className="no-have-url">{'未设置'}</span>
        }, {
            title: '状态',
            dataIndex: 'enabled',
            width: '10%',
            render: text => text ? <span className="have-url">{'已启用'}</span> : <span className="no-have-url">{'未启用'}</span>
        }, {
            title: '操作',
            width: '20%',
            render: (item, record) => (
                <span className="edit-emp">
                    <span>禁用</span>
                    <span className="ant-dropdown-link" onClick={() => this.editEmp(item)}>
                        <Icon type="edit" />修改
                    </span>
                </span>
            ),
        }];
        const data = this.state.employeeList;
        const empListRefHei = this.state.empListRefHei;
        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[nowMenuClick]}>
                <Menu.Item key="on">启用</Menu.Item>
                <Menu.Item key="disable">禁用</Menu.Item>
            </Menu>
        );
        const { wcCodeImg, aliCodeImg ,showCrop,imgBase,cropImgWidth,cropImgHeight} = this.state;
        return (
            <div id="employee">
                <div className="employee-state">
                    <span className="state">员工状态:</span>
                    <span className="employee-state-menu">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ marginLeft: 8 }} >
                                {nowMenuClick === 'on' ? '启用' : '禁用'} <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </span>
                    <span className="boss-payCode" onClick={() => this.setState({ showMask: true, showBossCode: true })}><Icon type="plus" />老板收款码</span>
                    <span className="boss-getCode" onClick={() => this.setState({ showSureCode: true })}>获取验证码</span>
                    <div className="add-emp right">
                        <span>员工默认密码为：123456，请尽快修改</span>
                        <span className="add-btn"><Icon type="plus" />添加员工</span>
                    </div>
                </div>
                <div className="employee-list" ref={(e) => this.empListRef = e}>
                    <Table scroll={{ y: empListRefHei }} pagination={false} rowKey='code' columns={columns} dataSource={data} />
                </div>
                <div className="mask" id="mask" onClick={() => this.setState({ showMask: false, showBossCode: false })} style={this.state.showMask ? { display: 'inherit' } : { display: 'none' }}>
                    <div className="boss-code fadeIn" style={this.state.showBossCode ? { display: 'inherit' } : { display: 'none' }} onClick={(e) => { e.stopPropagation() }}>
                        <div className="mask-tit">
                            <span className="tit-name">添加老板收款码</span>
                            <span className="tit-close right" onClick={() => this.setState({ showMask: false, showBossCode: false })}>X</span>
                        </div>
                        <div className="code">
                            <span className="code-tit left">收款码</span>
                            <div className="wechat-code left">
                                <div className="now-sel-img left">
                                    <img className="nowImg" src={wcCodeImg} alt="" />
                                </div>
                                <div className="upload-img left">
                                    <span className="cam-icon">
                                        <Icon type="camera-o" />
                                    </span>
                                    <input type="file" ref={(e) => this.wechatImgRef = e} onChange={() => this.upImg(this.wechatImgRef, 'wechat')} name="wechatCode" id="wechat-code" />
                                </div>
                                <div className="code-name">微信</div>
                            </div>
                            <div className="ali-code left">
                                <div className="now-sel-img left">
                                    <img className="nowImg" src={aliCodeImg} alt="" />
                                </div>
                                <div className="upload-img left">
                                    <span className="cam-icon">
                                        <Icon type="camera-o" />
                                    </span>
                                    <input type="file" name="aliCode" id="ali-code" ref={(e) => this.aliImgRef = e} onChange={() => this.upImg(this.aliImgRef, 'ali')} />
                                </div>
                                <div className="code-name">支付宝</div>
                            </div>
                        </div>
                        <div className="mask-btn">
                            <button className="cancel" onClick={() => this.setState({ showMask: false, showBossCode: false })}>取消</button>
                            <button className="save">保存</button>
                        </div>
                    </div>
                </div>
                <div id="modal-mask">
                    <div className="get-sure-code" >
                        <Modal
                            title="验证码"
                            visible={this.state.showSureCode}
                            onOk={this.doShowSureCodeByOk}
                            onCancel={() => this.setState({ showSureCode: false })}
                            getContainer={() => document.getElementById('modal-mask')}
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
                {
                    showCrop?(<CropImg cropImgWidth={cropImgWidth} cropImgHeight={cropImgHeight} imgBase={imgBase}/>):('')
                }
            </div>
        );
    }
    async componentDidMount() {
        this.initEmpList(true);
        let empListRefHei = this.empListRef.clientHeight;
        this.setState({
            empListRefHei
        });
    }
    doShowSureCodeByOk() {
        this.setState({
            showSureCode: false
        });
    }
    upImg(e, codeType) {
        let file = e.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let _this = this;
        if (codeType === 'ali') {
            reader.onload = function (e) {
                //显示文件
                _this.setState({
                    showCrop:true,
                    imgBase:this.result
                });
            }
        } else {
            reader.onload = function (e) {
                //显示文件
                _this.setState({
                    wcCodeImg: this.result
                });
            }
        }
    }
    editEmp(item) {
        console.log(item);
    }
    handleMenuClick({ key }) {
        if (key === 'on') {
            this.initEmpList(true);
            this.setState({
                nowMenuClick: key
            });
        } else {
            this.initEmpList(false);
            this.setState({
                nowMenuClick: key
            });
        }
    }
    async initEmpList(enable) {
        const storeId = localStorage.getItem('storeId');
        let employeeList;
        if (!enable) {
            try {
                employeeList = await getEmployeeList(storeId, enable);
                this.setState({
                    employeeList
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                employeeList = await getEmployeeList(storeId);
                this.setState({
                    employeeList
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default Employee;