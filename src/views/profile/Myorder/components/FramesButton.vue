<template>
    <div id="button">
        <el-button plain @click="CancelBtn">取消订单</el-button>
        <!--订单的状态，如确认收货，催发。。。；动态绑定Style，还有上面的-->
<!--        <button v-if="" @click="stateBtn">{{state}}</button>-->
        <el-button plain v-if="btnstate" @click="stateBtn">{{state}}---{{keys}}</el-button>
        <el-button v-else type="primary" :loading="true">加载中</el-button>
    </div>
</template>

<script>
    import {request} from "../../../../network";
    import {MessageBox} from "element-ui";

    export default {
        name: "FrameButton",
        props:{
            //传入商品信息
            paystate:String,
            orderstate:String,
            keys:Number
        },
        data(){
            return{
                btnstate:true,
                // state:'订单状态'
            }
        },
        computed:{
            state(){
                if(this.paystate==='订单未支付'){
                    return '立即支付'
                }else{
                    if(this.orderstate==='等待发货'){
                        return '催促发货'
                    }else{
                        return '确认收货'
                    }
                }
            }
        },
        methods:{
            CancelBtn(){
                console.log('点击了 取消订单');
            },
            stateBtn(){
                this.btnstate=false
                console.log('点击了状态按钮');
                if(this.paystate==='订单未支付'){
                    request({
                        url:'/updateMyOrderToPay.do',
                        method: 'post',
                        data:{
                            OrderId:this.$store.getters.getWaitOrderId,
                            payState:'支付成功',
                            orderState:'等待发货'
                        }
                    }).then(res=>{
                        console.log('请求成功:'+res);
                        MessageBox.alert('正在支付，请稍后。。。')
                        setTimeout(()=>{
                            MessageBox.close();
                            if(res.flag){
                                MessageBox.alert('支付成功！即将返回上一页！','提示',{
                                    confirmButtonText: '确认',
                                    type: 'success',//success，error，info和warning
                                    callback: action => {
                                        this.$router.go(-1)
                                    }
                                })
                                setTimeout(() => {
                                    MessageBox.close();
                                    this.$router.go(-1)
                                }, 3000);
                            }else{
                                MessageBox.alert('支付失败', '提示', {
                                    confirmButtonText: '确认',
                                    type: 'error',//success，error，info和warning
                                    callback: action => {
                                        this.$router.replace('/profile')
                                    }
                                })
                                setTimeout(() => {
                                    MessageBox.close();
                                    this.$router.replace('/profile')
                                }, 3000);
                            }
                        },3000)
                    }).catch(err=>{
                        console.log('支付错误');
                    })
                }else{
                    setTimeout(()=>{
                        MessageBox.alert('提醒成功')
                    },2000)
                    MessageBox.close()
                    this.btnstate=true
                }
            }
        }
    }
</script>

<style scoped>

</style>