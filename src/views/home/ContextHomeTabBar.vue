<template>
    <home-tab-bar id="sezhi">
        <home-tab-bar-item v-for="(i,index) in goods" :goods1="goods" :index1="index">
            <img slot="item-picture" :src="i.img">
            <span slot="item-price">{{i.price|showPrice}}</span>
            <span slot="item-title">{{i.name}}</span>
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
            goods1:{
                type:Array
            },
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
                return '￥'+price.toFixed(2)
            }
        }


    }
</script>

<style scoped>
#sezhi img{
    width: 100%;
}
</style>