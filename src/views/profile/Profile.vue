<template>
    <div>
        <router-link to="/login" tag="button">登录</router-link>
        <router-link to="/regist" tag="button">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: "Profile"
    }
</script>

<style scoped>

</style>