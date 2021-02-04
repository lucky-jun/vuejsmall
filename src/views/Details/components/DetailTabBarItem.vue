<template>
    <div id="DetailTabBarItem">
        <div id="inf">
            <!--        图片-->
            <div id="picture"><slot name="item-picture"></slot></div>
            <div id="inf1">
                <!--        标题名称-->
                <div id="title"><slot name="item-title"></slot></div>
                <!--        价格-->
                <div id="price"><slot name="item-price"></slot></div>
                <!--        操作：加入购物车、直接购买-->
                <div id="shuxing"><slot name="item-shuxing"></slot></div>
                <div id="oprations">
                    <el-button type="primary" icon="el-icon-shopping-cart-2"  plain @click="joinCart">加入购物车</el-button>
                    <el-button type="primary" icon="el-icon-goods"  plain @click="buy">购买</el-button>
                    <el-button type="primary" icon="el-icon-star-off"  plain @click="insertFavorite">收藏商品</el-button>
                </div>
            </div>
        </div>
<!--        详情内容-->
        <div id="context">
            <div>
                <el-row :gutter="20">
                    <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center" @click="detailsBtn">图文描述</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center" @click="parameterBtn">详细参数</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center" @click="evaluateBtn"> 评 价 </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center" @click="problemBtn"> 问一问 </div></el-col>
                </el-row>
            </div>
            <div style="margin-left: 10px;margin-bottom: 100px;text-align: center">
                <slot name="details" v-if="show=='details'"></slot>
                <slot name="parameter" v-else-if="show=='parameter'"></slot>
                <slot name="evaluate" v-else-if="show=='evaluate'"></slot>
                <slot name="problem" v-else-if="show=='problem'"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../../../network";
    import {MessageBox} from "element-ui";

    export default {
        name: "DetailTabBarItem",
        props:{
            goods1:{
                id:5,
                img:"//img10.360buyimg.com/seckillcms/s250x250_jfs/t1/151148/36/13226/146005/5feb0c7aE08af0da9/fd628191f0e43cf5.jpg",
                name:'商品5',
                price:23.1,
                number:1,
            },
            number:Number
        },
        // props:{
        //     goods2:Array
        // },
        data(){
            return{
                // goods:[{}],
                goods:this.goods1,
                xxxx:[1,2,3,4,5],
                goods2:[{
                    goodsId:'',
                    goodsNumber:1
                }],
                show:"details",
                goodsToBuy:[]
            }
        },
        methods:{
            joinCart(){
                console.log('将商品ID加入购物车表');
                // axios

                //全部成功才算成功
                // Promise.all([
                //     //添加购物车
                //     new Promise((resolve,reject) => {
                //         //加入购物车单
                //         request({
                //             url:'insertToCart',
                //             method:'post',
                //             data:{
                //                 goodsId:this.goods[0].id,
                //                 userId:this.sessionStorage.getItem('userID'),
                //                 goodsNumber:1
                //             }
                //         }).then(res=>{
                //             resolve(res)
                //         }).catch(err=>{
                //             reject(err)
                //         })
                //     }),
                //     new Promise((resolve,reject) =>{
                //         // 删除购物车单
                //         request({
                //             url:'deleteToCart',
                //             method:'post',
                //             data:{
                //
                //             }
                //         }).then(res=>{
                //             resolve(res)
                //         }).catch(err=>{
                //             reject(err)
                //         })
                //     } )
                // ]).then().catch()

                console.log(sessionStorage.getItem('userID') === null);
                console.log(sessionStorage.getItem('userID') == null);
                console.log('请求参数goodsId：'+this.goods1.goo_id);
                console.log('请求参数userId：'+sessionStorage.getItem('userID'));
                console.log('请求参数goodsNumber：'+1);

                if(sessionStorage.getItem('userID')!=null){
                    request({
                        url:'/insertToCart.do',
                        method:'post',
                        data:{
                            goodsId:this.goods1.goo_id,
                            userId:sessionStorage.getItem('userID'),
                            goodsNumber:this.number
                        }
                    }).then(res=>{
                        console.log("请求成功："+res);
                        console.log(res.flag);
                        if(res.flag){
                            console.log('添加购物车操作成功');
                            //    弹窗确认是否支付
                            // MessageBox.alert('加入购物车成功')
                            // setTimeout(() => {
                            //     MessageBox.close();
                            // }, 600);
                            this.$message({
                                type:"success",
                                message:"加入购物车成功"
                            })
                        }else{
                            // console.log('添加购物车操作失败.then');
                            // MessageBox.alert('添加购物车操作失败')
                            // setTimeout(() => {
                            //     MessageBox.close();
                            // }, 600);
                            this.$message({
                                type:"error",
                                message:"添加购物车操作失败"
                            })
                        }
                        // 短暂alert()
                    }).catch(err=>{
                        console.log(err);
                        console.log('添加购物车操作失败.catch');
                    })
                }else{
                    this.$router.push('/login')
                }

            },
            buy(){
                if(sessionStorage.getItem('userID')!=null){
                    console.log("数量："+this.number);
                    console.log(this.goods);
                    console.log('即将跳转购买界面');
                    //    跳转购买界面
                    //     this.$router.push({path:'/buygoods',query:{goods:JSON.stringify(this.goods1)}})
                    this.goods[0].number = this.number;
                    this.goodsToBuy.push(this.goods)
                    console.log(this.goods);
                    console.log(this.goodsToBuy);
                    // Object转换数组
                    // var arr = [];
                    // for(var key in this.goods){
                    //     if(!this.goods.hasOwnProperty(key)){
                    //         continue;
                    //     }
                    //     var item = {};
                    //     item[key] = this.goods[key];
                    //     arr.push(item);
                    // }
                    // console.log("----------------------")
                    // console.log(arr)
                    // this.$router.push({path:'/buygoods',query:{goods:this.goodsToBuy}})
                    this.$router.push({path:'/buygoods',query:{goods:this.goods}})
                }else{
                    this.$router.push('/login')
                }
            },
            insertFavorite(){
                console.log(this.goods)
                request({
                    url:"/insertToFavoriteIndetail.do",
                    method:"post",
                    data:{
                        fav_gooid:this.goods[0].goo_id,
                        fav_userid:sessionStorage.getItem("userID")
                    }
                }).then(res=>{
                    console.log("请求成功");
                    console.log(res)
                    console.log(res.flag);
                    if(res.flag){
                        this.$message({
                            type:"success",
                            message:"收藏成功"
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:"收藏失败"
                        })
                    }
                }).catch(err=>{
                    console.log("请求失败")
                    console.log(err)
                })
            },
            detailsBtn(){
                this.show = "details"
            },
            parameterBtn(){
                this.show = "parameter"
            },
            evaluateBtn(){
                this.show = "evaluate"
            },
            problemBtn(){
                this.show = "problem"
            },
        },
        watch:{
            goods1(val){
                this.goods[0] = val
                console.log(this.goods);
            }
        }
    }
