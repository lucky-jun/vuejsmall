<template>
    <cart-tab-bar>
        <cart-tab-bar-item v-for="(i,index) in goods" :goods="goods" :index="index">
            <el-checkbox slot="item-choice" ></el-checkbox>
            <img slot="item-picture" src="i.img" alt="图片">
            <div slot="item-name">{{i.name}}</div>
            <div slot="item-price">{{sumprice(index)}}</div>
            <div slot="item-number">
                <button  @click="decrementBtn(index)" :disabled="i.number<=1">-</button>
                {{i.number}}
                <button @click="incrementBtn(index)">+</button>
            </div>
        </cart-tab-bar-item>
    </cart-tab-bar>
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
                goodsIndex:[]
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
                console.log('deleteBtn点击了商品：'+this.data.goods[index].id);
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
            }
        }
    }
</script>

<style scoped>

</style>