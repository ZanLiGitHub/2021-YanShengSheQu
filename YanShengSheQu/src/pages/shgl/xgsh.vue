<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="数字社区" icon="dvr"/>
      <q-breadcrumbs-el label="商户管理" icon="store"/>
      <q-breadcrumbs-el label="修改商户"/>
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
      <q-select outlined dense v-model="filter.zmlx" :options="zmlxList" @focus="get('zmlxList')" bg-color="white" style="width:150px"/>
    </div>
    <q-space/>
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建商户" class="apply-btn" to="/xjsh"/>
    </div>

    <q-separator/>

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
            <!-- 操作按钮-->
            <template #body-cell-opt="props">
              <td style="text-align: center;">
                <q-btn icon="create" flat round dense color="blue" :to="{path:'/xgsh_xg', query:{id:props.key}}">
                  <q-tooltip>修改</q-tooltip>
                </q-btn>
                <q-btn icon="delete_forever" flat round dense color="blue" @click="deleteData(props.key)">
                  <q-tooltip>删除</q-tooltip>
                </q-btn>
              </td>
            </template>
          </q-table>

        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import {getList, deleteList} from "../../network/data";

export default {
  name: "",
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

      maximized: process.env.editMaximized, //编辑全屏
    };
  },
  methods: {
    //删除项目列表项
    deleteData(id) {
      //开启加载动画
      this.loading = true
      //后端通信
      deleteList('shList', id)
      getList('shList').then(res => {
        this.data = res
      })
      console.log("重新通信");
      //关闭加载动画
      this.loading = false
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
      return list
    },
  }
};
</script>
