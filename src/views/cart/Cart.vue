<template>
    <div class="cart">
<!--        <h1>购物车</h1>-->
<!--        <item></item>-->
        <div class="Center">
            <content-cart-tab-bar :goods1="goods" @getGoodsId="getGoodsId"></content-cart-tab-bar>

<!--            <confirm></confirm>-->
        </div>
    </div>
</template>

<script>

    import {request} from "../../network";

    // import item from "./components/item";
    import ContentCartTabBar from "./ContentCartTabBar";
    import testCheckBox from "./components/testCheckBox";
    import Confirm from "../Details/components/testTanChuang"


    export default {
        name: "Cart",
        data(){
            return{
                // goods:[
                //     {
                //         id:1,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品1',
                //         price:111.1,
                //         number:13,
                //     },
                //     {
                //         id:2,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品2',
                //         price:222.1,
                //         number:55,
                //     },
                //     {
                //         id:3,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品3',
                //         price:333.1,
                //         number:342,
                //     },
                //     {
                //         id:4,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品4',
                //         price:44.1,
                //         number:6,
                //     },
                //     {
                //         id:5,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品5',
                //         price:23.1,
                //         number:1,
                //     },
                //     {
                //         id:61,
                //         img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //         name:'商品61',
                //         price:66.1,
                //         number:4,
                //     }
                // ],
                goods:Object
            }
        },
        components:{
            // item
            Confirm,
            ContentCartTabBar,
            testCheckBox
        },
        //过滤器
        filters:{
            sumPrice(price){
                return '￥'+price.toFixed(2)
            }
        },
        methods:{
            getGoodsId(goods){
                console.log('选择了：'+goods);
            }
        },
        created() {
            console.log('创建购物车列表');
            request({
                url:'/queryToCart.do',
                method:'post',
                data:{
                    userID:6
                }
            }).then(res=>{
                console.log('哈哈哈哈哈');
                console.log(res);
                this.goods=res.data
                console.log(res.data);
                console.log(this.goods);

                var arr = [];
                for(var key in res.data){
                    if(!res.data.hasOwnProperty(key)){
                        continue;
                    }
                    var item = {};
                    item[key] = res.data[key];
                    arr.push(item);
                }
                console.log("----------------------")
                console.log(arr)



            }).catch(err=>{
                console.log(err);
                console.log('请求购物车列表失败');
            })
        }
    }
</script>

<style scoped>
    .cart{
        /*display: flex;*/
        position: absolute;
        margin-left: 130px;
        display: flex;
        flex-direction: column;
    }
    .GongGong{
        display: flex;
        text-align: center;
        /*justify-content: space-between;*/
        /*左右居中*/
        justify-content:center;
        /*上下居中*/
        align-items:center;
    }
    #CartTabBarItem{
        height: 140px;
        /*width: 1580px;*/
        /*max-width: 1600px;*/
        min-width: auto;
        border: 2px solid black;
        justify-content: space-between;
        display: flex;
        margin-bottom: 10px;
    }
    #choice{
        height: 100%;
        width: 30px;
        margin-left: 20px;
        /*border: 2px solid red;*/
    }
    #GoodsInf{
        height: 100%;
        width:800px;
    }
    #price{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
    #InAndDe{
        height: 100%;
        width: 200px;
        /*border: 2px solid red;*/
    }
    #oprations{
        /*display: flex;*/
        height: 100%;
        width: 150px;
        /*border: 2px solid red;*/
        /*display: flex;*/
    }
    #title{
        min-width: 1310px;
        display: flex;
        /*text-align: center;*/
        justify-content:space-between;
        /*上下居中*/
        align-items:center;
        border: 2px solid #94919180;
        margin-bottom: 10px;
    }
    .Center{
        /*float: top;*/
    }
    .Bottom{
        background-color: #aaaaaa;
        /*float: bottom;*/
        float: left;
        width: 1310px;
        height: 49px;
        /*margin-left: 9px;*/
        border: 2px solid red;
        display: flex;
        /*text-align: center;*/
        justify-content:space-between;
        /*上下居中*/
        align-items:center;
    /*    悬浮*/

        left: 130px;
        position: fixed;
        /*!/这里换成top:0;就悬浮在头部*!*!*/
        bottom: 0;
        /*margin-left:;*/
        /*width: 100%;*/
        /*z-index: 100;*/
    }
    #SumPrice{
        float: left;
        text-align: center;
        margin-left: 500px;
    }
    #PaySumPrice{
        float: right;
        margin-right: 60px;
    }
</style>