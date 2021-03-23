// import {createStore} from 'redux';

export function createStore(reducer){
    let state = reducer();
    const getState =function(){
        return state
    }
    const dispatch = function(){
        state =reducer(state,action)

    }
    return{
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }

}

import {createStore} from './simpleRedux'
const store =createStore(reducer);
const state = store.getState();
store.dispatch({type})
const state2 = store.getState();