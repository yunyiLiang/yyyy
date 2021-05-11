import React from 'react';
import requset from '../../utils/request';
import {Rate,Divider} from 'antd';


import './style.scss';

class IQ extends React.Component{
    state ={
        data:{}
    }
    async componentDidMount(){
        const {id} =this.props.match.params;
        const  {data} = await requset.get('/iq/' +id)
        console.log('IQ',data);
        this.setState({
            data:data.data
        })
    }

    render(){
        const {data} =this.state
        return(
            <div className='iq'>
                {/* iq */}
                <h2>{data.question}</h2>
                <div className='info'>
                        {data.user ? <div>{data.user.username}</div> : null}
                    
                    <div>{data.hot}人浏览</div>
                    <div className='mini-star'>难度: <Rate disabled value={data.difficulty} /> </div>
                    {data.companyid ? <div onClick={()=>{ }}>@{data.company.name}</div> : null}
                </div>
                <Divider orientation="left">回复 ({data.answer ? data.answer.length : 0})</Divider>

            </div>
                
        )
    }
}

export default IQ;