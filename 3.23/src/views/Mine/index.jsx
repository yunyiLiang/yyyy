import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {Row,Col} from 'antd';
import {withAuth, withUser} from '@/utils/hoc';
import Info from './Info';
import Password from './Password';

// @withAuth

//反向代理 : 类组件
// class Mine extends Component{
//     componentDidMount(){

//     }

//     render(){
//         return(
//             <div>
//                 Mine
//                 <br /><span onClick ={()=>{
//                 this.props.history.push('/home')
//             }}>回到首页</span>
//             </div>
//         )
//     }
// }

//属性代理: 函数组件
let Mine = function (props){
    console.log('Mine.props',props);
    const {path:parentPath,url:parentUrl} =props.match;
    const goto =(path) =>{
        props.history.push(path)
    }

    console.log('Mine.props',props)
    return(
        <div>
            <Row style={{height:'100px'}}>
                <Col lg={4} md={6} sm={8} xs={12} onClick={goto.bind(this,parentUrl+'/info')}>个人资料</Col>
                <Col lg={4} md={6} sm={8} xs={12} onClick={goto.bind(this,parentUrl+'/password')}>修改密码</Col>
                <Col lg={4} md={6} sm={8} xs={12} >个人收藏</Col>
                
            
            </Row>

            {/* Mine */}
            <div style={{height:'150px'}}>
                <Col lg={4} md={6} sm={8} xs={12} >我的面试题</Col></div>
            <div style={{height:'150px'}}>
                <Col lg={4} md={6} sm={8} xs={12} >我的回答</Col></div>
           <Switch>
                <Route path={parentPath+'/info'} component={Info} />
                <Route path={parentPath+'/password'} component={Password} />
                <Redirect from={parentPath}  to= {parentPath+'/info'} />
           </Switch>
        </div>
    )
}

// Mine = withUser(Mine);
Mine = withAuth(Mine);
export default Mine;