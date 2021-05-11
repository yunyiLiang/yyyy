import React from 'react';
import {Redirect} from 'react-router-dom';

export function withUser(Mycomponent){
   
    //类组件写法
    // return class OuterComponent extends React.Component{
    //     constructor(props){
    //         super(props);
    //         this.state ={
    //             currentUser:{}
    //         }
    //     }
    //     componentDidMount(){
    //         let currentUser =localStorage.getItem('currentUser');
    //         try{
    //             currentUser =JSON.parse(currentUser)
    
    //         }catch{
    //             currentUser={}
    //         }

    //         this.setState({
    //             currentUser
    //         })
    //     }

    //     render(){
    //         return <Mycomponent {...props} currentUser={currentUser} />
    //     }
    // }


    //函数组件写法
    return function OuterComponent(props){

        let currentUser =localStorage.getItem('currentUser');
        try{
            currentUser =JSON.parse(currentUser)

        }catch(err){
            currentUser={}
        }
        return <Mycomponent {...props} currentUser={currentUser} />
    }
}


//有用户信息才可以进入组件 用户权限

export function withAuth(Mycomponent){
    @withUser

    //属性代理方式: 
    class OuterComponent extends React.Component{
        componentDidMount(){
        }
        // constructor(){
        //     super()
        // }
        render(){
            console.log('withauth',this.props);

            // 二次解构方法 先解构props的location 再解构里面的pathname 
            const {currentUser,location:{pathname}} =this.props;


            if(currentUser){
                return <Mycomponent {...this.props}/>
            } else{
                return <Redirect to ={'/login?targetUrl='+ pathname} />
            }

        }
    }

    // 反向代理方式: 只适用于继承类组件 继承函数组件报错 
    // class OuterComponent extends Mycomponent{

    //     componentDidMount(){
    //         super.componentDidMount();
    //     }

    //     render(){
    //         if(this.props.currentUser){
    //             return super.render()
    //         }else{
    //             return <Redirect to ='/login' />
    //         }
    //     }
    // }

    return OuterComponent

}