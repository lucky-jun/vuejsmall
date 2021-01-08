<template>
    <div>
        <div>我的订单</div>
        <frames>
            <div slot="inf">
<!--                <frames-item v-for="(i,index)in goods">-->
<!--                    <img slot="item-picture"  :src="i.goo_image" alt="图片">-->
<!--                    <span slot="item-name">{{i.goo_name}}</span>-->
<!--                    <span slot="item-price">商品单价：{{i.goo_selling_price|sumPrice}}</span>-->
<!--                    <span slot="item-number">购买数量：{{i.number}}</span>-->
<!--                </frames-item>-->
            </div>
            <div slot="button">
                <frames-button></frames-button>
            </div>
        </frames>
    </div>
</template>

<script>
    import Frames from "./components/Frames";
    import FramesButton from "./components/FramesButton";
    import FramesItem from "./components/FramesItem";
    import {MessageBox,Button} from 'element-ui'
    import {request} from "../../../network";

    export default {
        name: "MyOrder",
        components:{
            Frames,
            FramesButton,
            FramesItem
        },
        data(){
            return{
                goods:Array
            }
        },
        watch:{

        },
        computed:{

        },
        methods:{

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