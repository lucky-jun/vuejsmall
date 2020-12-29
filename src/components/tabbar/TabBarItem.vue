<template>
<!--    创建小按钮点击事件-->
    <div class="tab-bar-item" @click="divClic">
<!--        创建正常显示具名插槽-->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
<!--        创建被点击时插槽-->
        <div v-else><slot name="item-icon-active"></slot></div>
<!--        创建文字动态绑定被点击效果和插槽-->
        <div :style="activeFonts"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
          path:String,
          activeColor:{
            type:String,
            default:'red'
          }
        },
        computed:{
            isActive(){
                // console.log(this.path);
                // console.log('2222:'+this.$route.path);
                // console.log(this.$route.path.indexOf(this.path) !=-1);
                return this.$route.path.indexOf(this.path) !=-1
            },
            activeFonts(){
                return this.isActive?{color:this.activeColor}:{}
            }
        },
        methods:{
            divClic(){
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
        margin-top: 2px;
    }
</style>