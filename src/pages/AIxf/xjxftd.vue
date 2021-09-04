<template>
  <div class="q-pa-lg">
    <!--页面标题-->
    <div class="text-h6 q-pb-md">
      <strong>新建消防通道</strong>
    </div>
    <!--页面内容-->
    <div class="q-my-sm">
      <!--页面表单-->
      <q-form @submit="onSubmit" @reset="onReset">
        <!--页面表单内容-->
        <div class="col-sm-5 col-xs-12">
          <!--第一行：消防通道名称，所属网格-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">消防通道名称</div>
            </div>
            <div class="col col-md-5">
              <q-input
                v-model="inputs.xftdmc"
                outlined
                placeholder="请输入消防通道名称"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入消防通道名称']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">所属网格</div>
            </div>
            <div class="col col-md-5">
              <q-select
                style="margin-bottom:-20px;"
                v-model="inputs.wg"
                dense
                outlined
                :options="wgmcList"
                :rules="[ val => wgmcList.includes(val) || '请选择所属网格' ]"
                @focus="get('wgList')"
              />
            </div>
          </div>
          <!--第二行：器材列表-->
          <div class="row items-center" style="margin-bottom:20px;">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">器材列表：</div>
            </div>
            <div class="col col-md-11" style="max-height: 300px; overflow-y: scroll; border: 1px rgba(0,0,0,.3) solid; border-radius: 5px">
              <div class="row items-start q-gutter-lg" style="padding: 20px">
                <q-card style="height: 200px; width: 150px" class="my-card" v-for="item in inputs.qc" :key="item.id">
                  <q-img
                    style="width: 100%; height: 80%;"
                    :src="item.tp"
                    basic
                  >
                    <div style="height: 15%; line-height: 15%" class="absolute-bottom text-body1">
                      {{ item.qcmc }}
                    </div>
                  </q-img>

                  <q-card-section style="padding-top: 12%; height: 10%; line-height: 10%">
                    数量：{{ item.sl }}
                  </q-card-section>
                </q-card>
                <q-card flat style="height: 200px; width: 150px; background: white; position: relative" class="my-card">
                  <q-btn @click="popupAddQC"  style="position: absolute; top: 50%; left: 50%; background: rgba(0,0,0,.3); transform: translate(-50%,-50%); width: 50%; height: 50%;">
                    <q-icon color="white" size="md" name="add"></q-icon>
                    <p class="text-white text-body1">添加</p>
                  </q-btn>
                </q-card>
              </div>
            </div>
          </div>
          <!--第三行：备注-->
          <div class="row items-center">
            <div class="col col-md-1 text-right">
              <span class="q-mr-sm" style="font-size:14px; color:#757575">备注</span>
            </div>
            <div class="col col-md-11">
              <KindEditor :content="inputs.bz" @kindeditorChange="kindeditorChange"></KindEditor>
            </div>
          </div>
          <!--第四行：附件列表-->
          <div class="row items-center">
            <div class="col col-md-1 text-right">
              <span class="q-mr-sm" style="font-size:14px; color:#757575">附件列表</span>
            </div>

            <div class="col col-md-11">
              <!--选择附件-->
              <div class="q-pa-md" style="padding:0px">
                <div class="q-gutter-md" style="max-width: 50%;">
                  <q-file filled bottom-slots v-model="inputs.fj" label="请选择您要上传的附件">
                    <template v-slot:append>
                      <q-icon v-if="inputs.fj !== null" name="close" @click.stop="inputs.fj = null"
                              class="cursor-pointer"/>
                      <q-icon name="create_new_folder" @click.stop/>
                    </template>
                    <template v-slot:after>
                      <q-btn round dense flat icon="send" @click="addToAttachmentList"/>
                    </template>
                  </q-file>
                </div>
              </div>
              <!--附件列表-->
              <q-tab-panels v-model="tab" animated style="width:100%;">
                <q-tab-panel name="dsp" style="padding:0px">
                  <div>
                    <q-table
                      :data="inputs.fjlb"
                      :columns="columns"
                      :row-key="row => row.fjbh"
                      flat
                      square
                      class="my-sticky-header-table tabletop"
                      style="height:auto;"
                    >
                      <!-- 操作按钮注释start -->
                      <template #body-cell-opt="props">
                        <td style="text-align: center;">
                          <q-btn icon="delete_forever" flat round dense color="blue"
                                 @click="deleteData(inputs.fjlb,'fjbh',props.key)">
                            <q-tooltip>删除</q-tooltip>
                          </q-btn>
                        </td>
                      </template>
                      <!-- 操作按钮注释 end-->
                    </q-table>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="sptg">
                  <div class="text-h6">Alarms</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                <q-tab-panel name="bh">
                  <div class="text-h6">Movies</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                <q-tab-panel name="gq">
                  <div class="text-h6">Movies</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
        <!--提交按钮-->
        <div class="col-sm-5 col-xs-12" style="text-align:center;">
          <q-btn label="确定" type="submit" color="primary"/>
          <q-btn label="清除" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>

      <!--弹出添加器材-->
      <div class="q-pa-md q-gutter-sm" style="width:100%">
        <q-dialog v-model="popupQCWindow" >
          <q-layout view="Lhh lpR fff" container class="bg-white" style="width:60%; max-width:60%;height:50%;">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title>添加器材</q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <div class="q-pa-lg">
                <div class="q-my-sm">
                  <q-form>
                    <div class="col-sm-5 col-xs-12">
                      <!--器材名称，数量-->
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-1 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">器材名称：</div>
                        </div>
                        <div class="col col-md-5">
                          <q-input
                            v-model="addQCInputs.qcmc"
                            outlined
                            placeholder="请输入器材名称"
                            style="margin-bottom:-20px;"
                            dense
                            :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入器材名称']"
                          />
                        </div>
                        <div class="col col-md-1 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">器材数量：</div>
                        </div>
                        <div class="col col-md-5">
                          <q-input
                            v-model="addQCInputs.sl"
                            outlined
                            placeholder="请输入器材数量"
                            style="margin-bottom:-20px;"
                            dense
                            :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入器材数量']"
                          />
                        </div>
                      </div>
                      <!--图片-->
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-1 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">图片地址：</div>
                        </div>
                        <div class="col col-md-11">
                          <q-input
                            v-model="addQCInputs.tp"
                            outlined
                            placeholder="请输入图片地址"
                            style="margin-bottom:-20px;"
                            dense
                            :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入图片地址']"
                          />
                        </div>
                      </div>
                    </div>
                    <q-footer style="background: white" class="text-center">
                      <q-btn class="q-ma-lg" label="添加" v-close-popup color="primary" @click="addQC" />
                      <q-btn class="q-ma-lg" label="取消" v-close-popup color="primary" />
                    </q-footer>
                  </q-form>
                </div>
              </div>
            </q-page-container>
          </q-layout>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {getList, addList} from "../../network/data";
