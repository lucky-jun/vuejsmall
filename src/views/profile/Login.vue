<template>
    <div class="login_container">
        <div class="login_box">
<!--            <div class="avatar_box">-->
<!--                <img src="../assets/logo.png" alt="" />-->
<!--            </div>-->
            <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" >
                <el-form-item prop="username">
                    <el-input v-model.lazy="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
<!--                    使用第三方UI界面@keyup.enter不起作用可加上.native，还不行可能需要$listeners-->
                    <el-input v-model.lazy="loginForm.password" @keyup.enter.native="login" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <span v-if="isActive" style="color: red">用户名或密码错误</span>
<!--                    <span v-if="isActive">用户名或密码错误</span>-->
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="button" @click="regist1">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {request} from '../../network/index'
    export default {
        // 数据的定义和接收
        data () {
            return {
                loginForm: {
                    username:'',
                    password:'',
                    error1:false
                },
                // 表单验证
                loginFormRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
          isActive(){
              return this.loginForm.error1
          }
        },
        // 加载程序的时候就运行
        created () {},
        // 定义执行方法
        methods: {
            // 登录操作
            async login () {
                console.log(this.loginForm.username + ' ' + this.loginForm.password)
                // error  'axios' is not defined  no-undef 导入axios
                // const result = await this.$http.post('oai/login', {
                //     username: this.loginForm.username,
                //     password: this.loginForm.password
                // }).catch(function (error) {
                //     console.log(error)
                // })
                request({
                    url:'/login.action',
                    method:'post',
                    data:{
                        username:this.loginForm.username,
                        password:this.loginForm.password
                    }
                }).then(res=>{
                    // console.log("请求到界面的数据"+res);
                    // console.log("请求到界面的数据"+res.data.flag);
                    console.log("请求到界面的数据flag:"+res.flag);

                    if(res.flag){
                        console.log('请求登录成功');
                        console.log('请求登录成功'+this.$store.state.user.sessionID);
                        console.log('请求登录成功'+this.$store.state.user.userID);
                        //    写入共享仓库
                        new Promise((resolve,reject)=>{
                            console.log('ahahhaha');
                            console.log(res.userID);
                            console.log(res.power);
                            console.log(res.sessionID);

                            const user={userID:res.userID,power:res.power,sessionID:res.sessionID}
                            this.$store.commit('LoginUpstoreUser',user)
                            console.log(this.$store.getters.checkSessionID);
                            console.log(this.$store.getters.checkSessionID!=null);
                            if(this.$store.getters.checkSessionID!=null){
                                resolve('恭喜您登陆成功，您上次登录的时间为：'+res.lastTime)
                            }else{
                                reject('请求登录失败')
                            }
                        }).then(res=>{
                            alert(res);
                            setTimeout(()=>{
                                this.$router.replace('/home')
                            },1000)
                        }).catch(err=>{
                            alert(err)
                        })
                    }else{
                        console.log('请求登录失败');
                        this.loginForm.error1=true
                    }

                }).catch(err=>{
                    console.log("请求界面错误"+err);
                })
                // console.log(123)
                // console.log(result)
                // if (result.data.status !== 200) return false
                // // 设置token userId
                // window.sessionStorage.setItem('token', result.data.token)
                // // 跳转主页
                // this.$router.push('/home')

            },
            regist1(){
                console.log('1111');
                this.$router.push('/regist')
        }
        }
    }
</script>

<style scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);}
    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50px;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;}
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }

    .login_form {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0px 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>