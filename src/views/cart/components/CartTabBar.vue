<template>
    <div id="cartTabBar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "CartTabBar"
    }
</script>

<style scoped>
    #cartTabBar{
        /*border: 2px solid red;*/
        /*width: 100%;*/
        margin-top: 10px;
        min-width: 1000px;
        /*width: ;*/
        /*width:expression_r(document.body.clientWidth < 1000 ? "1000px": "auto" );*/
        /*display: flex;*/
        /*background-color: #80e4b791;*/

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
    }
</style>