<template>
    <div v-if="show">
        <div id="tabbar">
            <div id="CartTabBarItem" class="GongGong" v-for="(i,index) in goods">
                <!--        复选框-->
                <div id="choice" class="GongGong">
<!--                    <input slot="item-choice" name="checkbox" type="checkbox" :value="i" v-model="goodsCheckBox"></input>-->
                </div>
                <!--        图片-->
                <div id="picture" class="GongGong" @click="GoodsDetails(i)">
                    <img slot="item-picture" :src="i.goo_image" alt="图片">
                </div>
                <!--        名字-->
                <div id="name" class="GongGong" @click="GoodsDetails(i)">
                    <div slot="item-name">{{i.goo_name}}</div>
                </div>
                <!--        价格-->
                <div id="price" class="GongGong">
                    <div slot="item-price">{{i.goo_selling_price}}</div>
                </div>
                <!--        操作-->
                <div id="oprations">
                    <el-row>
                        <el-button type="primary" icon="el-icon-shopping-cart-2"  plain @click="insertToMyCart(i)">加入购物车</el-button>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-button type="danger" icon="el-icon-delete" plain  @click="deleteMyFavorite(i)">移出收藏夹</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>未收藏任何商品，去浏览商品收藏吧</h1>
    </div>
</template>

<script>
    import {request} from "../../../network";

    export default {
        name: "myFavorite",
        data(){
            return{
                goods:[],
                goodsCheckBox:[]
            }
        },
        created() {
            request({
                url:"/queryFavoriteByUserAll.do",
                method:"post",
                data:{
                    fav_userid: sessionStorage.getItem("userID")
                }
            }).then(res=>{
                console.log("请求成功");
                this.goods = res.data
                console.log(this.goods)
            }).catch(err=>{
                console.log("请求失败");
                console.log(err)
            })
        },
        computed:{
            show(){
                if(this.goods.length>0){
                    return true
                }else{
                    return false
                }
            }
        },
        methods:{
            GoodsDetails(i){
                this.$router.push({path:'/details',query:{goodsName:i.goo_name,goodsId: i.goo_id}})
            },
            insertToMyCart(i){
                if(sessionStorage.getItem('userID')!=null){
                    request({
                        url:'/insertToCart.do',
                        method:'post',
                        data:{
                            goodsId:i.goo_id,
                            userId:sessionStorage.getItem('userID'),
                            goodsNumber:1
                        }
                    }).then(res=>{
                        console.log("请求成功："+res);
                        console.log(res.flag);
                        if(res.flag){
                            console.log('添加购物车操作成功');
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
            deleteMyFavorite(i){
                request({
                    url:"/deleteMyFavorite.do",
                    method:"post",
                    data:{
                        fav_gooid:i.goo_id,
                        fav_userid:sessionStorage.getItem("userID")
                    }
                }).then(res=>{
                    console.log(res);
                    if (res.flag){
                        this.$message({
                            type:"success",
                            message:"移除成功"
                        })
                        setTimeout(()=>{
                            this.$router.go(0)
                        },700)
                    }else{
                        this.$message({
                            type:"success",
                            message:"移除失败"
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                    console.log("有错误")
                })

            },
        }
    }
</script>

<style scoped>
    #tabbar{
        margin-top: 10px;
        min-width: 1000px;
    }
    .GongGong{
        position: relative;
        display: flex;
        text-align: center;
        /*左右居中*/
        justify-content:center;
        /*上下居中*/
        align-items:center;
    }
    #CartTabBarItem{
        margin-left: 210px;
        height: 140px;
        width: 1500px;
        border: 2px solid #e4dada7a;
        justify-content: space-between;
        display: flex;
        margin-bottom: 10px;
    }
    #choice{
        height: 100%;
        width: 30px;
    }
    #picture{
        height: 100%;
        width: 100px;
    }
    #picture img{
        height: 100%;
        width: 100%;
    }
    #name{
        height: 100%;
        width: 700px;
    }
    #price{
        height: 100%;
        width: 100px;
    }
</style>