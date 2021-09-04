<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="AI消防" icon="fire_extinguisher"/>
      <q-breadcrumbs-el label="消防通道查询" icon="search"/>
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
      <q-select outlined dense v-model="filter.wg" :options="wgmcList"  @focus="get('wgList')" bg-color="white" style="width:150px"/>
      <!--<q-select outlined dense v-model="filter.rylb" :options="rylbList" @focus="get('rylbList')" bg-color="white" style="width:150px"/>-->
      <!--<q-select outlined dense v-model="filter.xgym" :options="xgymList" @focus="get('xgymList')" bg-color="white" style="width:200px"/>-->
    </div>
    <q-space />
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建消防通道" class="apply-btn" to="/xjxftd"/>
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

    <!--弹出消防通道详情-->
    <div v-if="data.length > 0" class="q-pa-md q-gutter-sm" style="width:100%">
      <q-dialog v-model="popupDetail" >
        <q-layout view="Lhh lpR fff" container class="bg-white" style="width:80%; max-width:80%;height:80%;">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>查看消防通道详情</q-toolbar-title>
              <q-btn flat v-close-popup round dense icon="close" />
            </q-toolbar>
          </q-header>
          <q-page-container>
            <div class="q-pa-lg">
              <div class="q-my-sm">
                <q-form>
                  <div class="col-sm-5 col-xs-12">
                    <!--消防通道名称，所属网格-->
                    <div class="row items-center" style="margin-bottom:20px">
                      <div class="col col-md-1 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">消防通道名称：</div>
                      </div>
                      <div class="col col-md-5">
                        <div class="text-body1">{{data[key].xftdmc}}</div>
                      </div>
                      <div class="col col-md-1 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">所属网格：</div>
                      </div>
                      <div class="col col-md-5">
                        <div class="text-body1">{{data[key].wg}}</div>
                      </div>
                    </div>
                    <!--器材列表-->
                    <div class="row items-center" style="margin-bottom:20px;">
                      <div class="col col-md-1 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">器材列表：</div>
                      </div>
                      <div class="col col-md-11" style="max-height: 300px; overflow-y: scroll; border: 1px rgba(0,0,0,.1) solid; border-radius: 5px">
                        <div class="row items-start q-gutter-lg" style="padding:20px">
                          <q-card style="height: 200px; width: 150px" class="my-card" v-for="item in data[key].qc" :key="item.id">
                            <q-img
                              style="width: 100%; height: 80%;"
                              :src="item.tp"
                              basic
                            >
                              <div style="height: 15%; line-height: 15%" class="absolute-bottom text-body1">
                                {{item.qcmc}}
                              </div>
                            </q-img>

                            <q-card-section style="padding-top: 12%; height: 10%; line-height: 10%">
                              数量：{{item.sl}}
                            </q-card-section>
                          </q-card>
                        </div>
                      </div>
                    </div>
                    <!--备注-->
                    <div class="row items-center" style="margin-bottom:10px">
                      <div class="col col-md-1 text-right">
                        <div class="q-mr-sm" style="font-size:14px; color:#757575">备注：</div>
                      </div>
                      <div class="col col-md-11">
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
      filter: {
        //搜索与筛选参数
        searchKey: "", //搜索栏关键字
        wg: "所属网格", //筛选结果
      },
      //网格列表
      wgList:[],

      //项目列表
      columns: [
        {
          name: "xftdmc",
          required: true,
          label: "消防通道名称",
          align: "left",
          field: "xftdmc",
          background: "bg-teal"
        },
        {
          name: "wg",
          required: true,
          label: "所属网格",
          align: "left",
          field: "wg"
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
        let wg = val.wg === "所属网格" || val.wg === "全部" ? null : val.wg

        if (wg !== null || val.searchKey !== "") {
          console.log("重新通信");
          getList('xftdList', {wg: wg}).then(res => {
            if (val.searchKey === "") {
              this.data = res
            } else {
              let newList = [];
              for (let key in res) {
                let item = res[key]
                if (item.xftdmc.includes(val.searchKey) || item.wg.includes(val.searchKey)) {
                  newList.push(item)
                }
              }
              this.data = newList
            }
          })
        } else if (val.searchKey === "") {
          console.log("回到默认")
          getList('xftdList',{wg:wg}).then(res => {
            this.data = res
          })
        }
        this.loading = false
      },
      deep: true
    },
  },

  computed: {
    wgmcList: function (){
      let wgmcList = []
      for(let index=0, length=this.wgList.length; index< length; index++){
        wgmcList.push(this.wgList[index].value)
      }
      wgmcList.unshift("全部")
      return wgmcList
    }
  },

  //生命周期：挂载后
  mounted() {
    this.loading = true
    //获取档案列表
    getList('xftdList').then(res => {
      this.data = res
      this.loading = false
    })
  },
};
</script>
