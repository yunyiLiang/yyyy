import React, {  Component } from 'react';
import {Route,Redirect,Switch,Link,NavLink,withRouter} from 'react-router-dom';

// import {HomeOutlined,UserOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import { Layout,Col, Menu, Row,Button } from 'antd';
import Home from './views/Home';
import Login from './views/Login';
import Reg from './views/Reg';
import Mine from './views/Mine';
import IQ from './views/IQ';
import Add from './views/Add';



import 'antd/dist/antd.css';
import './App.scss';


import {connect} from 'react-redux';
// import store from '@/store';


// store.subscribe(()=>{
//     console.log('statechange',store.getState())
// })

// 记得App根组件传入props!!
// let App =(props)=>{
//     const menu =[{
//         text:'首页',
//         path:'/home',
//         name:'home',
//         component:Home
//     },
//     {
//         text:'登录',
//         path:'/login',
//         name:'login',
//         component:Login
//     },
//     {
//         text:'注册',
//         path:'/reg',
//         name:'reg',
//         component:Reg
//     },{
//         text:'我的',
//         path:'/mine',
//         name:'mine',
//         component:Mine
//     }];

//     const changeMenu = ({key})=>{
//         // console.log(e)
//         props.history.push(key);
//     }

   
//         return(
//             <div>
//                 {/* <nav>
//                     <ul>
//                         {
//                             menu.map(item => <li key={item.name}>
//                                 <NavLink
//                                 activeClassName="active" 
//                                 to={item.path}>{item.text}</NavLink>
                                
//                             </li>)
//                         }
//                     </ul>
//                 </nav> */}

//             <Menu  mode="horizontal" theme="dark" onClick={changeMenu} selectedKeys={}>
//                 {
//                     menu.map(item => <Menu.Item key={item.path}>{item.text}</Menu.Item>)
//                 }
//             </Menu> 

//                     <Switch>
//                         { //路由出口
//                         menu.map(item =><Route 
//                         key={item.name}
//                         path={item.path}
//                         component={item.component} />)
//                         }
//                         <Route path='/notfound' render={()=> <div>404</div>} />
//                         <Redirect from='/' to='/home' exact />
//                         <Redirect to='/notfound'/>
//                     </Switch>
//             </div>
//         )
    
// }
// const mapStateToProps =function(){

// }

// const mapDispatchToProps = function(dispatch){
//     return{
//         dispatch,
//         logout(){
//             dispatch({type:'logout'})
//         }
//     }
// }


// @connect(mapStateToProps,mapDispatchToProps)

const mapStateToProps = function(state){
    console.log('mapStateToProps.state=',state);
    return  state
    
}

const mapDispatchToProps = function(dispatch){
    return {
        dispatch,
        logout(){
            dispatch({type:'logout'})
        }
       
    }
}
@connect(mapStateToProps,mapDispatchToProps)
@withRouter
class App extends React.Component{

state={
    // isLogin:store.getState().isLogin, 
    menu:[{
            text:'首页',
            path:'/home',
            name:'home',
            component:Home,
            // icon:<HomeOutlined/>
        },
        // {
        //     text:'登录',
        //     path:'/login',
        //     name:'login',
        //     component:Login
        // },
       
        {
            text:'我的',
            path:'/mine',
            name:'mine',
            component:Mine,
            // icon:<UserOutlined/>
        },
        {
            text:'添加面试题',
            path:'/add',
            name:'add',
            component:Add
        }
    ],

        current:'/home',
                        
}

    // componentDidMount(){
    //     const {pathname} = this.props.location;
    //     this.setState(
    //         {current:pathname}
    //     )
    // }



    changeMenu = ({key})=>{
        // console.log(e)
        this.props.history.push(key);
        this.setState({
            current:key
        })
    }
    goto = (path) =>{
        this.props.history.push(path);
    }
    UNSAFE_componentWillMount(){
        const {pathname} = this.props.location;
            this.setState(
                {current:pathname}
            )

    }

    componentDidMount(){
        // store.subscribe(()=>{
        //     console.log('statechange',store.getState())
        //     this.setState({
        //         isLogin:store.getState().isLogin
        //     })
        // })
    }
    render(){
        console.log('APPprops',this.props)
         const {menu,current} = this.state  //结构state里面的菜单和当前页面
        //  const currentState =store.getState();
        const {isLogin,dispatch,logout} = this.props;

        return(
            <div>
            <Row style={{backgroundColor:'#001529',lineHeight:'46px'}}>
                <Col span={20}>
                    <Menu  mode="horizontal" theme="dark" onClick={this.changeMenu} selectedKeys={[current]}>
                    {
                        menu.map(item => <Menu.Item 
                            key={item.path}
                            // icon={item.icon}
                            >{item.text}</Menu.Item>)
                    }
                    </Menu> 
                </Col>
                <Col span={4}>
                    {
                    // currentState.isLogin ? 
                    isLogin?
                    <Button type='link' onClick={()=>{
                        logout()
                    }}> 退出</Button>
                        :
                    <>
                    <Button type='link' onClick={this.goto.bind(this,'/login')}>登录</Button>
                    <Button type='link' onClick={this.goto.bind(this,'/reg')}>注册</Button>   
                    </>
                    }
                </Col>
            </Row>
            <Layout.Content style={{padding:10}}>
            <Switch>
                { //路由出口
                menu.map(item =><Route 
                key={item.name}
                path={item.path}
                component={item.component} />)
                }
                <Route path='/iq/:id' component={IQ}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/reg' component={Reg}></Route>
                <Route path='/notfound' render={()=> <div>404</div>} />
                <Redirect from='/' to='/home' exact />
                <Redirect to='/notfound'/>
            </Switch>
            </Layout.Content>
            </div>
        )
    }
}



// App = connect(mapStateToProps,mapDispatchToProps)(App)
// App = withRouter(App);
export default App;