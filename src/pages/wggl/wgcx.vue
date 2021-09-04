<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="数字社区" icon="home"  />
      <q-breadcrumbs-el label="网格管理" icon="dvr"  />
      <q-breadcrumbs-el label="网格查询" />
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
      <q-select outlined dense v-model="filter.xq" :options="xqList"  @focus="get('xqList')" bg-color="white" style="width:150px"/>
      <!--<q-select outlined dense v-model="filter.rylb" :options="rylbList" @focus="get('rylbList')" bg-color="white" style="width:150px"/>-->
      <!--<q-select outlined dense v-model="filter.xgym" :options="xgymList" @focus="get('xgymList')" bg-color="white" style="width:200px"/>-->
    </div>

    <q-space />
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建网格" class="apply-btn" to="/xjda"/>
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
                  <q-tooltip>查看档案</q-tooltip>
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
              <q-toolbar-title>查看网格</q-toolbar-title>
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
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">网格名称：</div>
                      </div>
                      <div class="col col-md-4">
                        <div class="text-body1">{{data[key].value}}</div>
                      </div>
                    </div>
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-2 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">网格范围：</div>
                      </div>
                      <div class="col col-md-10">
                        <div class="text-body1">{{data[key].xq}}</div>
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

      //筛选项
      filter: {
        //搜索与筛选参数
        searchKey: "", //搜索栏关键字
        xq: "小区", //筛选结果
      },

      //项目列表
      columns: [
        {
          name: "value",
          required: true,
          label: "网格名称",
          align: "left",
          field: "value",
          background: "bg-teal"
        },
        {
          name: "xq",
          required: true,
          label: "管辖小区",
          align: "left",
          field: "xq"
        },
        {
          name: "fzr",
          required: true,
          label: "负责人",
          align: "left",
          field: "fzr"
        },
        {
          name: "lxfs",
          required: true,
          label: "联系方式",
          align: "left",
          field: "lxfs"
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
  computed:{

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
    },
  },

//监控筛选组件
  watch: {
    //监测filter
    filter: {
      handler(val) {
        //开启加载动画
        this.loading = true
        if (val.searchKey !== "") {
          console.log("重新通信");
          getList('xqList').then(res => {
            let newList = [];
            for (let key in res) {
              let item = res[key]
              if (item.sfzh.includes(val.searchKey) || item.xm.includes(val.searchKey) || item.xq.includes(val.searchKey) || item.rylb.includes(val.searchKey) || item.xgym.includes(val.searchKey)) {
                newList.push(item)
              }
            }
            this.data = newList
          })
        } else if (val.searchKey === "") {
          console.log("回到默认")
          getList('xqList',).then(res => {
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
    getList('wgList').then(res => {
      this.data = res
      this.loading = false
    })
  },
};
</script>
