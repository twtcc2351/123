<template>
  <div class="yuyue">
    <img src="../assets/image/top2.jpg" alt>
    <div class="container">
        <div class="formbox">
            <div class="inputBox">
                <input type="number" v-model="mobileNum" @input="checkphone" placeholder="输入手机号">
            </div>
            <div class="inputBox">
                <input type="number" v-model="mobileCode" @input="checkcode" class="inputset" placeholder="输入手机号">
                <button class="layui-btn layui-btn-warm btn-border" @click="getcode" v-bind:disabled="isdisabled">{{ text }}</button>
            </div>
        </div>
        <button class="layui-btn layui-btn-radius btn-color" @click="bespeak" >立即预约</button>
        <p>成功提交预约申请后，会有专属客服人员与您联系，为您优先安排科创板开通事宜</p>
    </div>
    <img src="../assets/image/footer2.jpg" alt>

    <!-- 成功提示框-->
    <div class='warpper' v-show="success">
        <div class="content">
            <div class="cirle">
               <img src="../assets/image/ok.png" alt="">
            </div>
            <div class="successmsg">
                <h2>预约成功</h2>
                <p class="p1"><span class="dashed">近期会有专属客服人员与您联系</span></p>
                <p  style="color:#f40">科创板交易权限需要有上海证券账户</p>
                <p class="text2" >如果您还未有上海证券账户，请先开户</p>
                <a class='layui-btn layui-btn-radius btn-color' href="https://khweb.easec.com.cn:12203/m/open/views/account/index.html?isSdk=0&channel=4003">
                   一键开户
                </a>
            </div>
            <div class="close" @click="closesuccess"> <i class="layui-icon layui-icon-close-fill" ></i> </div>
        </div>
    </div>
    <!---- 验证码 ----->
    <div class="warpper" v-show="showimgCodeBox">
      <div class='imgcodebox'>
        <div class="inputBox">
          <input type="text" v-model='imgcode' class="inputcode" @focus="errorTips = false" placeholder="输入验证码">
          <img class="codeimg" @click='changeImgCode' :src='"msbp/mgnt/f101048?mobile=" + randomNum' alt="">
        </div>
        <p class="tipss" v-bind:class="{ errorTips: errorTips }" >请输入正确4位验证码</p>
        <button class="layui-btn layui-btn-normal" @click="checkImgCode">确定</button>
        <button class="layui-btn btn-primary" @click="showimgCodeBox = false">取消</button>
      </div>
    </div>
