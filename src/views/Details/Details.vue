<template>
    <div id="detail">
        <div v-if="isActive">
<!--            <h1>详情页</h1>-->
<!--            <h1>进入的商品详情名称：{{this.$route.query.goodsName}}</h1>-->
<!--            <h1>进入的商品详情ID：{{this.$route.query.goodsId}}</h1>-->
<!--            <ContentDetailTabBarItem :goods1="goods"></ContentDetailTabBarItem>-->
            <ContentDetailTabBarItem :goods1="goods"></ContentDetailTabBarItem>
        </div>
        <div v-else>
            <h1>商品ID有误！没有该商品！</h1>
        </div>
    </div>
</template>

<script>
    import ContentDetailTabBarItem from "./ContentDetailTabBarItem";
    import {request} from "../../network";

    export default {
        name: "Details",
        components:{
            ContentDetailTabBarItem
        },
        data(){
            return{
                isActive:true,
                goods:[{
                    id:5,
                    img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                    name:'商品5',
                    price:23.1,
                    number:1,
                }]
            }
        },
        methods:{
        },
        created() {
            console.log('进入详情页1')
            console.log(this.$route.query.goodsId===undefined);
            if(this.$route.query.goodsId===undefined){
                this.isActive = false
            }else{
                console.log('进入详情页2')
                request({
                    url:'/queryGoodsById.do',
                    method:'post',
                    data:{
                        goodsId:this.$route.query.goodsId
                    }
                }).then(res=>{
                    console.log(res)
                    this.goods=res.data
                }).then(err=>{
                    console.log(err);
                    console.log('获取商品详情发生错误')
                })
            }
        }
    }
</script>

<style scoped>

</style>