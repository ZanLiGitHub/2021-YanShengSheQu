<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="数字社区" icon="home" />
      <q-breadcrumbs-el label="网格管理" icon="dvr" />
      <q-breadcrumbs-el label="修改网格"/>
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
    <q-space/>
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建小区" class="apply-btn" to="/xjxq"/>
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
                <q-btn icon="create" flat round dense color="blue" :to="{path:'/xgwg_xg', query:{id:props.key}}">
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
    <!--tab 切换 end -->
  </div>
</template>
<script>
import {getList, deleteList, deleteListByxqID} from "../../network/data";

export default {
  name: "",
  data() {
    return {
      //筛选项
      xqList: [], //筛选条件

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

      maximized: process.env.editMaximized, //编辑全屏
    };
  },
  methods: {
    //删除项目列表项
    deleteData(id) {
      //开启加载动画
      this.loading = true
      //后端通信
      deleteList('xqList', id)
      deleteListByParams('ldList', {parentID:id})
      deleteListByParams('dyList', {xqID:id})
      deleteListByParams('hList', {xqID:id})
      getList('xqList').then(res => {
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
