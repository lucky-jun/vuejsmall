import axios from "axios";


//第四种方式
export function request(config) {
//    创建axios的实例
    const instance = axios.create({
        baseURL:'http://localhost:8080/ShoppingMall',
        timeout:5000,
        //获取共享域的userid设置进haeders
        headers:{
            token:'',
            //设置消息头
            // userId:this.sessionStorage.getItem('userID')
            userId:sessionStorage.getItem('userID')
        }
    })
    instance.interceptors.request.use(config=>{
        //此处可加入加载等待画面
        console.log('请求的数据：'+config);
        console.log('请求的数据u：'+config.data.username);
        // console.log('请求的数据p：'+config.data.password);
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
        // console.log(error.substring(0,20));
        console.log(error);
        if(error==='Error: timeout of 5000ms exceeded'){
            alert('连接超时')
        }else if(error==='Error: Network Error'){
            alert('网络连接失败')
        }else{
            console.log('其它问题');
        }
    })


    return instance(config)
}