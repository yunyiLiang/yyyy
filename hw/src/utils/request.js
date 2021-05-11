import axios from 'axios';

const baseUrl ='http://120.76.247.5:2001'

const request=axios.create({
    baseURL:baseUrl + '/api'
})

export default request;