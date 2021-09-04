<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="数字社区" icon="dvr"/>
      <q-breadcrumbs-el label="商户管理" icon="store"/>
      <q-breadcrumbs-el label="商户查询"/>
    </q-breadcrumbs>
    <!--搜索栏-->
    <div class="q-py-sm" style="width:400px">
      <q-input outlined dense bg-color="white" color="grey-9" v-model="filter.searchKey" placeholder="请输入您要搜索的关键字">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </div>
    <!--筛选条件-->
    <div class="q-px-md q-py-sm flex warp q-gutter-xs">
      <q-select outlined dense v-model="filter.xq" :options="xqmcList"  @focus="get('xqList')" bg-color="white" style="width:150px"/>
      <q-select outlined dense v-model="filter.zmlx" :options="zmlxmcList" @focus="get('zmlxList')" bg-color="white" style="width:150px"/>
    </div>
    <q-space/>
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建商户" class="apply-btn" to="/xjsh"/>
    </div>

    <q-separator />

    <!--档案列表-->
    <q-tab-panels v-model="tab" animated style="width:100%;">
      <q-tab-panel name="dsp" style="padding:10px 0 0 0;">
        <div>
          <q-table
            :data="data"
            :columns="columns"
            :row-key="row => row.id"
            :loading="loading"
            flat
            square
            class="my-sticky-header-table tabletop"
            style="height:auto;"
          >
            <!--操作按钮-->
            <template #body-cell-opt="props">
              <td style="text-align: center;">
                <q-btn icon="preview" flat round dense color="blue" @click="popupDetail = true;findData(props.key)">
                  <q-tooltip>查看商户</q-tooltip>
                </q-btn>
                <q-btn icon="history" flat round dense color="blue" @click="popupHistory = true;findData(props.key)">
                  <q-tooltip>维护历史</q-tooltip>
                </q-btn>
              </td>
            </template>
          </q-table>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <!--弹出查看档案-->
    <div v-if="data.length > 0" class="q-pa-md q-gutter-sm" style="width:100%">
      <q-dialog v-model="popupDetail" >
        <q-layout view="Lhh lpR fff" container class="bg-white" style="width:80%; max-width:80%;height:80%;">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>查看商户</q-toolbar-title>
              <q-btn flat v-close-popup round dense icon="close" />
            </q-toolbar>
          </q-header>
          <q-page-container>
            <div class="q-pa-lg">
              <div class="q-my-sm">
                <q-form>
                  <div class="col-sm-5 col-xs-12">
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">商户名称：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].shmc}}</div>
                      </div>
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">开店时间：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].kdsj}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">小区：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].xq}}</div>
                      </div>
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">楼栋号：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].ld}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">单元号：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].dy}}</div>
                      </div>
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">户号：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].h}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">负责人：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].fzr}}</div>
                      </div>
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">联系方式：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].lxfs}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">证明类型：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].zmlx}}</div>
                      </div>
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">证明办理时间：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].zmsj}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-12">
                        <q-card flat bordered>
                          <q-card-section v-html="data[key].bz" />
                        </q-card>
                      </div>
                    </div>
                  </div>
                  <div  class="col-sm-5 col-xs-12" style="text-align:center;">
                    <q-btn label="关闭" v-close-popup color="primary" />
                  </div>
                </q-form>
              </div>
            </div>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </div>
    <!--弹出维护历史-->
    <div v-if="data.length > 0" class="q-pa-md q-gutter-sm" style="width:100%">
      <q-dialog v-model="popupHistory" >
        <q-layout view="Lhh lpR fff" container class="bg-white" style="width:15%; max-width:15%;height: 80%">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>维护历史</q-toolbar-title>
              <q-btn flat v-close-popup round dense icon="close" />
            </q-toolbar>
          </q-header>
          <div class="q-pa-lg" style="height: 100%">
            <div class="q-my-sm">
              <q-form >
                <div class="col-sm-5 col-xs-12" style="padding-top: 30px">
                  <div v-for="(item, index) in data[key].whsj" :key="index" class="row items-center" style="margin-bottom:10px">
                    <div class="col col-md-12 text-center">
                      <div class="q-mr-sm" style="font-size:14px; color:#757575">{{item}}</div>
                    </div>
                  </div>

                </div>
              </q-form>
            </div>
          </div>
          <q-footer style="background: white">
            <div  class="col-sm-5 col-xs-12" style="text-align:center; height: 60px;">
              <q-btn label="关闭" v-close-popup color="primary" style="margin-top: 10px" />
            </div>
          </q-footer>
        </q-layout>
      </q-dialog>
    </div>


  </div>
