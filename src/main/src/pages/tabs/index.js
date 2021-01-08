import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    push(subapp) { history.pushState(null, subapp, subapp) }

    render() {
        return (
            <div className="mainapp-main">
                <ul className="mainapp-sidemenu">
                    <li onClick={()=>{this.push('/pms/r')}}>React16</li>
                    <li onClick={()=>{this.push('/pms/v')}}>Vue3</li>
                </ul>
                <main id="subview-container"></main>
            </div>
        );
    }

    componentDidMount(){
        // 注册子应用
        const loader = loading => {
            ReactDOM.render(<>
            {loading && <h4 className="subapp-loading">Loading...</h4>}
            <div id="subview" />
            </>, document.getElementById('subview-container'));
        };
        
        registerMicroApps(
            [
            {
                name: 'pmsr',
                entry: '//localhost:3001',
                container: '#subview',
                loader,
                activeRule: '/pms/r',
            },
            {
                name: 'pmsv',
                entry: '//localhost:3002',
                container: '#subview',
                loader,
                activeRule: '/pms/v',
            },
            ],
            // 挂载生命周期
            {
            beforeLoad: [
                app => {
                console.log('%c[主应用生命周期beforeLoad]', 'color: green;font-weight:bold;', app);
                }
            ],
            beforeMount: [
                app => {
                console.log('%c[主应用生命周期beforeMount]', 'color: green;font-weight:bold;', app);
                },
            ],
            afterUnmount: [
                app => {
                console.log('%c[主应用生命周期afterUnmount]', 'color: green;font-weight:bold;', app);
                },
            ],
            },
        );
        
        // 挂载状态管理器
        const { onGlobalStateChange } = initGlobalState({ user: 'main' });
        // 监听状态改变事件
        onGlobalStateChange((value, prev) => {
            console.log('%c[主应用main接收状态]', 'color: red;font-weight:bold;', value, prev);
        });
        
        // 默认进入的子应用
        setDefaultMountApp('/pms/r');
        
        // 启动应用
        start();
        
        // 第一个微应用 mount 后调用的方法 （可做监控/埋点等）
        runAfterFirstMounted(() => {
            console.log('%c[第一个子应用挂载好了]', 'color: blue;font-weight:bold;');
        });
    }
}