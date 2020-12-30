<template>
    <div class="cart">
<!--        <h1>购物车</h1>-->
<!--        <item></item>-->
        <div id="title"  class="GongGong">
            <div id="choice" class="GongGong"><el-checkbox slot="item-choice">全选</el-checkbox></div>
            <div id="GoodsInf" class="GongGong"><h3>商品信息</h3></div>
            <div id="price"><h3>价格</h3></div>
            <div id="InAndDe"><h3>数量</h3></div>
            <div id="oprations"><h3>操作</h3></div>
        </div>
        <div class="Center">
            <content-cart-tab-bar :goods1="goods"></content-cart-tab-bar>
        </div>
        <div class="Bottom">

        </div>
    </div>
</template>

<script>
    import item from "./components/item";
    import ContentCartTabBar from "./ContentCartTabBar";
    export default {
        name: "Cart",
        data(){
            return{
                goods:[
                    {
                        id:1,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品1',
                        price:111.1,
                        number:13,
                    },
                    {
                        id:2,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品2',
                        price:222.1,
                        number:55,
                    },
                    {
                        id:3,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品3',
                        price:333.1,
                        number:342,
                    },
                    {
                        id:4,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品4',
                        price:44.1,
                        number:6,
                    },
                    {
                        id:5,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品5',
                        price:23.1,
                        number:1,
                    },
                    {
                        id:61,
                        img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                        name:'商品61',
                        price:66.1,
                        number:4,
                    }
                ],
            }
        },
        components:{
            // item
            ContentCartTabBar
        }
    }
</script>

<style scoped>
    .cart{
        /*display: flex;*/
        position: absolute;
        margin-left: 130px;
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
        border: 2px solid black;
        margin-bottom: 10px;
    }
    .Center{
        /*float: top;*/
    }
    .Bottom{
        /*float: bottom;*/
    }
</style>