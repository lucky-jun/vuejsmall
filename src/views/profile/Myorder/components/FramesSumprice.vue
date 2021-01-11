<template>
    <div id="sumprice">
        <span id="price">订单总价：￥{{sumprice}}元</span>
        <span id="time">订单创建时间：{{createtime}}</span>
    </div>
</template>

<script>
    export default {
        name: "FramesSumprice",
        props:{
            sumPrice:Number,
            createTime:String
        },
        data(){
            return{
                sumprice:this.sumPrice,
                createtime:this.createTime
            }
        },
        watch:{
            sumPrice(newvalue){
                console.log("----------------------------------------")
                console.log(newvalue)
                console.log(this.sumPrice())
                this.sumprice = newvalue
            },
            createTime(newvalue){
                this.createtime = newvalue
            }
        }
    }
</script>

<style scoped>
#price{
    float: left;
    margin-left: 20px;
}
    #time{
        float: right;
        margin-right: 20px;
    }
</style>