</template>
<script>

import {getList} from "../../network/data";

export default {
  data() {
    return {
      //筛选项
      xqList: [], //筛选条件
      zmlxList: [], //筛选条件
      filter: {
        //搜索与筛选参数
        searchKey: "", //搜索栏关键字
        xq: "小区", //筛选结果
        zmlx: "证明类型", //筛选结果
      },

      //项目列表
      columns: [
        {
          name: "shmc",
          required: true,
          label: "商户名称",
          align: "left",
          field: "shmc",
          background: "bg-teal"
        },
        {
          name: "kdsj",
          required: true,
          label: "开店时间",
          align: "left",
          field: "kdsj"
        },
        {
          name: "xq",
          required: true,
          label: "小区",
          align: "left",
          field: "xq"
        },
        {
          name: "ld",
          required: true,
          label: "楼号",
          align: "left",
          field: "ld"
        },
        {
          name: "dy",
          required: true,
          label: "单元号",
          align: "left",
          field: "dy"
        },
        {
          name: "h",
          required: true,
          label: "户号",
          align: "left",
          field: "h"
        },
        {
          name: "fzr",
          required: true,
          label: "负责人",
          align: "left",
          field: "fzr"
        },
        {
          name: "zmlx",
          required: true,
          label: "证明类型",
          align: "left",
          field: "zmlx"
        },
        {
          name: "opt",
          label: "操作",
          align: "center",
          columns: true
        }
      ],//表格列名
      loading: true,
      data: [],//列表数据
      tab: "dsp",
      key: 0,

      //查看项目
      popupDetail: false,

      //维护历史
      popupHistory: false,
    };
  },

  methods: {
    //通过row-key寻找被点击行的数据
    findData(id){
      for(let key in this.data){
        if(this.data[key].id === id){
          this.key = key
          break;
        }
      }
      console.log(this.data[this.key].whsj)
    },

    //获取筛选项列表
    get(list) {
      getList(list).then(res => {
        this[list] = res
      })
    },
  },

  //监控筛选组件
  watch: {
    //监测filter
    filter: {
      handler(val) {
        //开启加载动画
        this.loading = true
        let xq = val.xq === "小区" || val.xq === "全部" ? null : val.xq
        let zmlx = val.zmlx === "证明类型" || val.zmlx === "全部" ? null : val.zmlx

        if (xq !== null || zmlx !== null || val.searchKey !== "") {
          console.log("重新通信");
          getList('shList', {xq,zmlx}).then(res => {
            if (val.searchKey === "") {
              this.data = res
            } else {
              let newList = [];
              for (let key in res) {
                let item = res[key]
                if (item.shmc.includes(val.searchKey) || item.xq.includes(val.searchKey) || item.zmlx.includes(val.searchKey) || item.fzr.includes(val.searchKey)) {
                  newList.push(item)
                }
              }
              this.data = newList
            }
          })
        } else if (val.searchKey === "") {
          console.log("回到默认")
          getList('shList',{xq, zmlx}).then(res => {
            this.data = res
          })
        }
        this.loading = false
      },
      deep: true
    },
  },

  //生命周期：挂载后
  mounted() {
    this.loading = true
    //获取档案列表
    getList('shList').then(res => {
      this.data = res
      this.loading = false
    })
  },

  computed:{
    xqmcList:function (){
      let list = []
      for(let key in this.xqList){
        list.push(this.xqList[key].value)
      }
      list.unshift("全部")
      return list
    },

    zmlxmcList:function (){
      let list = []
      for(let key in this.zmlxList){
        list.push(this.zmlxList[key])
      }
      list.unshift("全部")
      return list
    },
  }
};
</script>
