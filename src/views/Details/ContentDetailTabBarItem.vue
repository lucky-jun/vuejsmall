<template>
    <div id="ContentDetailTabBarItem">
        <DetailTabBar>
            <DetailTabBarItem :goods1="this.goods">
                <img slot="item-picture" :src="goods.goo_image" alt="图片">
                <span slot="item-title">{{goods.goo_name}}</span>
                <span slot="item-price">{{goods.goo_selling_price}}</span>
                <div slot="item-shuxing">
                    <p>商品属性1{{goods}}</p>
                    <p>商品属性1</p>
                    <p>商品属性1</p>
                    <p>商品属性1</p>
                    <p>商品属性1</p>
                    <p>商品属性1</p>
                    <p>商品属性1</p>
                </div>
                <div slot="item-context">
                    <p>图片1</p>
                    <p>图片2</p>
                    <p>图片3</p>
                    <p>图片4</p>
                </div>
            </DetailTabBarItem>
        </DetailTabBar>
    </div>
</template>

<script>
    import DetailTabBar from "./components/DetailTabBar";
    import DetailTabBarItem from "./components/DetailTabBarItem";

    export default {
        name: "ContentDetailTabBarItem",
        components:{
            DetailTabBar,
            DetailTabBarItem
        },
        props:{
            goods1:{
                id:5,
                img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                name:'商品5',
                price:23.1,
                number:1,
            }
            // goods1:Array
        },
        data(){
            return{
                goods:this.goods1
                // goods:{
                //     id:5,
                //     img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                //     name:'商品5',
                //     price:23.1,
                //     number:1,
                // }
            }
        },
        methods:{

        },
        watch:{
            goods1(val){
                this.goods = this.goods1
                console.log("22222111111")
                console.log(this.goods);
                immediate: true
            }
        }
    }
</script>

<style scoped>
#ContentDetailTabBarItem{
    /*background: #f1e5e5;*/
    /*width: 600px;*/
    /*height: 700px;*/
}
#ContentDetailTabBarItem img{
    /*background: #f1e5e5;*/
    /*width: 600px;*/
    /*height: 700px;*/
    width: 100%;
    height: 100%;
}
</style>