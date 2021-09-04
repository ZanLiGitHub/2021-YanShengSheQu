<template>
  <div class="bg-main q-img__image q-col-gutter-md absolute-full" style="background-color:#ecedef">
    <div class="row items-center justify-center" style=" margin-top:15%;">
      <div class="col-lg-6 col-sm-9 col-xs-12 q-col-gutter-md">
        <div class="row q-col-gutter-xl">
          <!--快捷方式1-->
          <div class="col-md-3 q-px-xl text-center" to="/main">
            <p>快捷方式1</p>
            <router-link to="">
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
