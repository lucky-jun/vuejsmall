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
                    <input slot="item-choice" type="checkbox" :value="i" v-model="goodsCheckBox"></input>
                    <img slot="item-picture" :src="i.goo_image" alt="图片">
                    <div slot="item-name">{{i.goo_name}}</div>
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
            <div id="SumPrice">总价格：{{sum|showPrice}}</div>
            <div id="PaySumPrice">
                <button @click="PaySum">结算</button>
            </div>
        </div>
    </div>
</template>

<script>
    import CartTabBar from "./components/CartTabBar";
    import CartTabBarItem from "./components/CartTabBarItem";
    import {MessageBox} from "element-ui"

    export default {
        name: "ContentCartTabBar",
        props:{
            goods1: {
                type:Array,
                default:()=>{}
            }
            // goods1:Object
        },
        data(){
            return{
                goods:this.goods1,
                goodsCheckBox:[],
                goodsId:[]
            }
        },
        watch:{
            goods1(newValue,oldValue){
                console.log("2222222222")
                console.log(newValue)
                console.log(oldValue)
                this.goods= newValue
                // this.goods = this.goods1
            }
        },
        created() {
            console.log('3333333333')
            console.log(this.goods);
                console.log(this.goods1)
        //     this.goods = JSON.parse(JSON.stringify(this.goods1))
        //     console.log(this.goods);
        //     console.log(this.goods1.length)
        //     console.log(JSON.stringify(this.goods1))
        //     console.log(JSON.stringify(this.goods1))
        //     console.log(JSON.parse(JSON.stringify(this.goods1)))
        //     for(let i in JSON.parse(JSON.stringify(this.goods1))){
        //         this.goods[i]= this.goods1[i]
        //         console.log("==========")
        //         // console.log(this.goods);
        //     }
        //     console.log(this.goods)
        },
        computed:{
            sum(){
                //将点击勾选的商品加入数组中，然后获取数组中的商品的价格计算出来
                let SumPrice=0
                SumPrice=this.goodsCheckBox.reduce(function(pre,goods){
                    return pre + goods.goo_selling_price * goods.number
                },0)
                // console.log("reduce简写："+SumPrice);
                return SumPrice;
            }
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
                return (this.goods[index].number*this.goods[index].goo_selling_price).toFixed(2)
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
            PaySum(){
                // console.log(this.goodsCheckBox)
                // for(let item of this.goodsCheckBox){
                //     this.goodsId.push(item.id)
                // }
                // console.log(this.goodsId);
                console.log(this.goodsCheckBox);
                // for(let i in this.goodsCheckBox){
                //     this.toOrder[i].goo_id = this.goodsCheckBox[i].goodsId
                //     this.toOrder[i].goo_image = this.goodsCheckBox[i].img
                //     this.toOrder[i].goo_name = this.goodsCheckBox[i].name
                //     this.toOrder[i].goo_selling_price = this.goodsCheckBox[i].price
                //     this.toOrder[i].goo_stock = this.goodsCheckBox[i].goo_stock
                //     this.toOrder[i].number = this.goodsCheckBox[i].number
                //     this.toOrder[i].userId = this.goodsCheckBox[i].userId
                // }

                console.log("this.toOrder");
                // console.log(this.toOrder);
                console.log(this.goodsCheckBox.length);
                console.log(this.goodsCheckBox.length>0);
                if(this.goodsCheckBox.length>0){
                    this.$router.push({path:'/buygoods',query:{goods:this.goodsCheckBox}})
                }else{
                    MessageBox.alert('未选择商品')
                    setTimeout(()=>{MessageBox.close()},1000)
                }
            }
        },
        filters:{
            showPrice(price){
                return '￥'+price.toFixed(2)
            }
        }
    }
</script>

<style>
    #ContentCartTabBar{
        position: relative;
        border: 2px solid red;
    }

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
        /*width: 1310px;*/
        width: 200px;
        height: 49px;
        /*margin-left: 9px;*/
        border: 2px solid red;
        display: flex;
        text-align: center;
        justify-content:space-between;
        /*上下居中*/
        align-items:center;

        /*    悬浮*/

        /*left: 130px;*/
        position: fixed;
        /*position: absolute;*/
        /*//这里换成top:0;就悬浮在头部*!*!*/
        bottom: 0px;
        margin:  0 auto;
        left:0px;
        /*width: 100%;*/
        /*z-index: 100;*/

        /*position:fixed;*/
        /*top:0px;*/
        /*float:inherit;*/






    }
    #SumPrice{
        float: left;
        text-align: center;
        /*margin-left: 500px;*/
    }
    #PaySumPrice{
        float: right;
        /*margin-right: 60px;*/
    }
</style>