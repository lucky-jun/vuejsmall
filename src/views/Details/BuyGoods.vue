<template>
    <div id="buy">
<!--        <h1 v-for="i in this.$route.query.goodsId">{{i}}</h1>-->
<!--        <h1>购买的商品信息为，是否取人购买</h1>-->

    <buy-tab-bar>
        <div slot="goods">
            <buy-tab-bar-item v-for="(i,index) in goods">
                <img slot="item-picture"  :src="i.goo_image" alt="图片">
                <span slot="item-name">{{i.goo_name}}</span>
                <span slot="item-price">价格：{{i.goo_selling_price|sumPrice}}</span>
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

    import {MessageBox} from "element-ui"

    import BuyTabBar from "./components/BuyTabBar";
    import BuyTabBarItem from "./components/BuyTabBarItem";
    export default {
        name: "BuyGoods",
        components:{
            BuyTabBar,
            BuyTabBarItem
        },
        data(){
            return{
                goods:this.$route.query.goods,
                // goods2:this.$store.state.goods
                goodsInf:[{
                    goo_id:'',
                    number:'',
                    sump:''
                }],
            }
        },
        computed:{
            sumprice(){
                    let sum=0
                    // console.log(this.goods.goo_selling_price);
                    // console.log(this.goods.number);
                    // console.log(this.goods)
                    // console.log(this.goods.length)

                    for(let item of this.goods){
                        console.log('asdfalsdjfalk')
                        console.log(item);
                        console.log(item.goo_selling_price);
                        console.log(item.number);
                        console.log(sum)

                            let i=0;
                            this.goodsInf[i].goo_id = item.goo_id
                            this.goodsInf[i].number = item.number

                        sum+=item.goo_selling_price*item.number
                        this.goodsInf[i].sump = sum
                        i++
                        console.log(sum)
                    }

                    console.log("444444444444444444444444444")
                    console.log(this.goodsInf);
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
                        goods:this.goodsInf,
                        userId:sessionStorage.getItem('userID'),
                    }
                }).then(res=>{
                    console.log(res);
                    console.log(res.flag);
                    console.log(res.MyOrderId);
                    this.$store.commit({type:'setWaitOrderId',waitOrderId:res.MyOrderId})
                    console.log(res.MyOrderId);
                    console.log(this.$store.getters.getWaitOrderId);
                    console.log('请求提交成功');
                    //判断成功与否弹窗确认
                    if(res.flag){
                        this.$confirm("是否支付订单?", "提示", {
                            confirmButtonText: "立即支付订单",
                            cancelButtonText: "稍后支付",
                            type: "warning"
                        }).then(res=>{
                            console.log(res);
                            console.log('then');
                            request({
                                url:'/updateMyOrderToPay.do',
                                method: 'post',
                                data:{
                                    OrderId:this.$store.getters.getWaitOrderId,
                                    payState:'支付成功',
                                    orderState:'等待发货'
                                }
                            }).then(res=>{
                                console.log(res);
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
                            })
                        }).catch(err=>{
                            console.log(err);
                            console.log('err');
                            MessageBox.alert('订单未支付！即将返回上一页！','提示',{
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
        },
    //    获取商品ID进行展示点击购买,
        created() {
            console.log('-----------')
            // console.log(this.$route.query.goods);
            // console.log(this.$route.query.goods[0]);
            this.goods =this.$route.query.goods;
            console.log(this.goods);
            // console.log(this.goods.goo_image);
            // console.log(JSON.parse(this.$route.query.goods).goo_image);
            // console.log(this.$route.query.goods.goo_selling_price);
            // console.log(this.$route.query.goods.number);
            console.log('-----------')


            // request({
            //     url:'/queryGoodsByManyId.do',
            //     method:'post',
            //     data:{
            //         goodsId:this.$route.query.goodsId
            //     }
            // }).then(res=>{
            //     console.log(res);
            //     console.log(res.data);
            //     this.goods = res.data
            //     console.log('请求数据成功');
            // }).catch(err=>{
            //     console.log(err);
            //     console.log('请求数据失败');
            // })
        },
        watch:{
            goods(val){
                    for(let item of this.goods){
                        let i=0;
                        this.goodsInf[i].goo_id = item.goo_id
                        this.goodsInf[i].goo_number = item.number
                        i++
                    }
                    console.log("444444444444444444444444444")
                    console.log(this.goodsInf);
            }
        }
    }
</script>

<style scoped>

</style>