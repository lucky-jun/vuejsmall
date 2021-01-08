<template>
    <div id="button">
        <el-button plain @click="CancelBtn">取消订单</el-button>
        <!--订单的状态，如确认收货，催发。。。；动态绑定Style，还有上面的-->
<!--        <button v-if="" @click="stateBtn">{{state}}</button>-->
        <el-button plain v-if="btnstate" @click="stateBtn">{{state}}</el-button>
        <el-button v-else type="primary" :loading="true">加载中</el-button>
    </div>
</template>

<script>
    export default {
        name: "FrameButton",
        props:{
            //传入商品信息
        },
        data(){
            return{
                btnstate:true,
                state:'订单状态'
            }
        },
        methods:{
            CancelBtn(){
                console.log('点击了 取消订单');
            },
            stateBtn(){
                console.log('点击了 状态按钮');
            }
        }
    }
</script>

<style scoped>

</style>