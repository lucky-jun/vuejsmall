<template>
    <div id="buy">
<!--        <h1 v-for="i in this.$route.query.goodsId">{{i}}</h1>-->
<!--        <h1>购买的商品信息为，是否取人购买</h1>-->

    <buy-tab-bar>
        <div slot="goods">
            <buy-tab-bar-item v-for="(i,index) in goods">
                <img slot="item-picture" :src="i.img" alt="图片">
                <span slot="item-name">{{i.name}}</span>
                <span slot="item-price">价格：{{i.price|sumPrice}}</span>
                <span slot="item-number">数量：{{i.number}}</span>
            </buy-tab-bar-item>
            <div>
                <span>总价：{{sumprice|sumPrice}}</span>
            </div>
        </div>
        <div slot="option">
            <button @click="cancelBtn">取消订单</button>
            <button @click="submitBtn">提交订单</button>
        </div>
    </buy-tab-bar>
    </div>
</template>

<script>
    import {request} from "../../network";

    import BuyTabBar from "./components/BuyTabBar";
    import BuyTabBarItem from "./components/BuyTabBarItem";
    export default {
        name: "BuyGoods",
        components:{
            BuyTabBar,
            BuyTabBarItem
        },
        data:{
          goods:this.$route.query.goods
        },
        computed:{
            sumprice(){
                let sum=0
                for(let item of this.goods){
                    sum+=item.price*item.number
                }
                return sum
            }
        },
        methods:{
            cancelBtn(){
            //    取消按钮，返回上一页
                this.$router.go(-1)
            },
            //提交按钮
            submitBtn(){
                request({
                    url:'/insertToMyOrder.do',
                    method:'post',
                    data: {
                        goods:this.goods,
                        userId:sessionStorage.getItem('userID')
                    }
                }).then(res=>{
                    console.log(res);
                    console.log(res.flag);
                    console.log(res.MyOrderId);
                    console.log('请求提交成功');
                    if(res.flag){
                    //    弹窗确认是否支付
                        MessageBox('支付订单?', '提示', {
                            confirmButtonText: '立即支付',
                            cancelButtonText: '稍后支付',
                            type: 'warning'
                        }).then(() => {
                            //确认支付订单，修改订单的信息为已支付
                            request({
                                url:'/updateMyOrderToPay.do',
                                method:'post',
                                data:{
                                    MyOrderId:res.MyOrderId,
                                    userId:sessionStorage.getItem('userID')
                                }
                            }).then(res=>{
                                console.log(res);
                                console.log(res.flag);
                                if(res.flag){
                                    this.$router.replace('/paymentsuccessful')
                                }else{
                                    this.$router.replace('/paymentfailed')
                                }
                            })
                        }).catch(()=>{
                            this.$router.replace('/profile')
                        })
                    }
                })
            }
        },
        //过滤器
        filters:{
            sumPrice(price){
                return '￥'+price.toFixed(2)
            }
        }
    //    获取商品ID进行展示点击购买,
    //     created() {
    //         request({
    //             url:'/queryGoodsByManyId.do',
    //             method:'post',
    //             data:{
    //                 goodsId:this.$route.query.goodsId
    //             }
    //         }).then(res=>{
    //             console.log(res);
    //             console.log(res.data);
    //             this.goods = res.data
    //             console.log('请求数据成功');
    //         }).catch(err=>{
    //             console.log(err);
    //             console.log('请求数据失败');
    //         })
    //     }
    }
</script>

<style scoped>

</style>