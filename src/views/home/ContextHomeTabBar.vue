<template>
    <home-tab-bar id="sezhi">
        <home-tab-bar-item v-for="(i,index) in goods" :goods1="goods" :index1="index">
            <img slot="item-picture" :src="i.goo_image">
            <span slot="item-price">{{i.goo_buying_price}}</span>
            <span slot="item-title">{{i.goo_name}}</span>
        </home-tab-bar-item>
    </home-tab-bar>
</template>

<script>
    import HomeTabBar from "./components/HomeTabBar";
    import HomeTabBarItem from "./components/HomeTabBarItem";
    export default {
        name: "ContextHomeTabBar",
        components:{
            HomeTabBar,
            HomeTabBarItem
        },
        props:{
            goods1:Array,
            page1:Number
        },
        data(){
            return{
                goods:this.goods1
            }
        },
        methods:{

        },
        filters:{
            showPrice(price){
                console.log(price);
                return '￥'+price.toFixed(2)
            }
        },
        watch:{
            goods1(newValue){
                this.goods = newValue;
                immediate: true
            }
        }


    }
</script>

<style scoped>
#sezhi img{
    width: 100%;
}
</style>