<template>
  <div class="fullscreen scroll" style="background:rgb(230,235,241);">
    <div id="bgImg" style="height: 50%; overflow: hidden; position: relative">
      <img src="../../public/img/bgimg.jpg" style="width: 100%; margin-top: -12%"/>
      <div style="position: absolute; left: 0; top: 0; height: 100%; width: 100%; background: rgba(7,93,191,.5)"></div>
    </div>

    <img src="../../public/img/LOGO.png" style="height: 20%; position: absolute; left: 50%; top: 2%; transform: translateX(-45%)"/>

    <img src="../../public/img/szsqzhpt.png" style="height: 7%; position: absolute; left: 50%; top: 23%; transform: translateX(-50%)"/>

    <div style="height: 41.66%; width:44.79%; position: absolute; left: 50%; top: 35%; transform: translateX(-50%); background: white; box-shadow: 5px 5px 20px rgba(0,0,0,.4)">
      <img style="position: absolute; right: 4%; top: 6%;" src="../../public/img/n.png" height="28.44%"/>
      <p style="font-size:33px  ;position: absolute; left: 50%; transform: translateX(-50%); top: 9%;font-weight: bold; color: rgb(51,51,51)">欢 迎 登 录</p>
      <p style="position: absolute; left: 50%; top: 20%; transform: translateX(-50%); color: rgb(210,210,210); font-size: 17px">WELCOME TO LOGIN</p>
      <q-input style="width: 53.48%; height: 20%; position: absolute; left: 50%; top: 31.11%; transform: translateX(-50%)" outlined bottom-slots v-model="username" label="账  号">
        <template v-slot:prepend>
          <q-icon name="img:icons/username.png" style="width: auto" color="primary"/>
        </template>
      </q-input>
      <q-input style="width: 53.48%; height: 20%; position: absolute; left: 50%; top: 49%; transform: translateX(-50%)" outlined bottom-slots v-model="password" label="密  码">
        <template v-slot:prepend>
          <q-icon name="img:icons/password.png" style="width: auto" color="primary"/>
        </template>
      </q-input>
      <div class="q-gutter-sm" style="position: absolute; bottom: 25%; left: 22.05%">
        <q-checkbox v-model="remember" label="记住账号" />
      </div>
      <p style="font-size:15px ; position: absolute; bottom: 23%; right: 23.05%">忘记密码？</p>
      <q-btn to="/main" style="background: rgb(7,93,191); height:12%; width: 53.48%; position: absolute; left: 50%; transform: translateX(-50%); bottom: 12%">
        <div class="ellipsis" style="color: white ;font-size: 20px">
          登&nbsp&nbsp&nbsp&nbsp&nbsp录
        </div>
      </q-btn>

    </div>

    <p style="position: absolute; left: 50%; transform: translateX(-50%); bottom: 16%; font-size:16px; color: rgb(102,102,102)">©2021 延盛社区版权所有</p>


    <!--<div class="q-pa-sm row justify-center q-mt-lg">-->
    <!--  <div class="col" style=" max-width: 1221px;">-->
    <!--    <q-img src="/img/logo.png" style=" width:568px; margin-top:6%;"></q-img>-->
    <!--    <div class=" login-box-bg q-mt-lg" style=" width:1220px; height:524px;">-->
    <!--      <q-form style="">-->
    <!--        <q-space/>-->
    <!--        <div class="q-gutter-md" style="width:313px; float:right; margin-right:159px; margin-top:188px;">-->

    <!--          <q-input outlined label="用户名" dense class=" full-width">-->
    <!--            <template v-slot:prepend>-->
    <!--              <q-icon name="person" color="primary"></q-icon>-->
    <!--            </template>-->
    <!--          </q-input>-->
    <!--          <q-input outlined label="密  码" dense class=" full-width">-->
    <!--            <template v-slot:prepend>-->
    <!--              <q-icon name="vpn_key" color="primary"></q-icon>-->
    <!--            </template>-->
    <!--          </q-input>-->
    <!--          <div class="row">-->
    <!--            <div class="col text-left">-->
    <!--              <q-checkbox v-model="check" label="记住账号"/>-->
    <!--            </div>-->
    <!--            <div class="col text-right">-->
    <!--              <q-btn flat label="忘记密码"/>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <q-btn color="primary" label="登  录" class=" full-width" size="18px" to="/main"/>-->
    <!--        </div>-->
    <!--      </q-form>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>


<script>
export default {
  data() {
    return {
      remember:false,
      username: "",
      password:"",
      check: false,
    }
  },

}
</script>

<style>
.q-field__prepend{
  padding-left: 5px;
  width: 40px;
}
</style>