</script>

<style scoped>
#DetailTabBarItem{
    width: 1070px;
    height: 650px;
    /*background: #2b4b6b;*/
}
    #inf{
        /*display: flex;*/
        height: 650px;
        width: auto;
        margin: 10px;
        /*border: 2px solid red;*/
    }
    #picture{
        width: 470px;
        height: 100%;
        float: left;
        border: 2px solid #e4dada7a;
    }
    #inf1{
        width: 550px;
        height: 100%;
        float: left;
        margin-left: 10px;
        /*border: 2px solid red;*/
    }
    #title{
        text-align: center;
        width: 100%;
        height: 80px;
        border: 2px solid #e4dada7a;
    }
    #price{
        text-align: center;
        width: 100%;
        height: 80px;
        margin-top: 9px;
        border: 2px solid #e4dada7a;
    }
    #shuxing{
        width: 100%;
        height: 350px;
        margin-top: 9px;
        border: 2px solid #e4dada7a;
    }
    #oprations{
        width: 100%;
        height: 100px;
        border: 2px solid #e4dada7a;
        text-align: center;
        margin-top: 9px;
    }


    #context{
        margin-left: 10px;
        /*margin-bottom: 300px;*/
        width: auto;
        height: auto;
        border: 2px solid #e4dada7a;
    }
.el-row {
    margin-bottom: 20px;
&:last-child {
     margin-bottom: 0;
 }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>