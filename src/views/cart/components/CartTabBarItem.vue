<template>
    <div id="CartTabBarItem" class="GongGong">
<!--        复选框-->
        <div id="choice" class="GongGong"><slot name="item-choice"></slot></div>
<!--        图片-->
        <div id="picture" class="GongGong" @click="GoodsDetails"><slot name="item-picture"></slot></div>
<!--        名字-->
        <div id="name" class="GongGong" @click="GoodsDetails"><slot name="item-name"></slot></div>
<!--        价格-->
        <div id="price" class="GongGong"><slot name="item-price"></slot></div>
<!--        数量操作-->
        <div id="InAndDe" class="GongGong">
            <slot name="item-number"></slot>
        </div>
        <div id="oprations1">
<!--            <div class="btn">-->
                <button @click="palyBtn()">结算</button>
                <button @click="deleteBtn()">删除</button>
                <button @click="collectBtn()">移入收藏</button>
<!--            </div>-->
<!--            <div><button @click="palyBtn">结算</button></div>-->
<!--            <div><button @click="deleteBtn">删除</button></div>-->
<!--            <div><button @click="collectBtn">加入收藏</button></div>-->
        </div>
    </div>
</template>

<script>
    import {request} from "../../../network";

    export default {
        // 父子通信
        name: "CartTabBarItem",
        props:{
            index:Number,
            // id:Number
            // goods:{
            //     type:Array
            // }
            // goods: [Array,Object],
            goods:Object,
            chioceState1:true
        },
        data(){
            return{
                Cindex:this.index,
                chioceState:this.chioceState1,
                goodsI:this.goods,
                goodsnini:[]
            }
        },
        watch:{
            index(val,oldval){
                console.log(val)
                console.log(oldval)
                this.Cindex = val
            }
        },
        computed:{
            sumprice(){
                return this.goods.number*this.goods.price
            }
        },
        methods:{
            GoodsDetails(){
                console.log('即将跳转商品详情页');
                console.log(this.Cindex);
                console.log(this.goods)
                // console.log('点击了：'+this.goods[this.Cindex].id)
                // console.log('点击了：'+this.goods[this.Cindex].name)
                //通过query进行数据传递
                this.$router.push({path:'/details',query:{goodsName:this.goods.goo_name,goodsId: this.goods.car_gooid}})
            //    动态路由跳转
            //     this.$router.push('/details/'+this.id)
            },
            increment(){
                // this.goods.number++
            },
            decrement(){
                // this.goods.number--
            },
            deleteBtn(){
                console.log('即将删除第：'+(this.Cindex+1)+'个商品');
                console.log('即将删除ID为：'+this.Cid);
                console.log(this.goods);
                request({
                    url:"/deleteToMyCart.do",
                    method:"post",
                    data:{
                        car_gooid:this.goods.car_gooid,
                        user_id:sessionStorage.getItem("userID")
                    }
                }).then(res=>{
                    console.log("请求成功");
                    console.log(res);
                    console.log(res.flag);
                    if(res.flag){
                        this.$message({
                            type:"success",
                            message:"删除成功"
                        })
                        setTimeout(()=>{
                            this.$router.go(0)
                        },700)
                    }else{
                        this.$message({
                            type:"error",
                            message:"删除失败"
                        })
                    }
                }).catch(err=>{
                    console.log("请求失败")
                    console.log(err)
                })
            },
            collectBtn(){
                console.log('收藏商品第：'+(this.Cindex+1)+'个商品');
                console.log(this.goods)
                request({
                    url:"/insertToFavorite.do",
                    method:"post",
                    data:{
                        fav_gooid:this.goods.car_gooid,
                        fav_userid:sessionStorage.getItem("userID")
                    }
                }).then(res=>{
                    console.log("请求成功");
                    console.log(res)
                    console.log(res.flag);
                    if(res.flag){
                        this.$message({
                            type:"success",
                            message:"移入成功"
                        })
                        setTimeout(()=>{
                            this.$router.go(0)
                        },700)
                    }else{
                        this.$message({
                            type:"error",
                            message:"移入失败"
                        })
                    }
                }).catch(err=>{
                    console.log("请求失败")
                    console.log(err)
                })
            },
            palyBtn(){
                console.log("结算第"+(this.Cindex+1)+"个商品")
                console.log(this.goods)
                this.goods.sump = this.goods.number * this.goods.goo_selling_price
                this.goodsnini.push(this.goods)
                console.log(this.goodsnini)
                this.$router.push({path:'/buygoods',query:{goods:this.goodsnini}})
            }
        }
    }
</script>

<style scoped>
    .GongGong{
        position: relative;
        display: flex;
        text-align: center;
        /*justify-content: space-between;*/
        /*左右居中*/
        justify-content:center;
        /*上下居中*/
        align-items:center;
    }
    .btn{
        margin: 0 auto;
        padding-top: 20px;
    }
    #CartTabBarItem{
        height: 140px;
        /*width: 1580px;*/
        /*max-width: 1600px;*/
        min-width: auto;
        border: 2px solid #e4dada7a;
        justify-content: space-between;
        display: flex;
        margin-bottom: 10px;
    }
    #choice{
        height: 100%;
        width: 30px;
        border: 2px solid red;
    }
    #picture{
        height: 100%;
        width: 100px;
        border: 2px solid red;
    }
    #name{
        height: 100%;
        width: 700px;
        /*border: 2px solid red;*/
    }
    #price{
        height: 100%;
        width: 100px;
        /*border: 2px solid red;*/
    }
    #InAndDe{
        height: 100%;
        width: 200px;
        /*border: 2px solid red;*/
    }
    #oprations1{
        display: flex;
        height: 100%;
        width: 150px;
        /*border: 2px solid red;*/
        /*justify-content: space-between;*/
        /*margin-top: 50%;*/
        /*左右居中*/
        /*justify-content:center;*/
        /*上下居中*/
        align-items:center;
        /*上下居中*/
        /*text-align: center;*/

        /*justify-content: center;*/
        /*display: flex;*/
    }

/*    */
/*.CartTabBarItem{*/
/*    border: 2px solid blue;*/
/*    display: flex;*/
/*    flex: 1;*/
/*    text-align: center;*/
/*    !*justify-content: space-between;*!*/
/*    width: 100%;*/
/*    !*height: 100px;*!*/
/*    font-size: 20px;*/
/*    margin-top: 5px;*/
/*    height:140px;*/
/*    !*padding-bottom:40px;*!*/
/*    !*display:flex;*!*/
/*}*/
/*    .GongGong1{*/
/*        border: 3px solid red;*/
/*        display:flex;*/
/*        !*左右居中*!*/
/*        justify-content:center;*/
/*        !*上下居中*!*/
/*        align-items:center;*/
/*    }*/
/*    .GongGong2{*/
/*        margin-right:20px;*/
/*        margin-left:20px;*/
/*    }*/
/*    .picture{*/
/*        height: 100%;*/
/*        width: 100px;*/
/*    }*/
/*    .item{*/
/*        display: flex;*/
/*        border: 2px solid red;*/
/*        text-align: center;*/
/*    }*/
</style>