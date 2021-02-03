<template>
    <div>
        <div>我的订单</div>
        <div v-for="(i,index) in goods">
            <div id="Inf">
                <div id="BuyTabBarItem" v-for="(o,index) in i">
                    <img id="picture" class="GongGong" :src="i[index].goo_image" alt="图片">
                    <span id="name" class="GongGong">{{i[index].goo_name}}</span>
                    <span id="price" class="GongGong">商品单价：{{i[index].goo_selling_price|sumPrice}}</span>
                    <span id="number" class="GongGong">购买数量：{{i[index].number}}</span>
                </div>
            </div>
            <div id="other">
<!--                <frames-sumprice :sumPrice="sumPrice(index)" :createTime="i[0].creattime"></frames-sumprice>-->
                <div id="sumprice">
                    <span id="sprice">订单总价：￥{{sumprice.toFixed(2)}}元</span>
                    <span id="time">订单创建时间：{{createtime}}</span>
                </div>
                <!--                <frames-sumprice></frames-sumprice>-->
            </div>
            <div id="Button">
                <el-button>联系售后</el-button>
                <el-button>卖了换钱</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {MessageBox,Button} from 'element-ui'
    import {request} from "../../../network";

    export default {
        name: "MyOrder",
        components:{
        },
        data(){
            return{
                goods:Array,
            }
        },
        watch:{

        },
        computed:{
        },
        methods:{
            sumPrice(index){
                let a=0;
                let goods1 = this.goods[index]
                for(let i of goods1){
                    a+=i.sumprice
                }
                return a
            }
        },
        //过滤器
        filters:{
            sumPrice(price){
                return '￥'+price.toFixed(2)
            }
        },
        created() {
            console.log('进入我的订单界面');
            request({
                url:'/queryToHistoryOrderAllByUser.do',
                data:{
                    userId:sessionStorage.getItem("userID"),
                    page:0,
                    limit:40
                },
                method:'post',
            }).then(res=>{
                console.log('我的订单界面请求数据');
                console.log(res);
                console.log(res.data);
                this.goods = res.data
            }).catch(err=>{
                console.log('我的订单界面请求失败');
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    #Button{
        height: 49px;
    }
    #other{
        height: 49px;
    }
    .GongGong{
        position: relative;
        display: flex;
        text-align: center;
        /*justify-content: space-between;*/
        /*左右居中*/
        justify-content:center;
        /*上下居中*/
        align-items:center;
    }
    #BuyTabBarItem{
        height: 140px;
        /*width: 1580px;*/
        /*max-width: 1600px;*/
        min-width: auto;
        border: 2px solid #e4dada7a;
        justify-content: space-between;
        display: flex;
        margin-bottom: 10px;
    }
    #BuyTabBarItem img{
        width: 100%;
        height: 100%;
    }
    #picture{
        height: 100%;
        width: 100px;
        border: 2px solid red;
    }
    #name{
        height: 100%;
        width: 700px;
        /*border: 2px solid red;*/
    }
    #number{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
    #price{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
    #sprice{
        float: left;
        margin-left: 20px;
    }
    #time{
        float: right;
        margin-right: 20px;
    }
</style>