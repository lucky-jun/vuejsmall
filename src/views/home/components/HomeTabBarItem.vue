<template>
    <div id="homeItem">
        <div id="picture"><slot name="item-picture"></slot></div>
        <div id="price"><slot name="item-price"></slot></div>
        <div id="title"><slot name="item-title"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "HomeTabBarItem"
    }
</script>

<style scoped>
    #homeItem{
        width: 240px;
        height: 400px;
        padding: 5px;
    }
    #picture{
        width: 230px;
        height: 270px;
        margin-bottom: 5px;
    }
    #price{
        width: 230px;
        height: 35px;
        margin-bottom: 5px;
    }
    #title{
        width: 230px;
        height: 55px;
    }
</style>