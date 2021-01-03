<template>
    <div>
        <h1>111111111</h1>
    </div>
</template>

<script>
    export default {
        beforeRouteLeave (to, from, next) {
            // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
            this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 正常跳转
                next()
            }).catch(() => {
                // 如果取消跳转地址栏会变化，这时保持地址栏不变
                window.history.go(1)
            })
        }
    }
</script>

<style scoped>

</style>