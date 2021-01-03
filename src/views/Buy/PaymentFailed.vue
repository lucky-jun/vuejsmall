<template>
    <div>
        <h1>支付失败</h1>
    </div>
</template>

<script>
    export default {
        name: "PaymentFailed",
        created() {
            setTimeout(()=>{
                this.$router.replace('/profile')
            },5000)
        }
    }
</script>

<style scoped>

</style>