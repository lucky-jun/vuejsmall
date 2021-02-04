<template>
    <div id="buy">
<!--        <h1 v-for="i in this.$route.query.goodsId">{{i}}</h1>-->
<!--        <h1>购买的商品信息为，是否取人购买</h1>-->

    <buy-tab-bar>
        <div slot="goods">
            <buy-tab-bar-item v-for="(i,index) in goods">
                <img slot="item-picture"  :src="i.goo_image" alt="图片">
                <span slot="item-name">{{i.goo_name}}</span>
                <span slot="item-price">商品单价：{{i.goo_selling_price|sumPrice}}</span>
                <span slot="item-number">购买数量：{{i.number}}</span>
            </buy-tab-bar-item>
            <div>
                <span>订单总价：{{sumprice|sumPrice}}</span>
<!--                <span>订单总价：{{sumprice}}</span>-->
            </div>
        </div>
        <div id="address1" slot="address">
            <!--单选项，选择自提，显示自提地址；选择邮寄，显示地址选择-->
            <!--点击提交订单，显示单选项，选择付款方式：支付宝，微信，银联，apple pay等-->
            <div id="addOption">
                <h3>收货方式</h3>
                <el-row>
                    <el-radio v-model="radio" label="1" border>上门自提</el-radio>
                </el-row>
                <el-row style="margin-top: 10px">
                    <el-radio v-model="radio" label="2" border>快递邮寄</el-radio>
                </el-row>
            </div>

            <div class="addressInf"  v-if="radio=='1'">
                <div style="margin-left: 10px;border: 2px solid #e4dada7a;width: 100%;height: 100%">
                    <p>联系人：赵先生</p>
                    <p>联系电话：13445678901</p>
                    <p>自提地址：广西南宁市西乡塘区鲁班路81号南宁市公安局西乡塘区分局</p>
                </div>
            </div>
            <div class="addressInf" v-else>
                <div style="float: left; margin-left:10px;width: 10%; height:100%;border: 2px solid #e4dada7a">
                    <el-button plain @click="choiceAddress">选择收货地址</el-button><br>
                    <el-button plain @click="manageAddress">管理收货地址</el-button><br>
                    <el-button plain @click="addAddress">添加收货地址</el-button>
                </div>
                <div style="float: left;width: 88%;margin-left: 10px; height:100%;border: 2px solid #e4dada7a">
                    <p>收货人：{{this.deliveryAddress[0].dla_name}}</p>
                    <p>联系电话：{{this.deliveryAddress[0].dla_tel}}</p>
                    <p>邮政编码：{{this.deliveryAddress[0].dla_postcode}}</p>
                    <p>收货地址：{{address}}</p>
                </div>
            </div>
        </div>
        <div id="option1" slot="option">
            <el-button type="primary" plain @click="cancelBtn">取消订单</el-button>
            <el-button type="primary" plain @click="submitBtn">提交订单</el-button>
        </div>
    </buy-tab-bar>
        <!--支付弹窗-->
        <el-dialog title="请选择付款方式" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <div>
                <el-radio v-model="radio1" label="支付宝" border>支付宝</el-radio>
                <el-radio v-model="radio1" label="微信" border>微信</el-radio>
                <el-radio v-model="radio1" label="Apple Pay" border>Apple Pay</el-radio>
                <el-radio v-model="radio1" label="银联" border>银联</el-radio>
                <el-radio v-model="radio1" label="到店支付" border>到店支付</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cleanpay">稍后支付</el-button>
                <el-button type="primary" @click="pay">确认支付</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../network";

    import {MessageBox} from "element-ui"

    import BuyTabBar from "./components/BuyTabBar";
    import BuyTabBarItem from "./components/BuyTabBarItem";
    import Dialog from "./components/Dialog"


    export default {
        name: "BuyGoods",
        components:{
            BuyTabBar,
            BuyTabBarItem
        },
        data(){
            return{
                goods:this.$route.query.goods,
                // goods2:this.$store.state.goods
                // goodsInf:[{
                //     goo_id:'',
                //     number:'',
                //     sump:''
                // }],
                goodsInf:[],
                radio:"2",
                dialogFormVisible:false, //弹出成dialog状态，
                radio1:"支付宝",
                deliveryAddress:[
                    {
                        dla_id:0,
                        dla_userid:0,
                        dla_name:"赵先生",
                        dla_tel:"13445678901",
                        dla_postcode:"530000",
                        dla_province:"广西壮族自治区",
                        dla_city:"南宁市",
                        dla_detailed:"西乡塘区大学东路188号广西民族大学",
                        dla_default:1
                    }
                    ]

            }
        },
        comments:{
            Dialog
        },
        computed:{
            sumprice(){
                    let sum=0
                    // console.log(this.goods.goo_selling_price);
                    // console.log(this.goods.number);
                    // console.log(this.goods)
                    // console.log(this.goods.length)

                console.log("11111")
                console.log(this.goodsInf)
                    this.goodsInf = this.goods
                console.log(this.goodsInf)
                    //
                    for(let i in this.goods){
                    //     console.log('asdfalsdjfalk')
                    //     console.log(this.goods[i]);
                    //     console.log(this.goods[i].goo_selling_price);
                    //     console.log(this.goods[i].number);
                    //     console.log(sum)
                    //
                    //
                    //         this.goodsInf[i].goo_id = this.goods[i].goo_id
                    //         this.goodsInf[i].number = this.goods[i].number
                        sum+=this.goods[i].goo_selling_price*this.goods[i].number
                        this.goodsInf[i].sump = this.goods[i].goo_selling_price*this.goods[i].number
                    //     console.log(sum)
                    //     console.log(this.goodsInf)
                    //
                    }

                    console.log("444444444444444444444444444")
                    console.log(this.goodsInf);
                    return sum
            },
            address(){
                return this.deliveryAddress[0].dla_province+this.deliveryAddress[0].dla_city+this.deliveryAddress[0].dla_detailed
            }
        },
        methods:{
            cancelBtn(){
            //    取消按钮，返回上一页
                this.$router.go(-1)
            },
            // //弹窗层 Start
            // ChildrenLogState(val){
            //     this.dialogVisible = val
            // },
            //提交按钮
            submitBtn(){
                console.log('请求参数goods:' + this.goodsInf);
                console.log('请求参数userId:' + sessionStorage.getItem('userID'));

                request({
                    url:'/insertToMyOrder.do',
                    method:'post',
                    data: {
                        goods:this.goodsInf,
                        userId:sessionStorage.getItem('userID'),
                        deliadd:this.address
                    }
                }).then(res=>{
                    console.log("请求成功："+res);
                    console.log(res.flag);
                    console.log(res.MyOrderId);
                    this.$store.commit({type:'setWaitOrderId',waitOrderId:res.MyOrderId})
                    console.log(res.MyOrderId);
                    console.log(this.$store.getters.getWaitOrderId);
                    console.log('请求提交成功');
                    //判断成功与否弹窗确认
                    if(res.flag){
                        this.$confirm("订单提交成功，是否立即支付订单?", "提示", {
                            confirmButtonText: "立即支付订单",
                            cancelButtonText: "稍后支付",
                            type: "warning"
                        }).then(res=>{

                            this.dialogFormVisible = true


/*                            console.log(res);
                            console.log('then');
                            console.log('请求参数OrderId：' + this.$store.getters.getWaitOrderId);
                            console.log('请求参数payState：' + '支付成功');
                            console.log('请求参数orderState：' + '等待发货');
                            request({
                                url:'/updateMyOrderToPay.do',
                                method: 'post',
                                data:{
                                    OrderId:this.$store.getters.getWaitOrderId,
                                    payState:'支付成功',
                                    orderState:'等待发货'
                                }
                            }).then(res=>{
                                console.log('请求成功:'+res);
                                MessageBox.alert('正在支付，请稍后。。。')
                                setTimeout(()=>{
                                    MessageBox.close();
                                    if(res.flag){
                                        MessageBox.alert('支付成功！即将返回上一页！','提示',{
                                            confirmButtonText: '确认',
                                                type: 'success',//success，error，info和warning
                                                callback: action => {
                                                    this.$router.go(-1)
                                            }
                                        })
                                        setTimeout(() => {
                                            MessageBox.close();
                                            this.$router.go(-1)
                                        }, 3000);
                                    }else{
                                        MessageBox.alert('支付失败', '提示', {
                                            confirmButtonText: '确认',
                                            type: 'error',//success，error，info和warning
                                            callback: action => {
                                                this.$router.replace('/profile')
                                            }
                                        })
                                        setTimeout(() => {
                                            MessageBox.close();
                                            this.$router.replace('/profile')
                                        }, 3000);
                                    }
                                },3000)
                            })*/
                        }).catch(err=>{
                            console.log(err);
                            console.log('err');
                            MessageBox.alert('订单未支付！即将返回上一页！','提示',{
                                confirmButtonText: '确认',
                                type: 'success',//success，error，info和warning
                                callback: action => {
                                    clearTimeout(sumbtnTime)
                                    this.$router.go(-1)
                                }
                            })
                            const sumbtnTime = setTimeout(() => {
                                MessageBox.close();
                                this.$router.go(-1)
                            }, 3000);
                        })
                    }
                })
            },
            choiceAddress(){
                this.$message({
                    type:"info",
                    message:"功能正在开发，敬请期待"
                })
            },
            manageAddress(){
                this.$message({
                    type:"info",
                    message:"功能正在开发，敬请期待"
                })
            },
            addAddress(){
                this.$message({
                    type:"info",
                    message:"功能正在开发，敬请期待"
                })
            },
            //提示是否关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit("dialogState",false)
                        MessageBox.alert('订单未支付！即将返回上一页！','提示',{
                            confirmButtonText: '确认',
                            type: 'success',//success，error，info和warning
                            callback: action => {
                                clearTimeout(handleCloseTime)
                                this.$router.go(-1)
                            }
                        })
                        const handleCloseTime = setTimeout(() => {
                            MessageBox.close();
                            this.$router.go(-1)
                        }, 3000);
                        // done();
                    })
                    .catch(_ => {});
            },
            pay(){
                request({
                    url:'/updateMyOrderToPay.do',
                    method: 'post',
                    data:{
                        OrderId:this.$store.getters.getWaitOrderId,
                        payState:'支付成功',
                        orderState:'等待发货'
                    }
                }).then(res=>{
                    console.log('请求成功:'+res);
                    // MessageBox.alert('正在支付，请稍后。。。')
                    this.$msgbox({
                        message:'正在支付，请稍后。。。',
                        showCancelButton:false,
                        showConfirmButton:false,
                        beforeClose:(() => {})
                    })
                    setTimeout(()=>{
                        MessageBox.close();
                        if(res.flag){
                            MessageBox.alert('支付成功！即将返回上一页！','提示',{
                                confirmButtonText: '确认',
                                type: 'success',//success，error，info和warning
                                callback: action => {
                                    clearTimeout(payYesTime)
                                    this.$router.go(-1)
                                }
                            })
                            const payYesTime = setTimeout(() => {
                                MessageBox.close();
                                this.$router.go(-1)
                            }, 3000);
                        }else{
                            MessageBox.alert('支付失败', '提示', {
                                confirmButtonText: '确认',
                                type: 'error',//success，error，info和warning
                                callback: action => {
                                    clearTimeout(payNoTime)
                                    this.$router.replace('/profile')
                                }
                            })
                            const payNoTime = setTimeout(() => {
                                MessageBox.close();
                                this.$router.replace('/profile')
                            }, 3000);
                        }
                    },3000)
                })
            },
            cleanpay(){
                MessageBox.alert('订单未支付！即将返回上一页！','提示',{
                    confirmButtonText: '确认',
                    type: 'success',//success，error，info和warning
                    callback: action => {
                        clearTimeout(cleanpayTime)
                        this.$router.go(-1)
                    }
                })
                const cleanpayTime = setTimeout(() => {
                    MessageBox.close();
                    this.$router.go(-1)
                }, 3000);
            }
        },
        //过滤器
        filters:{
            sumPrice(price){
                if(price != undefined){
                    return '￥'+price.toFixed(2)
                }
            }
        },
    //    获取商品ID进行展示点击购买,
        created() {
            console.log('-----------')
            // console.log(this.$route.query.goods);
            // console.log(this.$route.query.goods[0]);
            this.goods =this.$route.query.goods;
            console.log(this.goods);
            // console.log(this.goods.goo_image);
            // console.log(JSON.parse(this.$route.query.goods).goo_image);
            // console.log(this.$route.query.goods.goo_selling_price);
            // console.log(this.$route.query.goods.number);
            console.log('-----------')


            // request({
            //     url:'/queryGoodsByManyId.do',
            //     method:'post',
            //     data:{
            //         goodsId:this.$route.query.goodsId
            //     }
            // }).then(res=>{
            //     console.log(res);
            //     console.log(res.data);
            //     this.goods = res.data
            //     console.log('请求数据成功');
            // }).catch(err=>{
            //     console.log(err);
            //     console.log('请求数据失败');
            // })
        },
        watch:{
            goods(val){
                    for(let item of this.goods){
                        let i=0;
                        this.goodsInf[i].goo_id = item.goo_id
                        this.goodsInf[i].goo_number = item.number
                        i++
                    }
                    console.log("444444444444444444444444444")
                    console.log(this.goodsInf);
            }
        }
    }
</script>

<style>
/*#address{*/
/*    margin-top: 20px;*/
/*    margin-bottom: 20px;*/
/*    width: 100%;*/
/*    height: 200px;*/
/*    border: 2px solid yellow;*/
/*}*/
#address1{
    margin-top: 20px;
    width: 100%;
    height: 200px;
    /*border: 2px solid yellow;*/
}
#addOption{
    /*padding-top: 80px;*/
    text-align: center;
    width: 200px;
    height: 100%;
    border: 2px solid #e4dada7a;
    float: left;
}
.addressInf{
    /*border: 5px solid black;*/
    width: 1600px;
    height: 100%;
    /*float: left;*/
    margin-left: 200px;
    /*float: right;*/
}
#option1{
    margin-top: 20px;
    margin-bottom: 100px;
    text-align: center;
    width: 100%;
    height: 100px;
    border: 2px solid #e4dada7a;
}

</style>