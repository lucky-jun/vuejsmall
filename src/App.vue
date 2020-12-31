<template>
    <div id="app">
        <div id="tabbar">
            <main-tab-bar></main-tab-bar>
        </div>
        <div id="router">
            <router-view></router-view>
        </div>
<!--        <div id="tab-bar">-->
<!--            <div class="tab-bar-item" path="/home" @click="btndiv">-->
<!--                <img src="./assets/img/svg/home.svg" alt="">-->
<!--                <div>首页</div>-->
<!--            </div>-->
<!--            <div class="tab-bar-item" path="/home" @click="btndiv">-->
<!--                <img src="./assets/img/svg/home.svg" alt="">-->
<!--                <div>首页</div>-->
<!--            </div>-->
<!--            <div class="tab-bar-item" path="/home" @click="btndiv">-->
<!--                <img src="./assets/img/svg/home.svg" alt="">-->
<!--                <div>首页</div>-->
<!--            </div>-->
<!--            <div class="tab-bar-item" path="/home" @click="btndiv">-->
<!--                <img src="./assets/img/svg/home.svg" alt="">-->
<!--                <div>首页</div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import MainTabBar from "./components/MainTabBar";
    export default {
        name: "App",
        components:{
            MainTabBar
        },
        methods:{
            btndiv(){
                console.log(this.path);
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
@import "assets/css/base.css";
    #tabbar{
        /*marg: 0px;*/
        /*float: top;*/
        /*border: 2px solid red;*/

    /*    悬浮*/
    /*    left: 0;*/
    /*    position: fixed;*/
        /*//这里换成top:0;就悬浮在头部*/
        /*top: 0;*/
        /*margin-left:130px;*/
    }
    #router{
        /*float: bottom;*/
        /*border: 2px solid blue;*/
    }
</style>