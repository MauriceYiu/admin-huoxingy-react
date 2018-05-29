/* eslint-disable */
import React, { Component } from 'react';
import './store.scss';
import { getStoreList } from './../../api/store';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: []
        };
        this.goInnerIndex = this.goInnerIndex.bind(this);
    }
    render() {
        const { storeList } = this.state;
        return (
            <div id="store">
                <div className="bg-mask"></div>
                <div className="store-list fadeInDown">
                    <ul>
                        {
                            storeList.map((item, index) => {
                                return (
                                    <li className="store-list-item" key={index} onClick={() => this.goInnerIndex(item)}>
                                        <span>{item.name}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
    // 此处的myScroll用了第三方插件iscroll
    async componentDidMount() {
        try {
            let storeList = await getStoreList();
            this.setState({
                storeList
            });
            let myScroll = new IScroll('.store-list', {
                mouseWheel: true
            });
        } catch (error) {
            console.log(error);
        }
        // getStoreList().then(res=>{
        //     console.log(res);
        //     let storeList = res;
        //     this.setState({
        //         storeList:storeList
        //     });
        //     let myScroll = new IScroll('.store-list', {
        //         mouseWheel: true
        //     });
        //     console.log("先拿到的：" + storeList);
        // });
    }
    goInnerIndex(item) {
        console.log(item);
        let storeId = item.id;
        localStorage.setItem('storeId', storeId);
        this.props.router.push('/sys');
    }
}

export default Store;