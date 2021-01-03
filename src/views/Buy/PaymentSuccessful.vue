<template>
    <div>
        <h1>支付成功</h1>
    </div>
</template>

<script>
    export default {
        name: "PaymentSuccessful",
        created() {
            setTimeout(()=>{
                this.$router.replace('/profile')
            },5000)
        }
    }
</script>

<style scoped>

</style>