/* eslint-disable */
import React, { Component } from 'react';
import './employee.scss';
import { Menu, Dropdown, Button, Icon, Table, Modal, Select } from 'antd';
import { getEmployeeList, getShopManInfo, saveBossCode, addEmp, getJobList } from './../../../../api/employee';
import { norCodeImg } from './../../../../static/js/normalImg';
import CropImg from './../../../../components/cropImg/CropImg';
import store from './../../../../store/store';


class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],//员工列表信息
            nowMenuClick: 'on',//当前选择的是否启用员工按钮，默认调用启用的
            empListRefHei: 0,//员工列表容器高度，用于设置Table组件的滚动
            showMask: false,//是否显示mask框
            showBossCode: false,//是否显示老板收款码模态框，这里只是自己做一下，可以用antd的更加方便
            showSureCode: false,//是都显示验证码框
            wcCodeImg: norCodeImg,//老板收款码中的微信图片
            wcCodeImgForEmp: norCodeImg,//员工收款码中的微信图片
            aliCodeImg: norCodeImg,//老板收款码中的阿里图片
            aliCodeImgForEmp: norCodeImg,//员工收款码中的阿里图片
            isAddEmp: true,//当前是否是添加员工
            showCrop: false,//是否显示裁剪图片窗口
            imgBase: '',//当前选择的图片的base64码
            cropImgWidth: 600,//用于设置裁剪图片时所需canvas的高宽
            cropImgHeight: 600,
            cropImgUrl: '',//裁剪后的图片URL从CropImg组建中返回
            codeType: '',//当前所选择的老板收款码类型
            shopManInfo: {},//当班的员工信息
            showEmpAddOrEdit: false,//是否显示添加或修改员工信息弹窗,
            jobList: [],//添加员工按钮点击时先获取职位列表
            code: '',//员工编号
            mobile: '',//员工电话
            name: '',//员工姓名
            target: 0,//员工目标
            groupId: ''//员工岗位
        };
        this.editEmp = this.editEmp.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.upImg = this.upImg.bind(this);
        this.getCropImgUrl = this.getCropImgUrl.bind(this);
        this.cancelCrop = this.cancelCrop.bind(this);
        this.getNowShopManInfo = this.getNowShopManInfo.bind(this);
        this.saveBossCode = this.saveBossCode.bind(this);
        this.beforeGetJobList = this.beforeGetJobList.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }
    render() {
        const nowMenuClick = this.state.nowMenuClick;
        const Option = Select.Option;
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
        const { wcCodeImg, aliCodeImg, showCrop,
            imgBase, cropImgWidth, cropImgHeight,
            wcCodeImgForEmp, aliCodeImgForEmp,
            jobList, code, mobile, name, target, isAddEmp, groupId } = this.state;
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
                    <span className="boss-payCode" onClick={this.getNowShopManInfo}><Icon type="plus" />老板收款码</span>
                    <span className="boss-getCode" onClick={() => this.setState({ showSureCode: true })}>获取验证码</span>
                    <div className="add-emp right">
                        <span>员工默认密码为：123456，请尽快修改</span>
                        <span className="add-btn" onClick={this.beforeGetJobList}><Icon type="plus" />添加员工</span>
                    </div>
                </div>
                <div className="employee-list" ref={(e) => this.empListRef = e}>
                    <Table scroll={{ y: empListRefHei }} pagination={false} rowKey='code' columns={columns} dataSource={data} />
                </div>
                <div className="mask" id="mask" onClick={() => this.setState({ showMask: false, showBossCode: false })}
                    style={this.state.showMask ? { display: 'inherit' } : { display: 'none' }}>
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
                                    <input type="file" ref={(e) => this.wechatImgRef = e}
                                        onChange={() => this.upImg(this.wechatImgRef, 'wechat')} name="wechatCode" id="wechat-code" />
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
                                    <input type="file" name="aliCode" id="ali-code" ref={(e) => this.aliImgRef = e}
                                        onChange={() => this.upImg(this.aliImgRef, 'ali')} />
                                </div>
                                <div className="code-name">支付宝</div>
                            </div>
                        </div>
                        <div className="mask-btn">
                            <button className="cancel" onClick={() => this.setState({ showMask: false, showBossCode: false })}>取消</button>
                            <button className="save" onClick={this.saveBossCode}>保存</button>
                        </div>
                    </div>
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
                    <div className="emp-add-edit" id="emp-add-edit" >
                        <Modal
                            title={isAddEmp ? "添加员工" : "修改员工"}
                            visible={this.state.showEmpAddOrEdit}
                            onOk={this.addEmployee}
                            onCancel={() => this.setState({ showEmpAddOrEdit: false, wcCodeImgForEmp: norCodeImg, aliCodeImgForEmp: norCodeImg })}
                            getContainer={() => document.getElementById('emp-add-edit')}
                        >
                            <div className="add-edit">
                                <span className="emp-info-item">
                                    <span><b>*</b>工号</span>
                                    <input type="text" placeholder={'请输入员工工号'} value={code} onChange={(e) => this.setState({ code: e.target.value })} />
                                </span>
                                <span className="emp-info-item">
                                    <span><b>*</b>姓名</span>
                                    <input type="text" placeholder={'请输入员工姓名'} value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                                </span>
                                <span className="emp-info-item">
                                    <span><b>*</b>电话</span>
                                    <input type="text" placeholder={'请输入员工电话'} value={mobile} onChange={(e) => this.setState({ mobile: e.target.value })} />
                                </span>
                                <span className="emp-info-item" id="jobSel">
                                    <span><b>*</b>岗位</span>
                                    <Select dropdownStyle={{ zIndex: 999999999 }} value={groupId} placeholder="请选择员工岗位" style={{ width: 120 }}
                                        onChange={(val) => this.setState({ groupId: val })}>
                                        {
                                            jobList.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </span>
                                <div className="emp-info-item" style={{ width: '100%' }}>
                                    <span><b>*</b>销售目标</span>
                                    <input type="text" placeholder={'请输入员工销售目标'} value={target} onChange={(e) => this.setState({ target: e.target.value })} />
                                </div>
                                <div className="wechat-code left">
                                    <div className="now-sel-img left">
                                        <img className="nowImg" src={wcCodeImgForEmp} alt="" />
                                    </div>
                                    <div className="upload-img left">
                                        <span className="cam-icon">
                                            <Icon type="camera-o" />
                                        </span>
                                        <input type="file" ref={(e) => this.wechatImgRefForEmp = e}
                                            onChange={() => this.upImg(this.wechatImgRefForEmp, 'wechat')} name="wechatCode" id="wechat-code" />
                                    </div>
                                    <div className="code-name">微信</div>
                                </div>
                                <div className="ali-code left">
                                    <div className="now-sel-img left">
                                        <img className="nowImg" src={aliCodeImgForEmp} alt="" />
                                    </div>
                                    <div className="upload-img left">
                                        <span className="cam-icon">
                                            <Icon type="camera-o" />
                                        </span>
                                        <input type="file" name="aliCode" id="ali-code" ref={(e) => this.aliImgRefForEmp = e}
                                            onChange={() => this.upImg(this.aliImgRefForEmp, 'ali')} />
                                    </div>
                                    <div className="code-name">支付宝</div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                {
                    showCrop ? (<CropImg cancelCrop={this.cancelCrop}
                        getCropImgUrl={this.getCropImgUrl} cropImgWidth={cropImgWidth}
                        cropImgHeight={cropImgHeight} imgBase={imgBase} />) : ('')
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
    // 点击保存添加员工,其中的id原版需要用到uuid来创建一个id
    async addEmployee() {
        let storeId = localStorage.getItem('storeId');
        storeId ? localStorage.getItem('storeId') : store.getState().storeInfo;
        const { code, mobile, name, target, wcCodeImgForEmp, aliCodeImgForEmp, groupId, nowMenuClick } = this.state;
        let wechatPayUrl, aliPayUrl;
        this.state.wcCodeImgForEmp === norCodeImg ? wechatPayUrl = '' : wechatPayUrl = wcCodeImgForEmp;
        this.state.aliCodeImgForEmp === norCodeImg ? aliPayUrl = '' : aliPayUrl = aliCodeImgForEmp;
        let data = { aliPayUrl, code, groupId, id: '', mobile, name, storeId, target, wechatPayUrl };
        try {
            //aliPayUrl, code, groupId, id, mobile, name, storeId, target, wechatPayUrl, verifyCode = null
            await addEmp(data);
            nowMenuClick === 'on' ? this.initEmpList(true) : this.initEmpList(false);
            this.setState({
                code: '',
                mobile: '',
                name: '',
                target: '',
                wcCodeImgForEmp: norCodeImg,
                aliCodeImgForEmp: norCodeImg,
                groupId: ''
            });
        } catch (error) {
            console.log(error);
        }
        this.setState({
            showEmpAddOrEdit: false
        });
    }
    // 点击老板收款码时，初始调用接口
    async getNowShopManInfo() {
        this.setState({
            showMask: true,
            showBossCode: true
        });
        const storeId = localStorage.getItem('storeId');
        let shopManInfo = await getShopManInfo(storeId);
        if (shopManInfo.aliPayUrl !== "" && shopManInfo.aliPayUrl) {
            this.setState({ aliCodeImg: shopManInfo.aliPayUrl })
        }
        if (shopManInfo.wechatPayUrl !== "" && shopManInfo.aliPayUrl) {
            this.setState({ wcCodeImg: shopManInfo.wechatPayUrl })
        }
    }
    // 添加员工前先获取职位列表
    async beforeGetJobList() {
        const storeId = localStorage.getItem('storeId');
        try {
            let jobList = await getJobList(storeId);
            this.setState({
                jobList,
                showEmpAddOrEdit: true
            });
        } catch (error) {
            console.log(error);
        }
    }
    // 保存老板收款码
    async saveBossCode() {
        const storeId = localStorage.getItem('storeId');
        let aliPayUrl = '';
        let wechatPayUrl = '';
        try {
            if (this.state.wcCodeImg !== norCodeImg) {
                wechatPayUrl = this.state.wcCodeImg;
            }
            if (this.state.aliCodeImg !== norCodeImg) {
                aliPayUrl = this.state.aliCodeImg;
            }
            let res = await saveBossCode(storeId, aliPayUrl, wechatPayUrl);
            this.setState({ showMask: false, showBossCode: false });
        } catch (error) {
            console.log(error);
        }
    }
    // 取消裁剪图片
    cancelCrop() {
        this.setState({
            showCrop: false,
            imgBase: '',
            cropImgUrl: ''
        });
        this.aliImgRef.value = '';
        this.wechatImgRef.value = '';
    }
    // 从CropImg组件获取裁剪后的图片URL
    getCropImgUrl(cropImgUrl) {
        this.setState({
            cropImgUrl,
            showCrop: false
        });
        if (this.state.cropImgUrl) {
            if (this.state.showBossCode) {
                if (this.state.codeType === 'ali') {
                    this.setState({
                        aliCodeImg: cropImgUrl
                    });
                } else {
                    this.setState({
                        wcCodeImg: cropImgUrl
                    });
                }
                return;
            }
            if (this.state.showEmpAddOrEdit) {
                if (this.state.codeType === 'ali') {
                    this.setState({
                        aliCodeImgForEmp: cropImgUrl
                    });
                } else {
                    this.setState({
                        wcCodeImgForEmp: cropImgUrl
                    });
                }
                return;
            }

        }
    }
    // 点击相机选择图片时的调用函数
    upImg(e, codeType) {
        this.setState({
            codeType
        });
        let file = e.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let _this = this;
        if (codeType === 'ali') {
            reader.onload = function (e) {
                //显示文件
                _this.setState({
                    showCrop: true,
                    imgBase: this.result
                });
            }
        } else {
            reader.onload = function (e) {
                //显示文件
                _this.setState({
                    showCrop: true,
                    imgBase: this.result
                });
            }
        }
    }
    // 修改员工信息
    editEmp(item) {
        this.beforeGetJobList();
        this.setState({
            isAddEmp: false,
            showEmpAddOrEdit: true,
            code: item.code,
            aliCodeImgForEmp: item.aliPayUrl ? item.aliPayUrl : norCodeImg,
            wcCodeImgForEmp: item.wechatPayUrl ? item.wechatPayUrl : norCodeImg,
            groupId: item.groupId,
            mobile: item.mobile,
            name: item.name,
            target: item.target
        });
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
    // 初始化员工列表
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
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default Employee;