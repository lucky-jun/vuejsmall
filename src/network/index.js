import axios from "axios";


//第四种方式
export function request(config) {
//    创建axios的实例
    const instance = axios.create({
        baseURL:'http://localhost:8080/ShoppingMall',
        timeout:5000,
        headers:{
            token:''
        }
    })
    instance.interceptors.request.use(config=>{
        //此处可加入加载等待画面
        console.log('请求的数据：'+config);
        console.log('请求的数据u：'+config.data.username);
        console.log('请求的数据p：'+config.data.password);
        return config
    },error => {
        console.log("请求拦截失败："+error);
    })

//    响应时拦截对返回的数据进行拦截
    instance.interceptors.response.use(res=>{
        console.log('响应的数据：'+res);
        console.log('响应的数据：'+res.data.flag);
        console.log('响应的数据：'+res.flag);
        //只返回data中的数据
        return res.data
    },error => {
        console.log("响应拦截失败"+error);
    })


    return instance(config)
}