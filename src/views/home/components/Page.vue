<template>
    <div class="block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="40"
                layout="total, prev, pager, next"
                :total="length">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Page",
        props:{
            length:Number
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                 console.log(`当前页: ${val}`);
                 this.$emit('page',val)
            }
        },
        data() {
            return {
                size:this.length+3,
                currentPage1: 1,
                // currentPage2: 5,
                // currentPage3: 5,
                // currentPage4: 4
            };
        }
    }
</script>

<style scoped>
.block{
    text-align: center;
}
</style>