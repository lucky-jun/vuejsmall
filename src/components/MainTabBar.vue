<template>
    <tab-bar>
        <tab-bar-item path="/home">
            <img slot="item-icon" src="../assets/img/svg/home.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/svg/home-active.svg" alt="">
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <img slot="item-icon" src="../assets/img/svg/category.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/svg/category-active.svg" alt="">
            <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart">
            <img slot="item-icon" src="../assets/img/svg/cart.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/svg/cart-active.svg" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile" active-color="blue">
            <img slot="item-icon" src="../assets/img/svg/profile.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/svg/profile-active.svg" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
    import TabBar from "./tabbar/TabBar";
    import TabBarItem from "./tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components: {TabBarItem, TabBar},
        comments:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>