import React, { Component } from 'react';
import {withAuth, withUser} from '../utils/hoc';

//需要有用户登录信息才可以访问 否则跳到登录页面
@withAuth

class Add extends Component{

    render(){
        return(
            <div>
                Add
            </div>
        )
    }
}


export default Add;