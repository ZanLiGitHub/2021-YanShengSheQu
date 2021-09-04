<template>
  <div class="bg-main q-img__image q-col-gutter-md absolute-full" style="background-color:#ecedef">
    <div class="row items-center justify-center" style=" margin-top:15%;">
      <div class="col-lg-6 col-sm-9 col-xs-12 q-col-gutter-md">
        <div class="row q-col-gutter-xl">
          <!--新建档案-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            <p>新建档案</p>
            <router-link to="/xjda">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <!--新建商户-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            <p>新建商户</p>
            <router-link to="/xjsh">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <!--新建小区-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            新建小区
            <router-link to="/xjxq">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <!--新建网格-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            新建网格
            <router-link to="/xjwg">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <!--新建消防通道-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            新建消防通道
            <router-link to="/xjxftd">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      url: '',
    }
  }
}
</script>
