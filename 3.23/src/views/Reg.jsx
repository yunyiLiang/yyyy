import React from 'react';
import CryptoJS from 'crypto-js'
import { Form, Input, Button, Checkbox, message } from 'antd';
import Password from 'antd/lib/input/Password';

import requset from '../utils/request';

// class Reg extends Component{

//     render(){
//         return(
//             <div>
//                 Reg
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
        {required: true, message: '用户名和密码不能为空!'},
        {
            async validator(rule, value) {
                //用户名为空不发请求
                if(!value){
                    return
                }
                const {data} =await requset.get('/user/check',{
                    params:{
                        username:value
                    }    
                });

                if (data.status === 200) {
                  return Promise.resolve();
                }
                return Promise.reject('用户名已存在');
              },

        }
    ],

   

    password:[
        {required: true, message: '密码不能为空!'},
        { min:6 ,max:12, message :'密码长度必须为6-12位字符'}
    ]
}


const Reg =function (props){
  // onFinish提交表单且数据验证成功后回调事件
    const onFinish =async (values) =>{

        values.password =CryptoJS.SHA256(values.password).toString();
        const {data} =await requset.post('/user/reg',values);
        if(data.status === 200){
            message.success('注册成功')
        }

        props.history.push({
            pathname:'login',
            state :{ username: values.username}
        })
    }

    return(
        <div>
            <h2>注册</h2>
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


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                注册
                </Button>
            </Form.Item>
        </Form>
          
        </div>
    )
}
export default Reg;