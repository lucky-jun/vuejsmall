<template>
    <div>
        <div>我的订单</div>
        <frames v-for="(i,index) in goods">
            <div slot="inf">
                <frames-item v-for="(o,index) in i">
                    <img slot="item-picture"  :src="i[index].goo_image" alt="图片">
                    <span slot="item-name">{{i[index].goo_name}}</span>
                    <span slot="item-price">商品单价：{{i[index].goo_selling_price|sumPrice}}</span>
                    <span slot="item-number">购买数量：{{i[index].number}}</span>
                </frames-item>
            </div>
            <div slot="other">
                <frames-sumprice :sumPrice="sumPrice(index)" :createTime="i[0].creattime"></frames-sumprice>
<!--                <frames-sumprice></frames-sumprice>-->
            </div>
            <div slot="button">
<!--                <frames-button :paystate="i[index].paystate" :orderstate="i[index].orderstate"></frames-button>-->
                <frames-button :paystate="i[0].paystate" :orderstate="i[0].orderstate" :keys="i[0].ord_id"></frames-button>
<!--                <h3>{{i[index]}}</h3>-->
<!--                <h3>{{i[index].orderstate}}</h3>-->
<!--                <frames-button></frames-button>-->
            </div>
        </frames>
    </div>
</template>

<script>
    import Frames from "./components/Frames";
    import FramesButton from "./components/FramesButton";
    import FramesSumprice from "./components/FramesSumprice";
    import FramesItem from "./components/FramesItem";
    import {MessageBox,Button} from 'element-ui'
    import {request} from "../../../network";

    export default {
        name: "MyOrder",
        components:{
            Frames,
            FramesButton,
            FramesSumprice,
            FramesItem
        },
        data(){
            return{
                goods:Array,
                // number1:this.goods.length
            }
        },
        watch:{

        },
        computed:{
            // num(){
            //     let a=this.number1-1
            //     this.number1 =a
            //     return a
            // }
        },
        methods:{
            sumPrice(index){
                let a=0;
                let goods1 = this.goods[index]
                for(let i of goods1){
                    a+=i.sumprice
                }
                return a
            }
        },
        //过滤器
        filters:{
            sumPrice(price){
                return '￥'+price.toFixed(2)
            }
        },
        created() {
            console.log('进入我的订单界面');
            request({
                url:'/queryToMyOrder.do',
                data:{
                    userId:sessionStorage.getItem("userID"),
                    page:0,
                    limit:40
                },
                method:'post',
            }).then(res=>{
                console.log('我的订单界面请求数据');
                console.log(res);
                console.log(res.data);
                this.goods = res.data
            }).catch(err=>{
                console.log('我的订单界面请求失败');
                console.log(err);
            })
        }
    }
</script>

<style scoped>

</style>