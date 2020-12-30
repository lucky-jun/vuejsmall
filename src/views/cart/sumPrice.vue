<template>
    <div id="sumPrice">
        <div>总价格:{{}}</div>
    </div>
</template>

<script>
    export default {
        name: "sumPrice",
        props:{
            goods:{
                type:Array
            }
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>