</div>
</template>
<script>
export default {
    name: "yuyue",
    data() {
        return {
            mobileNum: "",            //手机号
            mobileCode: "",          //手机验证码
            imgcode:'',              //图片验证码
            isdisabled: false,       //点击验证码按钮是否可用
            mobileNumCheck: false,   //手机号正则校验状态
            mobileCodeCheck: false,  //手机验证码校验状态
            text: "发送验证码",       //按钮内容
            success: false,          //预约成功状态
            timer: null,             //按钮倒计时timer
            errorTips:false,         //图片验证码正则校验
            showimgCodeBox:false,    //是否显示验证码窗口
            randomNum:""             //随机数
        };
    },
    methods: {
        //11位手机号校验
        checkphone() {
            if (/^1(3|4|5|7|8|9)\d{9}$/.test(this.mobileNum)) {
                this.mobileNumCheck = true;
            } else {
                this.mobileNumCheck = false;
            }
        },

        //手机验证码输入校验4位数字
        checkcode() {
            if (/^\d{4}$/.test(this.mobileCode)) {
                this.mobileCodeCheck = true;
            } else {
                this.mobileCodeCheck = false;
            }
        },

        //获取验证码点击事件
        getcode() {
            if (!this.mobileNumCheck) {
                layer.open({
                    content: '请输入11位正确手机号码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            this.changeImgCode() //验证码图片src变化自动请求图片
            this.showimgCodeBox = true;  //弹出验证码窗口
        },

        //验证码图片点击事件
        changeImgCode(){
            this.randomNum = "" + this.mobileNum + "&token" + Math.random();
        },

        //图片验证码提交事件
        checkImgCode(){
            console.log(this.imgcode.trim());
            if (!/^(\d|\w){4}$/.test(this.imgcode.trim())) {
                this.errorTips = true;
                return false;
            }
            let self = this;
            this.$axios.get("msbp/mgnt/f101049", {
            params: {
                mobile: this.mobileNum,
                verifyCode:this.imgcode
            }
            }).then(function(response) {
                if (response.data.errorNo == 0) {

                    //图片验证码校验成功，请求发送手机验证码
                    self.getMobileCode();
                }else{
                    //图片验证码校验失败，更新验证码并提升
                    self.Mathrandom = self.mobileNum + "&token" + Math.random();
                    layer.open({
                        content: response.data.errorInfo
                        ,skin: 'msg'
                        ,time: 5 
                    });
                }
            }).catch(function(error) {
                layer.open({
                    content: error
                    ,btn: '关闭'
                });
            });
        },

        //获取手机验证码
        getMobileCode(){
            let self = this;
            this.$axios.get("msbp/mgnt/f101046", {
                params: {
                    mobile: this.mobileNum
                }
            }).then(function(response) {
                if (response.data.errorNo == 0) {
                    //隐藏图片验证码窗口
                    self.showimgCodeBox = false;

                    //提示用户查收手机验证码短信
                    layer.open({
                        content: "验证码已发送至您的手机："+ self.mobileNum
                        ,skin: 'msg'
                        ,time: 3 //3秒后自动关闭
                    });

                    //获取验证码按钮 变为不可用
                    self.isdisabled = true;

                    //设置倒计时60秒
                    let n = 59;
                    self.timer = setInterval(() => {
                        n--;
                        if (n <= 0) {
                            self.text = "发送验证码";

                            //获取验证码按钮 变为不可用
                            self.isdisabled = false; 
                            clearInterval(self.timer);
                        }else{
                            self.text = "" + n + "秒后重发"
                        }
                    }, 1000);
                } else {
                    layer.open({
                        content: response.data.errorInfo
                        ,skin: 'msg'
                        ,time: 5 
                    });
                }
            }).catch(function(error) {
                layer.open({
                    content: error
                    ,btn: '关闭'
                });
            });
        },

        //预约按钮点击事件
        bespeak(){
            if (!this.mobileNumCheck) {
                layer.open({
                    content: "请输入正确11位正确手机号码"
                    ,skin: 'msg'
                    ,time: 3 //3秒后自动关闭
                });
                return false;
            }
            if (!this.mobileCodeCheck) {
                layer.open({
                    content: "请输入正确4位验证码"
                    ,skin: 'msg'
                    ,time: 3 //3秒后自动关闭
                });
                return false;
            }
            let self = this;
            this.$axios.get("msbp/mgnt/f101044", {
                params: {
                    mobile: this.mobileNum,
                    checkCode: this.mobileCode
                }
            }).then(function(response) {
                if (response.data.errorNo == 0) {
                    //显示成功弹窗
                    self.success = true;
                } else {
                    layer.open({
                        content: response.data.errorInfo
                        ,skin: 'msg'
                        ,time: 5 
                    });
                }
            }).catch(function(error) {
                layer.open({
                    content: error
                    ,btn: '关闭'
                });
            }); 
        },
        //关闭成功弹窗事件
        closesuccess() {
            this.success = false;
            this.mobileNum = "";
            this.mobileCode = "";
            this.isdisabled = false;
            this.mobileNumCheck = false; 
            this.mobileCodeCheck = false;
            this.text = "发送验证码";
            clearInterval(this.timer);
        },
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    background: url("../assets/image/content.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding: 1rem 2rem 2rem 2rem;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}
.inputBox{
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    text-align: left;
    position: relative;
    margin: 5px 0px;
}
.inputBox input{
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 0.5rem;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    font-weight: 400;
    height: 5rem;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
input.inputset{
    width:16.5rem;
}
input.inputcode{
    width:10rem;
}
.btn-border{
    border-radius: 0.5rem;
    color:#606266;
    font-weight: 400;
    font-size: 15px;
}
.formbox{
    margin-bottom: 2rem;
}
.container p{
    color:#000;
    font-weight: 400;
    font-size: 14px;
    padding: 0  1rem;
}
.warpper{
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    position: absolute;
    top:0;
    left:0;
}
.warpper .content{
    width:90%;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding-bottom: 2rem;
}
.warpper .content .cirle{
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%,-50%);
}
.warpper .content .successmsg{
    margin: 6rem auto 0rem
}
.warpper .content .successmsg h2{
    margin-bottom: 1.5rem
}
.warpper .content .successmsg p{
    line-height: 25px;
}
.warpper .content .successmsg .p1{
    font-size: 16px
}
.dashed{
    border-bottom: 1px #ccc dashed;
    display: inline-block;
    margin-bottom: 5px;
    padding-bottom: 5px;
}
.text2{
    margin-bottom: 2rem;
}
.close{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%,100%);
}
.close i{
    font-size: 40px;
    color:rgba(209, 198, 198, 0.8);
}
.imgcodebox{
  width: 20rem;
  padding: 1.5rem;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 10px;
  border:1px solid #ddd;
  margin-bottom: 10px;
}
.inputBox  img{
    width:8rem;
}
.layui-btn{
    border: none;
}
.btn-primary{
    background: #ddd;
}
p.tipss.errorTips{
  opacity: 1;
}
p.tipss{
  line-height: 15px;
  text-align: center;
  color:red;
  font-size: 12px;
  opacity: 0;
}
</style>
