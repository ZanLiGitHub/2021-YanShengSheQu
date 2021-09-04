<template>
  <div class="q-pa-lg">
    <!--页面标题-->
    <div class="text-h6 q-pb-md">
      <strong>修改商户</strong>
    </div>
    <!--页面内容-->
    <div class="q-my-sm">
      <!--页面表单-->
      <q-form @submit="onSubmit" @reset="onReset">
        <!--页面表单内容-->
        <div class="col-sm-5 col-xs-12">
          <!--第一行：商户名称，开店时间-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">商户名称</div>
            </div>
            <div class="col col-md-5">
              <q-input
                v-model="inputs.shmc"
                outlined
                placeholder="请输入商户名称"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入商户名称']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">开店时间</div>
            </div>
            <div class="col col-md-5">
              <q-input style="margin-bottom:-20px;" outlined v-model="inputs.kdsj" mask="date" :rules="['date']" dense>
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="inputs.kdsj">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!--第一行：小区名称，楼号-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">小区名称</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.xq"
                dense
                outlined
                :options="xqmcList"
                :rules="[ val => xqmcList.includes(val) || '请选择小区' ]"
                @focus="get('xqList')"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">楼号</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.ld"
                dense
                outlined
                :options="ldmcList"
                :rules="[ val => ldmcList.includes(val) || '请选择楼栋' ]"
                @focus="get('ldList', {parentID:xqID})"
              />
            </div>
          </div>
          <!--第二行：单元号，户号-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">单元号</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.dy"
                dense
                outlined
                :options="dymcList"
                :rules="[ val => dymcList.includes(val) || '请选择单元' ]"
                @focus="get('dyList', {parentID: ldID})"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">户号</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.h"
                dense
                outlined
                :options="hmcList"
                :rules="[ val => hmcList.includes(val) || '请选择户' ]"
                @focus="get('hList', {parentID: dyID})"
              />
            </div>
          </div>
          <!--第三行：负责人，联系方式-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">负责人</div>
            </div>
            <div class="col col-md-5">
              <q-input
                v-model="inputs.fzr"
                outlined
                placeholder="请输入负责人"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入负责人']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">联系方式</div>
            </div>
            <div class="col col-md-5">
              <q-input
                prefix="+86"
                type="tel"
                v-model="inputs.lxfs"
                outlined
                placeholder="请输入联系方式"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/.test(val) === true || '请输入联系方式']"
              />
            </div>
          </div>
          <!--第五行：证明类型，办理证明时间-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">证明类型</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.zmlx"
                dense
                outlined
                :options="zmlxList"
                :rules="[ val => zmlxList.includes(val) || '请选择证明' ]"
                @focus="get('zmlxList')"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">证明办理时间</div>
            </div>
            <div class="col col-md-5">
              <q-input style="margin-bottom:-20px;" outlined v-model="inputs.zmsj" mask="date" :rules="['date']" dense>
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="inputs.zmsj">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!--第六行：备注-->
          <div class="row items-center">
            <div class="col col-md-1 text-right">
              <span class="q-mr-sm" style="font-size:14px; color:#757575">备注</span>
            </div>
            <div class="col col-md-11">
              <KindEditor  :content="inputs.bz" @kindeditorChange="kindeditorChange"></KindEditor>
            </div>
          </div>
        </div>
        <!--提交按钮-->
        <div class="col-sm-5 col-xs-12" style="text-align:center;">
          <q-btn label="确定" type="submit" color="primary"/>
          <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import {getList, editList, addList} from "../../network/data";
import KindEditor from "../../components/KindEditor";

export default {
  components: {
    KindEditor,
  },

  data() {
    return {
      //输入数据
      inputs:{},
      //用于还原数据
      preinputs:{},

      //是否同意规定
      accept: true,

      //选择列表：证明类型
      xqList: [],
      ldList: [],
      dyList: [],
      hList: [],
      zmlxList: [],

      //日期
      date: new Date(),
    };

  },

  methods: {
    //富文本编辑器
    kindeditorChange(e) {
      this.inputs.bz = (e)
    },

    //获取选择列表
    get(list, params) {
      if (params && params.parentID === "") {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先选择上一级"
        });
      } else {
        getList(list, params).then(res => {
          this[list] = res
        })
      }
    },

    //上传
    onSubmit() {
      //判断是否同意规定，如果未同意
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "请先阅读并同意规定"
        });
        //判断是否同意规定，如果同意
      } else {
        //生成本次维护时间
        let whsj = ''
        let date = this.date;
        let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
        let strDate = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
        whsj = this.date.getFullYear() + "-" + month + "-" + strDate + " " + this.date.getHours() + ":" + this.date.getMinutes()
        this.inputs.whsj.push(whsj)
        //后端通信
        editList('shList', this.inputs.id, this.inputs)
        //弹出通知
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "已提交"
        });
        //跳转
        setTimeout(() => {
          this.$router.push({path: '/xgsh'})
        }, 1000)
      }
    },

    //重置
    onReset() {
      this.$q.dialog({
        title: '确认重置',
        message: '将重置所有输入',
        cancel: true,
        persistent: true
      }).onOk(() => {
        //深拷贝恢复原数据
        this.inputs = JSON.parse(JSON.stringify(this.preinputs))
      })


    }
  },

  computed:{
    xqmcList:function (){
      let list = []
      for(let key in this.xqList){
        list.push(this.xqList[key].value)
      }
      return list
    },
    ldmcList:function (){
      let list = []
      for(let key in this.ldList){
        list.push(this.ldList[key].value)
      }
      return list
    },
    dymcList:function (){
      let list = []
      for(let key in this.dyList){
        list.push(this.dyList[key].value)
      }
      return list
    },
    hmcList:function (){
      let list = []
      for(let key in this.hList){
        list.push(this.hList[key].value)
      }
      return list
    },

    xqID:function (){
      for(let index=0, length=this.xqList.length; index<length; index++){
        if(this.inputs.xq === this.xqList[index].value){
          return this.xqList[index].id
        }
      }
    },
    ldID:function (){
      for(let index=0, length=this.ldList.length; index<length; index++){
        if(this.inputs.ld === this.ldList[index].value){
          return this.ldList[index].id
        }
      }
    },
    dyID:function (){
      for(let index=0, length=this.dyList.length; index<length; index++){
        if(this.inputs.dy === this.dyList[index].value){
          return this.dyList[index].id
        }
      }
    },
  },

  mounted() {
    //先获取所有列表选项，保证自动填表后的校验不出错
    getList('xqList').then(res => {
      this.xqList = res
    })
    getList('ldList', {id:this.xqID}).then(res => {
      this.ldList = res
    })
    getList('dyList', {id:this.ldID}).then(res => {
      this.dyList = res
    })
    getList('hList', {id:this.dyID}).then(res => {
      this.hList = res
    })
    getList('zmlxList', ).then(res => {
      this.zmlxList = res
    })

    //后端通信获取档案
    getList('shList', {id:this.$route.query.id}).then(res=>{
      //获取原数据
      this.inputs = res[0]
      console.log(this.inputs);
      //深拷贝备份原数据
      this.preinputs = JSON.parse(JSON.stringify(this.inputs))
    })


  }
};
</script>
