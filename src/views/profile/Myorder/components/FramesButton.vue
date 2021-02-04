<template>
    <div id="button">
<!--        <div class="btn">-->
            <el-button plain v-if="BtnpayState" @click="CancelBtn">{{Btnpaystate}}</el-button>
            <el-button v-else type="primary" :loading="true">加载中</el-button>
<!--        </div>-->
<!--        <div class="btn">-->
            <el-button plain v-if="btnstate" @click="stateBtn(keys)">{{state}}---{{keys}}</el-button>
            <el-button v-else type="primary" :loading="true">加载中</el-button>
<!--        </div>-->
        <!--订单的状态，如确认收货，催发。。。；动态绑定Style，还有上面的-->
<!--        <button v-if="" @click="stateBtn">{{state}}</button>-->
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
    import {request} from "../../../../network";
    import {MessageBox} from "element-ui";

    export default {
        name: "FrameButton",
        props:{
            //传入商品信息
            paystate:String,
            orderstate:String,
            keys:Number
        },
        data(){
            return{
                btnstate:true,
                BtnpayState:true,
                // state:'订单状态'
                dialogFormVisible:false,
                radio1:"支付宝"
            }
        },
        computed:{
            state(){
                if(this.paystate==='订单未支付'){
                    return '立即支付'
                }else{
                    if(this.orderstate==='等待发货'){
                        return '催促发货'
                    }else{
                        return '确认收货'
                    }
                }
            },
            Btnpaystate(){
                if(this.paystate==='订单未支付'){
                    return '取消订单'
                }else{
                    return '联系商家'
                }
            }
        },
        methods:{
            CancelBtn(){
                this.BtnpayState = false
                if(this.paystate==='订单未支付'){
                        this.$confirm('是否确定取消该订单？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            request({
                                url:'/deleteToMyOrderByUser.do',
                                method: 'post',
                                data:{
                                    MyOrderId:this.keys,
                                    UserId:sessionStorage.getItem('userID'),
                                    state:'已取消'
                                }
                            }).then(res=>{
                                console.log(res);
                                this.BtnpayState = true
                                if(res.flag){
                                    this.$message({
                                        type: 'success',
                                        message: '取消成功!'
                                    });
                                    setTimeout(()=>{
                                        this.$router.go(0)
                                    },700)
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: '取消失败!'
                                    })
                                }
                            }).catch(err=>{
                                console.log(err);
                            })
                        }).catch(() => {
                            this.BtnpayState = true
                            console.log('点击了取消');
                            // this.$message({
                            //     type: 'info',
                            //     message: '已取消删除'
                            // });
                        });
                }
                // setTimeout(()=>{
                //     MessageBox.alert('点击成功')
                //     console.log('点击了按钮');
                //     setTimeout(()=>{
                //         this.BtnpayState = true
                //         MessageBox.close()
                //     },700)
                // },2000)
            },
            stateBtn(keys){
                this.btnstate=false
                console.log('点击了状态按钮'+keys);
                console.log(this.paystate);
                console.log(this.orderstate);
                if(this.paystate==='订单未支付'){
                    this.dialogFormVisible = true
/*                    request({
                        url:'/updateMyOrderToPay.do',
                        method: 'post',
                        data:{
                            OrderId:this.keys,
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
                                    /!*callback: action => {
                                        this.$router.go(-1)
                                    }*!/
                                })
                                setTimeout(() => {
                                    MessageBox.close();
                                    this.$router.go(-1)
                                }, 3000);
                            }else{
                                MessageBox.alert('支付失败', '提示', {
                                    confirmButtonText: '确认',
                                    type: 'error',//success，error，info和warning
                                    /!*callback: action => {
                                        this.$router.replace('/profile')
                                    }*!/
                                })
                                setTimeout(() => {
                                    MessageBox.close();
                                    this.$router.replace('/profile')
                                }, 3000);
                            }
                        },3000)
                    }).catch(err=>{
                        console.log('支付错误');
                    })*/
                }else{
                    if(this.orderstate==='等待收货'){
                        console.log('收货按钮')
                        request({
                            url:'/deleteToMyOrderByUser.do',
                            method: 'post',
                            data:{
                                MyOrderId:this.keys,
                                UserId:sessionStorage.getItem('userID'),
                                state:'已收货'
                            }
                        }).then(res=>{
                            console.log(res);
                            this.BtnpayState = true
                            if(res.flag){
                                this.$message({
                                    type: 'success',
                                    message: '收货成功!'
                                });
                                setTimeout(()=>{
                                    this.$router.go(0)
                                },1000)
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '收货失败!'
                                })
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else if (this.orderstate==='等待发货'){
                        setTimeout(()=>{
                            MessageBox.alert('提醒成功')
                            setTimeout(()=>{
                                this.btnstate=true
                                MessageBox.close();
                            },700)
                        },2000)
                    }
                }
            },
            //提示是否关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit("dialogState",false)
                        // MessageBox.alert('订单未支付！即将返回上一页！','提示',{
                        //     confirmButtonText: '确认',
                        //     type: 'success',//success，error，info和warning
                        //     callback: action => {
                        //         clearTimeout(handleCloseTime)
                        //         this.$router.go(-1)
                        //     }
                        // })
                        // const handleCloseTime = setTimeout(() => {
                        //     MessageBox.close();
                        //     this.$router.go(-1)
                        // }, 3000);
                        this.btnstate = true
                        done();
                    })
                    .catch(_ => {});
            },
            pay(){
                request({
                    url:'/updateMyOrderToPay.do',
                    method: 'post',
                    data:{
                        OrderId:this.keys,
                        // OrderId:11111111111,
                        payState:'支付成功',
                        orderState:'等待发货'
                    }
                }).then(res=>{
                    console.log('请求成功:'+res);
                    // MessageBox.alert('正在支付，请稍后。。。')
                    this.$msgbox({
                        type:"info",
                        message:'正在支付，请稍后。。。',
                        showCancelButton:false,
                        showConfirmButton:false,
                        beforeClose:(() => {})
                    })
                    setTimeout(()=>{
                        MessageBox.close();
                        if(res.flag){
                            MessageBox.alert('支付成功！','提示',{
                                confirmButtonText: '确认',
                                type: 'success',//success，error，info和warning
                                callback: action => {
                                    clearTimeout(payYesTime)
                                    this.$router.go(0)
                                }
                            })
                            // this.$msgbox({
                            //     message:'支付成功！',
                            //     type:"success",
                            //     showCancelButton:false,
                            //     showConfirmButton:true,
                            //     confirmButtonText:'确认',
                            //     beforeClose:((action,done) => {
                            //         console.log(action)
                            //         if(action == "confirm"){
                            //             clearTimeout(payYesTime)
                            //             done();
                            //         }
                            //         const payYesTime = setTimeout(() => {
                            //             done()
                            //             this.$router.go(0)
                            //         }, 3000);
                            //     })
                            // })
                            const payYesTime = setTimeout(() => {
                                MessageBox.close();
                                this.$router.go(0)
                            }, 3000);
                        }else{
                            // this.$msgbox({
                            //     message:'支付失败,请重试！',
                            //     type:"error",
                            //     showCancelButton:false,
                            //     showConfirmButton:true,
                            //     confirmButtonText:'确认',
                            //     beforeClose:((action, instance, done) => {
                            //         console.log(action)
                            //         if(action == "confirm"){
                            //             done();
                            //         }else{
                            //             ()=>{}
                            //         }
                            //     }),
                            // })
                            MessageBox.alert('支付失败,请重试！', '提示', {
                                confirmButtonText: '确认',
                                type: 'error',//success，error，info和warning
                                beforeClose:((action, instance, done) => {
                                    if(action == "confirm"){
                                            done();
                                        }
                                }),
                                callback: action => {
                                    clearTimeout(payNoTime)
                                    MessageBox.close();
                                    // this.$router.replace('/profile')
                                },
                            })
                            const payNoTime = setTimeout(() => {
                                MessageBox.close();
                            }, 3000);
                        }
                    },3000)
                })
            },
            cleanpay(){
                // MessageBox.alert('订单未支付！即将返回上一页！','提示',{
                //     confirmButtonText: '确认',
                //     type: 'success',//success，error，info和warning
                //     callback: action => {
                //         clearTimeout(cleanpayTime)
                //         this.$router.go(-1)
                //     }
                // })
                // const cleanpayTime = setTimeout(() => {
                //     MessageBox.close();
                //     this.$router.go(-1)
                // }, 3000);
                this.dialogFormVisible = false
                this.btnstate = true
            }
        }


    }
</script>

<style scoped>
    .btn{
        /*display: flex;*/
        float: left;
    }
</style>