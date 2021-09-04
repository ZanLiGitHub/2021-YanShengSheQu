<template>
  <div class="row q-pa-md">
    <!--面包屑导航-->
    <q-breadcrumbs style="width:100%; margin:10px 0;">
      <q-breadcrumbs-el label="AI消防" icon="home" />
      <q-breadcrumbs-el label="修改消防通道"/>
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
    <q-space/>
    <!--新建档案按钮-->
    <div class="text-right q-gutter-sm q-pt-sm">
      <q-btn outline text-color="blue-8" label="新建消防通道" class="apply-btn" to="/xjxftd"/>
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
                <q-btn icon="create" flat round dense color="blue" :to="{path:'/xgxftd_xg', query:{id:props.key}}">
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

      maximized: process.env.editMaximized, //编辑全屏
    };
  },
  methods: {
    //删除项目列表项
    deleteData(id) {
      //开启加载动画
      this.loading = true
      //后端通信
      deleteList('xftdList', id)
      getList('xftdList').then(res => {
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
