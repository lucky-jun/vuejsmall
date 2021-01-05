<template>
    <div id="BuyTabBarItem" class="GongGong">
        <!--        图片-->
        <div id="picture" class="GongGong"><slot name="item-picture"></slot></div>
        <!--        名字-->
        <div id="name" class="GongGong"><slot name="item-name"></slot></div>
        <!--        价格-->
        <div id="price" class="GongGong"><slot name="item-price"></slot></div>
        <!--        数量-->
        <div id="number" class="GongGong"><slot name="item-number"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "BuyTabBarItem"
    }
</script>

<style scoped>
    .GongGong{
        position: relative;
        display: flex;
        text-align: center;
        /*justify-content: space-between;*/
        /*左右居中*/
        justify-content:center;
        /*上下居中*/
        align-items:center;
    }
    #BuyTabBarItem{
        height: 140px;
        /*width: 1580px;*/
        /*max-width: 1600px;*/
        min-width: auto;
        border: 2px solid #e4dada7a;
        justify-content: space-between;
        display: flex;
        margin-bottom: 10px;
    }
    #BuyTabBarItem img{
        width: 100%;
        height: 100%;
    }
    #picture{
        height: 100%;
        width: 100px;
        border: 2px solid red;
    }
    #name{
        height: 100%;
        width: 700px;
        /*border: 2px solid red;*/
    }
    #number{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
    #price{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
</style>