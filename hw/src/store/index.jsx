import {createStore} from 'redux';

//数据持久化: 刷新时读取webStorage中的数据
let currentUser =localStorage.getItem('currentUser');
let isLogin =false;
try{
    //以免不符合json数据规范报错
    currentUser=JSON.parse(currentUser) || {};

}catch(err){
    currentUser={}
}

if(currentUser.Authorization){
    isLogin=true
}



// 2.定义reducer
const initState={

    //上面数据持久化里面的 currentUser islogin
    currentUser,
    isLogin
}
const reducer = function(state =initState,action){
    //传入state和action,必须返回一个新的state
    //action :{type:'login,user}
    switch(action.type){
        case 'login':

        //数据持久化 把数据放入webstorage
        localStorage.setItem('currentUser',JSON.stringify(action.user))


            return{
                isLogin:true,
                currentUser:action.user
            }

        case 'logout':
        localStorage.removeItem('currentUser')
            return {
                currentUser:{},
                isLogin:false,
            };


        // 避免数据丢失用扩展运算符先把信息都先带过来   
        case 'update_user':
            const newState ={
                ...state,
                currentUser:{
                //把原来的东西先带过来
                    ...state.currentUser,

                //改动的东西覆盖原来的 
                    ...action.user
                }
            }
            localStorage.setItem('currentUser',JSON.stringify(newState.currentUser))
            return newState
    }

    return state;
}

// 1.创建仓库
const store = createStore(reducer)

export default store;