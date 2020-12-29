<template>
    <div class="regist_container">
        <div class="regist_box">
            <span style="color: red;text-align: center">带红色  *  号为必填项</span><br>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">

                <el-form-item :required="true" label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    <el-checkbox v-model="ruleForm.Check">员工注册</el-checkbox>
                </el-form-item>

                <el-form-item :required="true" label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item :required="true" label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item :required="ruleForm.CheckQuestionOne" label="密保问题一">
<!--                <el-form-item :required="ruleForm.CheckQuestionOne" label="密保问题一" prop="CheckNullQ">-->
                    <el-input type="text" v-model="ruleForm.question_one"></el-input>
                </el-form-item>
                <el-form-item :required="ruleForm.CheckQuestionOne" label="密保问题一答案">
                    <el-input type="text" v-model="ruleForm.question_one_key"></el-input>
                </el-form-item>
                <el-form-item :required="ruleForm.CheckQuestionOne" label="密保问题二">
                    <el-input type="text" v-model="ruleForm.question_two"></el-input>
                </el-form-item>
                <el-form-item :required="ruleForm.CheckQuestionOne" label="密保问题二答案">
                    <el-input type="text" v-model="ruleForm.question_two_key"></el-input>
                </el-form-item>

                <el-form-item :required="true" label="姓名" prop="name">
                    <el-input type="text" v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item :required="ruleForm.Check" label="性别">
                    <el-radio id="1" v-model="ruleForm.gender" label="男">男</el-radio>
                    <el-radio id="2" v-model="ruleForm.gender" label="女">女</el-radio>
<!--                    <el-input type="text" v-model.lazy="ruleForm.g"></el-input>-->
                </el-form-item>

                <el-form-item :required="ruleForm.Check"  label="身份证号" prop="uuid">
                    <el-input type="number" v-model="ruleForm.uuid"></el-input>
                </el-form-item>


                <el-form-item :required="ruleForm.Check" label="联系电话" prop="tel_number">
                    <el-input type="number" v-model="ruleForm.tel_number"></el-input>
                </el-form-item>

                <el-form-item :required="ruleForm.Check" label="联系地址">
                    <el-input type="text" v-model="ruleForm.address"></el-input>
                </el-form-item>

                <el-form-item v-if="ruleForm.Check" :required="true" label="邀请码" prop="depid">
                    <el-input type="text" v-model="ruleForm.depid"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="submit" @click="submitForm('ruleForm')">注册</el-button>
                    <span @click="goLogin" style="top: 20px">已有账号</span>
<!--                    <el-button @click="resetForm('ruleForm')">已有账号</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/index";

    export default {
        name: "Regist",
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                console.log(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    console.log(value);
                    //连接后台查询是否重名
                    callback();
                }
            };
            var checkUid = (rule, value, callback) => {
                if(this.ruleForm.Check){
                    if (value === '') {
                        callback(new Error('请输入身份证号'));
                    } else {
                        if(value.length!=18){
                            callback(new Error('身份证号不符合规范'));
                        }else{
                            callback();
                        }
                    }
                }else{
                    callback();
                }

            };
            var checkTel = (rule, value, callback) => {
                if(this.ruleForm.Check){
                    if (value === '') {
                        callback(new Error('请输入联系电话号'));
                    } else {
                        if(value.length==11){
                            callback();
                        }else{
                            callback(new Error('身份证号不符合规范'));
                        }
                    }
                }else{
                    callback();
                }
            };
            var checkDspid = (rule, value, callback) => {
                console.log(value);
                        //连接后台查询是否正确
                        callback();
            };
            var checkName = (rule, value, callback) => {
                console.log(value);
                if (value === '') {
                    callback(new Error('不能为空'));
                } else {
                    console.log(value);
                    callback();
                }
            };
            return {
                ruleForm: {
                    //必填新校验
                    Check:false,
                    CheckQuestionOne:false,
                    CheckQuestionTwo:false,
                    //密码表信息
                    username:'',
                    pass: '',
                    checkPass: '',
                    question_one:'',
                    question_one_key:'',
                    question_two:'',
                    question_two_key:'',
                    //个人信息表
                        //通用信息
                    name:'',
                    gender:'男',
                    uuid:'',
                    uid:'',
                    tel_number:'',
                    address:'',
                    //员工邀请码
                    depid:10
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    username:[
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    uuid:[
                        { validator: checkUid, trigger: 'blur' }
                    ],
                    tel_number:[
                        { validator: checkTel, trigger: 'blur' }
                    ],
                    depid:[
                        { validator: checkDspid, trigger: 'blur' }
                    ],
                    name:[
                        { validator: checkName, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        request({
                            url:'/insertByRegist.action',
                            method:'post',
                            data:{
                                username:this.ruleForm.username,
                                pass: this.ruleForm.pass,
                                checkPass: this.ruleForm.checkPass,
                                question_one:this.ruleForm.question_one,
                                question_two:this.ruleForm.question_two,
                                question_two_key:this.ruleForm.question_two_key,
                                //个人信息表
                                //通用信息
                                name:this.ruleForm.name,
                                gender:this.ruleForm.gender,
                                uuid:this.ruleForm.uuid,
                                tel_number:this.ruleForm.tel_number,
                                address:this.ruleForm.address,
                                //员工邀请码
                                depid:this.ruleForm.depid
                            }
                        }).then(res=>{
                            console.log("登录返回的值："+res);
                            if(res){
                                this.$router.replace('/home')
                            }
                        }).catch(err=>{
                            console.log("登录错误返回的值"+err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // submitForm(formName) {
            //     // console.log("11111111:"+this.ruleForm.username);
            //     // // console.log("获取的名称："+formName);
            //     // request({
            //     //     url:'/insertByRegist.action',
            //     //     data:{
            //     //         ruleForm:this.ruleForm
            //     //     }
            //     // }).then(res=>{
            //     //     console.log("登录返回的值："+res);
            //     // }).catch(err=>{
            //     //     console.log("登录错误返回的值"+err);
            //     // })
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },
            goLogin(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    .regist_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .regist_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>