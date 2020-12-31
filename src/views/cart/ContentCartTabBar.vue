<template>
    <div id="ContentCartTabBar">
        <div id="title"  class="GongGong">
            <div id="choice" class="GongGong"><el-checkbox slot="item-choice">全选</el-checkbox></div>
            <div id="GoodsInf" class="GongGong"><h3>商品信息</h3></div>
            <div id="price"><h3>价格</h3></div>
            <div id="InAndDe"><h3>数量</h3></div>
            <div id="oprations"><h3>操作</h3></div>
        </div>
        <div id="context">
            <cart-tab-bar>
                <cart-tab-bar-item v-for="(i,index) in goods" :goods="goods" :index="index">
                    <!--                <el-checkbox slot="item-choice" ></el-checkbox>-->
                    <input slot="item-choice" type="checkbox" :value="i.id" v-model="gather" @click="goStore(i.id,i.number,sumprice(index),index)"></input>
                    <img slot="item-picture" :src="i.img" alt="图片">
                    <div slot="item-name">{{i.name}}</div>
                    <div slot="item-price">{{sumprice(index)}}</div>
                    <div slot="item-number">
                        <button  @click="decrementBtn(index)" :disabled="i.number<=1">-</button>
                        {{i.number}}
                        <button @click="incrementBtn(index)">+</button>
                    </div>
                </cart-tab-bar-item>
            </cart-tab-bar>
        </div>
        <div class="Bottom">
<!--            <div id="SumPrice">总价格：{{this.$store.getters.getSumprice| sumPrice}}</div>-->
            <div id="SumPrice">总价格：</div>
            <div id="PaySumPrice">
                <button>结算</button>
            </div>
        </div>
    </div>
</template>

<script>
    import CartTabBar from "./components/CartTabBar";
    import CartTabBarItem from "./components/CartTabBarItem";
    export default {
        name: "ContentCartTabBar",
        props:{
            goods1:{
                type:Array
            }
        },
        data(){
            return{
                goods:this.goods1,
                goodsIndex:[],
                gather:[]
            }
        },
        computed:{
        },
        components:{
            CartTabBar,
            CartTabBarItem
        },
        methods:{
            deleteBtn(index){
                console.log('deleteBtn点击了：'+index);
                // console.log('deleteBtn点击了商品：'+this.goods[index].id);
                // this.$router.push()
            },
            sumprice(index){
                return (this.goods[index].number*this.goods[index].price).toFixed(2)
            },
            decrementBtn(index){
                if(this.goods[index].number<=1){
                    alert('商品数量不能低于 1 件')
                }else{
                    this.goods[index].number--
                }

            },
            incrementBtn(index){
                this.goods[index].number++
            },
            goStore(id,number,price,index){

                // console.log('即将传值：'+this.gather)
                console.log('即将传值：'+id)
                console.log('即将传值：'+number)
                console.log('即将传值：'+price)
                console.log('即将传值：'+this.go)

                // this.$emit('getGoodsId',this.gather)
            }
        }
    }
</script>

<style>
    #ContentCartTabBar img{
        width: 100%;
        height: 100%;
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
        /*//这里换成top:0;就悬浮在头部*/
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