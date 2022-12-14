import axios from 'axios';

axios.defaults.baseURL = 'http://81.68.145.158:1127'
// axios.defaults.baseURL = 'http://localhost:1127'
// 响应拦截器
// axios.interceptors.response.use(
//     res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
//     err => Promise.reject(err)
// )

export function getFiles(dir){
    return axios.get("/", {
        params: {
            "path": dir
        }
    })
}

export function jumpToPPT(url){
    return axios.get("/jump", {
        params: {
            url: url
        }
    })
}
