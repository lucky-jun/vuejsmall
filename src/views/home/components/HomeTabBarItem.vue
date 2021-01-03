<template>
    <div id="homeItem" @click="divDetails">
        <div id="picture"><slot name="item-picture"></slot></div>
        <div id="price"><slot name="item-price"></slot></div>
        <div id="title"><slot name="item-title"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "HomeTabBarItem",
        props:{
            goods1:{
                type:Array
            },
            index1:Number
        },
        data(){
            return {
                goods:this.goods1
            }
        },
        methods:{
            divDetails(){
                console.log('点击了商品，即将跳转详情页');
                console.log('点击了商品ID:'+this.goods[this.index1].id);
                //跳转商品详情页
                this.$router.push({path:'/details',query:{goodsName:this.goods[this.index1].name,goodsId: this.goods[this.index1].id}})

                //按id获取商品详情
                // this.$router.push()
            }
        }

    }
</script>

<style scoped>
    #homeItem{
        width: 235px;
        height: 385px;
        padding: 5px;
        margin: 10px;
        border: 2px solid #e4dada7a;

        float: left;
    }
    #picture{
        width: 230px;
        height: 270px;
        margin-bottom: 5px;
        /*border: 2px solid #e4dada7a;*/
    }
    #price{
        width: 230px;
        height: 35px;
        font-size: 20px;
        color: red;
        text-align: center;
        margin-bottom: 5px;
        /*border: 2px solid #e4dada7a;*/
    }
    #title{
        text-align: center;
        width: 230px;
        height: 55px;
        /*border: 2px solid #e4dada7a;*/
        /*word-break:normal;*/
        font-size: 20px;


        /*word-wrap: break-word;*/
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;



        /*white-space: nowrap;  !*!/需要注释掉*!*/
        /*overflow: hidden;!* //超出隐藏*!*/
        /*text-overflow: ellipsis; !* //文本超出，用ellipsis省略号*!*/
        /*//显示多行*!*!*/
        /*display: -webkit-box;!* 弹性盒模型 *!*/
        /*-webkit-box-orient: vertical;!* 元素垂直居中*!*/
        /*-webkit-line-clamp: 2;!*  文字显示的行数*!*/
    }
</style>