<template>
  <div class="q-pa-lg">
    <!--页面标题-->
    <div class="text-h6 q-pb-md">
      <strong>新建小区</strong>
    </div>
    <!--页面内容-->
    <div class="q-my-sm">
      <!--页面表单-->
      <q-form @submit="onSubmit" @reset="onReset">
        <!--页面表单内容-->
        <div class="col-sm-5 col-xs-12">
          <!--第一行：小区名称，楼栋数，单元数，层数，户数-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">小区名称</div>
            </div>
            <div class="col col-md-2">
              <q-input
                v-model="inputs.value"
                outlined
                placeholder="请输入小区名称"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入小区名称']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">小区楼栋数量</div>
            </div>
            <div class="col col-md-1">
              <q-input
                v-model="inputs.ld"
                outlined
                placeholder="小区楼栋数"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入小区楼栋数']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">每栋单元数量</div>
            </div>
            <div class="col col-md-1">
              <q-input
                v-model="inputs.dy"
                outlined
                placeholder="每栋单元数"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入每栋单元数']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">每单元楼层数</div>
            </div>
            <div class="col col-md-1">
              <q-input
                v-model="inputs.c"
                outlined
                placeholder="每单元层数"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入每单元层数']"
              />
            </div>
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">每单元户数量</div>
            </div>
            <div class="col col-md-1">
              <q-input
                v-model="inputs.h"
                outlined
                placeholder="每层户数"
                style="margin-bottom:-20px;"
                dense
                :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入每层户数']"
              />
            </div>
          </div>
          <!--第二行：具体调整-->
          <div class="row items-center" style="margin-bottom:30px">
            <div class="col col-md-1 text-right">
              <div class="q-mr-sm" style="font-size:14px; color:#757575">具体调整</div>
            </div>
            <div class="col col-md-11">
              <div class="row items-center">
                <div class="col col-md-2 text-center">楼栋号</div>
                <div class="col col-md-2 text-center">单元号</div>
                <div class="col col-md-8 text-center">户号</div>
              </div>
              <div v-for="(item, index) in ldList" :key="index" class="row items-center">
                <div class="col col-md-2"></div>
                <div class="col col-md-2"></div>
                <div class="col col-md-8"></div>
              </div>
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
          <!--第四行：备注-->
          <div class="row items-center">
            <div class="col col-md-1 text-right">
              <span class="q-mr-sm" style="font-size:14px; color:#757575">备注</span>
            </div>
            <div class="col col-md-11">
              <KindEditor :content="inputs.bz" @kindeditorChange="kindeditorChange"></KindEditor>
            </div>
          </div>
          <!--第五行：附件列表-->
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
        value: "",
        ld: "",
        dy: "",
        c: "",
        h: "",
        fzr: "",
        lxfs: "",
        bz: "",
        fj: null,
        fjlb: []
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
    //富文本编辑器
    kindeditorChange(e) {
      this.inputs.bz = (e)
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
        addList('xqList', this.inputs)
        addList('ldList', ...this.ldList)
        addList('dyList', ...this.dyList)
        addList('hList', ...this.hList)
        //弹出通知
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "已提交"
        });
        //跳转
        setTimeout(() => {
          this.$router.push({path: '/xgxq'})
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
          xq: "",
          ld: "",
          dy: "",
          c: "",
          h: "",
          fzr: "",
          lxfs: "",
          bz: "",
          fj: null,
          fjlb: []
        }
      })
    }
  },

  computed: {
    ldList: function () {
      let ldList = []
      if (this.inputs.ld !== "0" && this.inputs.ld !== "") {
        for (let index = 0, length = this.inputs.ld; index < length; index++) {
          ldList.push({
            xqID: this.inputs.id,
            parentID: this.inputs.id,
            id: `${this.inputs.id}ld${index + 1}`,
            value: `${index + 1}栋`
          })
        }
      }
      return ldList
    },

    dyList: function () {
      let dyList = []
      if (this.inputs.ld !== "0" && this.inputs.ld !== "" && this.inputs.dy !== "0" && this.inputs.dy !== "") {

        for (let key in this.ldList) {
          for (let index = 0, length = this.inputs.dy; index < length; index++) {
            dyList.push({
              xqID:this.inputs.id,
              parentID: this.ldList[key].id,
              id: `${this.ldList[key].id}dy${index + 1}`,
              value: `${index + 1}单元`
            })
          }
        }
      }
      return dyList
    },

    hList: function () {
      let hList = []
      if (this.inputs.ld !== "0" && this.inputs.ld !== "" && this.inputs.dy !== "0" && this.inputs.dy !== "" && this.inputs.c !== 0 && this.inputs.c !== "" && this.inputs.h !== "0" && this.inputs.h !== "") {
        for (let dykey in this.dyList) {
          for (let cindex = 0, length = this.inputs.c; cindex < length; cindex++) {
            for (let index = 0, length = this.inputs.h; index < length; index++) {
              hList.push({
                xqID:this.inputs.id,
                parentID: this.dyList[dykey].id,
                id: `${this.dyList[dykey].id}c${cindex+1}h${index + 1}`,
                value: index + 1 < 10 ? `${cindex + 1}0${index + 1}` : `${cindex + 1}${index + 1}`
              })
            }
          }
        }
      }
      return hList
    }
  },

  mounted() {
    //生成id
    this.inputs.id = `xq${this.date.getTime().toString()}`
  }
}
</script>