import KindEditor from "../../components/KindEditor";

export default {
  components: {
    KindEditor,
  },
  data() {
    return {
      //输入数据
      inputs: {
        id: "",
        whsj: [],
        xftdmc: '',
        wgID: "",
        wg: "请选择所属网格",
        qc:[],
        bz: "",
        fj: null,
        fjlb: []
      },

      //网格列表
      wgList:[],

      //弹出新建器材窗口
      popupQCWindow: false,
      addQCInputs:{
        id:"",
        qcmc:"",
        sl:"",
        tp:""
      },

      //是否同意规定
      accept: true,

      //文件列表
      columns: [
        {
          name: "fjbh",
          required: true,
          label: "附件编号",
          align: "left",
          field: "fjbh",
          background: "bg-teal"
        },
        {
          name: "fjmc",
          required: true,
          label: "附件名称",
          align: "left",
          field: "fjmc"
        },
        {
          name: "fjlx",
          required: true,
          label: "附件类型",
          align: "left",
          field: "fjlx",
          sortable: true
        },
        {
          name: "fjdx",
          required: true,
          label: "附件大小",
          align: "left",
          field: "fjdx",
          sortable: true
        },
        {
          name: "fjscrq",
          required: true,
          label: "上传日期",
          align: "left",
          field: "fjscrq"
        },
        {
          name: "opt",
          label: "操作",
          align: "center",
          columns: true
        }
      ],
      tab: "dsp",

      //日期
      date: new Date(),
    };
  },

  methods: {
    //添加器材
    popupAddQC(){
      //清空输入
      for(let key in this.addQCInputs){
        this.addQCInputs[key] = ""
      }
      this.popupQCWindow = true;
    },
    addQC(){
      //生成id
      this.addQCInputs.id = `qc${this.date.getTime().toString()}`
      //向主页面添加
      this.inputs.qc.push(this.addQCInputs)
    },

    //点击所属网格时异步获取网格列表
    get(list) {
      getList(list).then(res => {
        this[list] = res
      })

    },
    //富文本编辑器
    kindeditorChange(e) {
      this.inputs.bz = (e)
    },
    //上传附件：添加到附件列表
    addToAttachmentList() {
      //获取文件类型
      let fileType = ''
      if (this.inputs.fj.type.includes('text')) {
        fileType = '文档'
      } else if (this.inputs.fj.type.includes('image')) {
        fileType = '图片'
      } else {
        fileType = '其他'
      }

      //获取上传时间
      let fileDate = ''
      //let date = new Date()
      let date = this.date;
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      fileDate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + date.getMinutes()

      //在文件列表前添加新文件
      this.inputs.fjlb.unshift({
        fjbh: "",
        fjmc: this.inputs.fj.name,
        fjlx: fileType,
        fjdx: this.inputs.fj.size < 1048576 ? (this.inputs.fj.size / 1024).toFixed(1) + 'K' : (this.inputs.fj.size / 1048576).toFixed(1) + 'M',
        fjscrq: fileDate
      })

      //清空上传文件
      this.inputs.fj = null

      //重新排列文件列表
      this.sortFileList()
    },
    //上传附件：重新排列附件列表
    sortFileList() {
      //重新给文件列表编号
      let length = this.inputs.fjlb.length
      for (let index = 0; index < length; index++) {
        if (index < 9) this.inputs.fjlb[index].fjbh = '0' + (index + 1)
        else this.inputs.fjlb[index].fjbh = (index + 1)

      }
    },
    //上传附件：删除附件列表项
    deleteData(array, key, findKey) {
      //本地删除
      let length = array.length;
      for (let index = 0; index < length; index++) {
        if (array[index][key] === findKey) {
          array.splice(index, 1)
          break;
        }
      }

      //重新排列文件列表
      this.sortFileList()
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
        //生成id
        this.inputs.id = `xftd${this.date.getTime().toString()}`
        //后端通信
        addList('xftdList', this.inputs)
        //弹出通知
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "已提交"
        });
        //跳转
        setTimeout(() => {
          this.$router.push({path: '/xgxftd'})
        }, 1000)
      }
    },
    //重置
    onReset() {
      this.$q.dialog({
        title: '确认清除',
        message: '将清除所有输入',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.inputs = {
          id: "",
          whsj: [],
          xftdmc: '',
          wgID: "",
          wg: "请选择所属网格",
          qc:[],
          bz: "",
          fj: null,
          fjlb: []
        }
      })
    }
  },

  computed: {
    wgmcList: function (){
      let wgmcList = []
      for(let index=0, length=this.wgList.length; index< length; index++){
        wgmcList.push(this.wgList[index].value)
      }
      return wgmcList
    }
  },
}
</script>
