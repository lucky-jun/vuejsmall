<template>
    <div>
<!--        <h1>我的界面</h1>-->
        <h1></h1>
<!--        <router-link to="/login" tag="button">登录</router-link>-->
<!--        <router-link to="/regist" tag="button">注册</router-link>-->
        <el-button icon="el-icon-setting" @click="Setting">设置</el-button>
        <el-button icon="el-icon-user" @click="ProfileData">个人资料</el-button>
        <el-button icon="el-icon-s-order" @click="MyOrderBtn">我的订单</el-button>
        <el-button icon="el-icon-s-claim" @click="HistoryOrderBtn">历史订单</el-button>
        <el-button icon="el-icon-star-off" @click="myFavorite">我的收藏</el-button>
        <el-button icon="el-icon-map-location" @click="deliveryAddress">收货地址管理</el-button>
        <el-button icon="el-icon-switch-button" @click="exitBtn">退出</el-button>
<!--        <button @click="ProfileData">个人资料</button>-->
<!--        <button @click="MyOrderBtn">我的订单</button>-->
<!--        <button @click="HistoryOrderBtn">历史订单</button>-->
<!--        <button @click="myFavorite">我的收藏</button>-->
<!--        <button @click="exitBtn">退出</button>-->
        <router-view></router-view>
    </div>
</template>

<script>

    import {MessageBox} from "element-ui"
    export default {
        name: "Profile",
        methods:{
            exitBtn(){
              // sessionStorage.key(int index) ：返回当前 sessionStorage 对象的第index序号的key名称。若没有返回null。
              // sessionStorage.getItem(string key) ：返回键名(key)对应的值(value)。若没有返回null。
              // sessionStorage.setItem(string key, string value) ：该方法接受一个键名(key)和值(value)作为参数，将键值对添加到存储中；如果键名存在，则更新其对应的值。
              // sessionStorage.removeItem(string key) ：将指定的键名(key)从 sessionStorage 对象中移除。
              // sessionStorage.clear() ：清除 sessionStorage 对象所有的项。
                MessageBox.confirm('', {
                    message: '是否确认退出?',
                    title: '提示',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                        sessionStorage.clear();
                        this.$router.go(0)
                    }
                }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                        console.log(2);
                    }
                });
            },
            MyOrderBtn(){
                this.$router.push('/myorder')
            },
            HistoryOrderBtn(){
                MessageBox.alert('功能正在开发中，敬请期待！')
                setTimeout(()=>{
                    MessageBox.close()
                },1000)
                    // this.$router.push("/historyOrder")
            },
            ProfileData(){
                this.$message({
                    type:"info",
                    message:"功能正在开发中，敬请期待！"
                })
            },
            myFavorite(){
                // this.$message({
                //     type:"info",
                //     message:"功能正在开发中，敬请期待！"
                // })
                    this.$router.push("/myfavorite")
            },
            deliveryAddress(){
                this.$message({
                    type:"info",
                    message:"功能正在开发中，敬请期待！"
                })
            },
            Setting(){
                this.$message({
                    type:"info",
                    message:"功能正在开发中，敬请期待！"
                })
            },
        }
    }
</script>

<style scoped>

</style>