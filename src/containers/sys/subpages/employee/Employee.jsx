import React, { Component } from 'react';
import './employee.scss';
import { Menu, Dropdown, Button, Icon, Table } from 'antd';
import { getEmployeeList } from './../../../../api/employee';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: []
        };
        this.editEmp = this.editEmp.bind(this);
    }
    render() {
        const handleMenuClick = () => {
            alert('k')
        }
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
                    <span className="ant-dropdown-link" onClick={()=>this.editEmp(item)}>
                        <Icon type="edit" />修改
                    </span>
                </span>
            ),
        }];
        const data = this.state.employeeList;
        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1">启用</Menu.Item>
                <Menu.Item key="2">禁用</Menu.Item>
            </Menu>
        );
        return (
            <div id="employee">
                <div className="employee-state">
                    <span className="state">员工状态:</span>
                    <span className="employee-state-menu">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ marginLeft: 8 }}>
                                启用 <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </span>
                    <span className="boss-payCode"><Icon type="plus" />老板收款码</span>
                    <span className="boss-getCode">获取验证码</span>
                    <div className="add-emp right">
                        <span>员工默认密码为：123456，请尽快修改</span>
                        <span className="add-btn"><Icon type="plus" />添加员工</span>
                    </div>
                </div>
                <div className="employee-list">
                    <Table pagination={false} rowKey='code' columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
    async componentDidMount() {
        const storeId = localStorage.getItem('storeId');
        let employeeList;
        try {
            employeeList = await getEmployeeList(storeId);
            this.setState({
                employeeList
            });
        } catch (error) {
            console.log(error);
        }
    }
    editEmp(item){
        console.log(item);
    }
}

export default Employee;