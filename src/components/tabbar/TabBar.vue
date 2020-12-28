<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
    #tab-bar{
        display: flex;
        background-color: #42b983;

        /*position: fixed;*/
        left: 0;
        right: 0;
        top: 0;
    }
</style>