import React, { Component } from 'react';
import SHA256 from 'crypto-js/sha256';
import { Form, Input, Button, Checkbox, message } from 'antd';
import request from '../utils/request';



import store from '../store';
import {connect} from 'react-redux';


// class Login extends Component{

//     render(){ 
//         return(
//             <div>
//                 Login
//             </div>
//         )
//     }
// }
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 6 },
    };
const tailLayout = {
    wrapperCol: { offset: 6, span: 6 },
    };

    const rules ={
        username:[
            {required: true, message: '用户名不能为空!'},
           
        ],
        password:[
            {required: true, message: '密码不能为空!'},
          
        ]
    }


let Login =function (props){
    console.log('Login.props', props);

        // onFinish提交表单且数据验证成功后回调事件
    const onFinish =async (values) =>{
        let {username,password,remember} =values;
        password =SHA256(values.password).toString();

        // console.log(password);
        const {data} =await request.get('/user/login',{
            params:{
                username,
                password,
                remember
            }
        });
        if(data.status === 200){
            // if(values.remember){
            //     localStorage.setItem('currentUser',JSON.stringify(data.data))
            // }else{
            //     sessionStorage.setItem('currentUser',JSON.stringify(data.data))
            // }

            // 把用户信息存入redux
            const action ={type:'login',user:data.data}
            store.dispatch(action);
            console.log(data,66666666666)
            console.log('newdata',store.getState())


            // console.log('666666',props.dispatch)
            //react-redux 写法
            // var obj = Object.freeze({user:data.data});
            // obj = {user: obj.user};

            // console.log(111111111,data.data)
            // props.dispatch =({type:'login',user:data.data})
            // props.dispatch=(action)
            

            message.success('登录成功')
            // console.log(222222)



            // 登录成功带回原来的地址 如果没有,就回到我的
            const {search} =props.location;
            const pathname =search.match(/targetUrl\=([\/\w\-]+)/)
            let targetUrl;
            if(pathname){
                targetUrl = pathname[1]
            }
            console.log('targetUrl',targetUrl)
            props.history.push({
                pathname:targetUrl || '/mine'
            })
        }else{
            message.error('用户名或密码错误!')
        }

       

        
    }

    return(
        <div>
            {/* <div>user:</div><input type="text"/>
            <div>password:</div><input type="text" />
            <button onClick={()=>{
                localStorage.setItem("userInfo",JSON.stringify({
                    username:'gaga',
                    password:'123456'
                }))
            }}>login</button> */}
         <h2>用户登录</h2>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={rules.username}
                    // hasFeedback 校验成功失败 提示框 不用再另外设置东西
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>免登录</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
       
    )
}
// const mapStateToProps = state =>{
//     return{

//     }
// }

// const mapDispatchToProps =dispatch =>{
//     return{
//         dispatch,
//         // logout(){
//         //     dispatch({type:'logout'})
//         // }
//     }
// }




// Login = connect(mapDispatchToProps)(Login)
export default Login