/**
 * 
 * 生命周期函数只有在类组件中才能使用
 */

import React, { Component,PureComponent } from 'react';

class Lifecycle extends Component{
    constructor(){
        super();
        this.state = {
            qty:1,
            // userInfo:{}
        }
        console.log('constructor');
    }
    componentWillMount(){
        console.log('componentWillMount')
    }
    componentDidMount(){
        console.log('componentDidMount');



        //ajax
        // setTimeout(()=>{
        //     this.setState({
        //         userInfo:{
        //             username:'laoxie',
        //             password:123456
        //         }
        //     })

            
        // },2000)
    }
    componentWillUpdate(){
        console.log('componentWillUpdate')
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    // 特殊生命周期函数
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate')
        // nextProps：props将要改变的值
        // this.props: 当前值
        // nextState: 将要改变的state
        // this.state： 当前state
        console.log('state',this.state,nextState);
        console.log('props',this.props,nextProps);
        // 这个生命周期函数必须返回一个boolean，默认为true，一般用于性能优化
        // return true： 让组件刷新
        // return false: 不允许组件刷新
        // if(nextState.qty%5===0){
        //     return true
        // }else{
        //     return false;

        // }
        return false;
        // if(this.props.username === nextProps.username){
        //     return false;
        // }
        // return true;
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    render(){
        console.log('render')
        return (
            <div>
                生命周期函数
            <button onClick={()=>{
                this.setState({
                    qty:this.state.qty+1
                });
            }}>数量：{this.state.qty}</button>
            <button onClick={()=>{
                this.forceUpdate();
            }}>强制刷新</button>

            {/* {this.state.userInfo.username} */}
                <div>{this.props.username}</div>
            </div>
        )
    }
}

export default Lifecycle;