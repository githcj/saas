"use strict";
import axios from "axios";


let config = {
    baseURL: "http://119.23.228.238:3031/mock/47",
    timeout: 60*1000, // Timeout
};

const _axios = axios.create(config);

// 设置post请求头
_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

_axios.interceptors.request.use(
    function(config) {
    // Do something before request is sent
        const token = window.localStorage.getItem('token');
        if (token) {
          // 设置 token ，一般是在 headers 里加入 Authorization，并加上 Bearer 标注
          // 最好通过此种形式设置 request.headers['Authorization']
          config.headers['Authorization'] = token; // 基于 nodejs
        //   权限设置也需要在请求头里携带信息
        }
        return config;
    },
    function(error) {
    // Do something with request error
    
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
    // Do something with response data
        
        if (response.data.token) { // 将返回的最新的 token 保存
          window.localStorage.setItem('token', response.data.token);
        }

        // window.history.go('http://localhost:3000/login')
        return response;
    },
    function(error) {
		console.log(error.response.status,'??')
        if (error.response.status === 401) {
            // 401 说明 token 验证失败
            // 可以直接跳转到登录页面，重新登录获取 token
            window.localStorage.removeItem('token');
            console.log(error.response.data.error.message,'token过期');
            window.history.go('http://localhost:3000/login')
        }else if(error.response.status === 500) {
            // 服务器错误
            alert('服务器错误,请稍后再试')
            return Promise.reject('服务器出错：',error.response.data);
        }
        // Do something with response error
        return Promise.reject(error);
    }
);

window.axios = _axios;

export default _axios;
