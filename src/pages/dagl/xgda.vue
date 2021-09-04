<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="数字社区" icon="home" to="/main"/>
      <q-breadcrumbs-el label="档案管理" icon="dvr" to="/xgxm"/>
      <q-breadcrumbs-el label="修改档案"/>
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
      <q-select outlined dense v-model="filter.rylb" :options="rylbList" @focus="get('rylbList')" bg-color="white" style="width:150px"/>
      <q-select outlined dense v-model="filter.xgym" :options="xgymList" @focus="get('xgymList')" bg-color="white" style="width:200px"/>
    </div>
    <q-space/>
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建档案" class="apply-btn" to="/xjda"/>
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
                <q-btn icon="create" flat round dense color="blue" :to="{path:'/xgda_xg', query:{id:props.key}}">
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
    <!--tab 切换 end -->
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
      rylbList: [], //筛选条件
      xgymList: [], //筛选条件
      filter: {
        //搜索与筛选参数
        searchKey: "", //搜索栏关键字
        xq: "小区", //筛选结果
        rylb: "人员类别", //筛选结果
        xgym: "新冠疫苗接种情况", //筛选结果
      },

      //项目列表
      columns: [
        {
          name: "sfzh",
          required: true,
          label: "身份证号",
          align: "left",
          field: "sfzh",
          background: "bg-teal"
        },
        {
          name: "xm",
          required: true,
          label: "姓名",
          align: "left",
          field: "xm"
        },
        {
          name: "nl",
          required: true,
          label: "年龄",
          align: "left",
          field: "nl",
          sortable: true
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
          name: "rylb",
          required: true,
          label: "人员类别",
          align: "left",
          field: "rylb"
        },
        {
          name: "xgym",
          required: true,
          label: "新馆疫苗接种情况",
          align: "left",
          field: "xgym"
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
      deleteList('dataList', id)
      getList('dataList').then(res => {
        this.data = res
      })
      console.log("重新通信");
      //关闭加载动画
      this.loading = false
    },

    //获取筛选项列表
    get(list) {
      switch (list){
        case 'xqList':
          //获取小区列表
          getList('xqList').then(res => {
            let newList = []
            for (let index = 0, length = res.length; index < length; index++) {
              newList.push(res[index].value)
            }
            newList.unshift("全部")
            this.xqList = newList
            this.loading = false
          })
          break;

        case 'rylbList':
          //获取人员类别列表
          getList('rylbList').then(res => {
            let newList = res
            newList.unshift("全部")
            this.rylbList = newList
          })
          break;

        case 'xgymList':
          //获取新冠疫苗接种情况列表
          getList('xgymList').then(res => {
            let newList = res
            newList.unshift("全部")
            this.xgymList = newList
          })
          this.loading = false
          break;
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
        let xq = val.xq === "小区" || val.xq === "全部" ? null : val.xq
        let rylb = val.rylb === "人员类别" || val.rylb === "全部" ? null : val.rylb
        let xgym = val.xgym === "新冠疫苗接种情况" || val.xgym === "全部" ? null : val.xgym

        if (xq !== null || rylb !== null || xgym !== null || val.searchKey !== "") {
          console.log("重新通信");
          getList('dataList', {xq, rylb, xgym}).then(res => {
            if (val.searchKey === "") {
              this.data = res
            } else {
              let newList = [];
              for (let key in res) {
                let item = res[key]
                if (item.sfzh.includes(val.searchKey) || item.xm.includes(val.searchKey) || item.xq.includes(val.searchKey) || item.rylb.includes(val.searchKey) || item.xgym.includes(val.searchKey)) {
                  newList.push(item)
                }
              }
              this.data = newList
            }
          })
        } else if (val.searchKey === "") {
          console.log("回到默认")
          getList('dataList',{xq, rylb, xgym}).then(res => {
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
    getList('dataList').then(res => {
      this.data = res
      this.loading = false
    })
  },
};
</script>
