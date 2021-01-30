<template>
    <div>
        <div id="goods">
            <slot name="goods"></slot>
        </div>
        <div id="address">
            <slot name="address"></slot>
        </div>
        <div id="option">
            <slot name="option"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BuyTabBar"
    }
</script>

<style scoped>
    #option{
        float: bottom;
    }
</style>