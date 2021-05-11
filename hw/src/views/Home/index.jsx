import React, { Component } from 'react';
import {List,Rate } from 'antd';
import moment from 'moment';

import {withUser} from '../../utils/hoc';
import request from '../../utils/request';
import Item from 'antd/lib/list/Item';
import './Home.scss';


class Home extends Component{

    state= {
        newList: [],
        hotList:[],
        iqList:[],

    }

    async componentDidMount(){
        const {data:newList} = await request.get('/iq');
        const {data:hotList} = await request.get('/iq',{
            params:{
                sort:'hot'
            }
        });
        const {data:iqList} = await request.get('/iq',{
            params:{
                sort:'difficulty'
            }
        });


        // console.log(data)
        this.setState({
            newList:newList.data.result,
            hotList:hotList.data.result,
            iqList:iqList.data.result,

        })
    }

    goto =(id) =>{
        this.props.history.push({
            pathname: '/iq/' + id,
            search: '?id=' + id,
            state: { price: 998 }

        })
    }

    render(){
        const {newList,hotList,iqList} = this.state;
        // console.log(newList)

        return(
            <div className='home'>
                {/* Home */}
                <h2 style={{ color:"red"}}>最新面试题</h2>
                <List 
                itemLayout ='horizontal'
                dataSource={newList}
                renderItem={item =>(
                    <List.Item>
                        <List.Item.Meta 
                        title ={<div
                            onClick= {this.goto.bind(this,item._id)}>
                            {item.question}
                            </div>}
                        description ={<span> 回答: {item.answer}</span>}
                        />
                        {/* 年月日模式 */}
                        <div>{moment(item.addtime).format('YYYY/MM/DD')}</div> 
                        {/* 距离现在的时间 */}
                        {/* <div>{moment(item.addtime).fromNow()}</div>   */}
                        
                    </List.Item>
                )}
                >
                    
                </List>

                <h2 style={{ color:"red"}}>热门面试题</h2>
                <List 
                itemLayout ='horizontal'
                dataSource={hotList}
                renderItem={item =>(
                    <List.Item>
                        <List.Item.Meta 
                        title ={<div
                            onClick= {this.goto.bind(this,item._id)}>
                            {item.question}
                            </div>}
                        description ={
                        <div className="description">
                        <span> 回答: {item.answer}</span>
                        <span>人气: {item.hot}</span>
                        </div>
                        }
                        />
                        <div>{moment(item.addtime).format('YYYY/MM/DD')}</div> 
                        
                    </List.Item>
                )}
                >
                </List>

                <h2 style={{ color:"red"}}>重难点面试题</h2>
                <List 
                itemLayout ='horizontal'
                dataSource={iqList}
                renderItem={item =>(
                    <List.Item>
                        <List.Item.Meta 
                        title ={<div
                            onClick= {this.goto.bind(this,item._id)}>
                            {item.question}
                            </div>}
                        description ={
                        <div className="description">
                        <span> 回答: {item.answer}</span>
                        <span>人气: {item.hot}</span>
                        <span>难度系数:</span>
                        <Rate 
                        disabled
                        defaultValue={item.difficulty}
                        className="mini-star"
                        />
                        </div>
                        }
                        />
                        <div>{moment(item.addtime).format('YYYY/MM/DD')}</div> 
                        
                    </List.Item>
                )}
                >
                    
                </List>
            </div>
        )
    }
}

// let Home =function (props){

//     console.log('Home',props)
//     return(
//         <div>
//             Home
//         </div>
//     )
// }

Home = withUser(Home);
export default Home;