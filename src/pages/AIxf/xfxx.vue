<template>
  <div style="height: 100%;">
    <div class="row" style="height: 100%;">
      <!--地图信息-->
      <div class="col-10" style="position: relative">
        <img src="../../../public/img/map.jpg" style="width: 100%;"/>
        <button @click="showLDInfo"
                style="position: absolute; top: 13%; left: 14%; background: red; width: 7.8%; height: 2.5%;">31 河滨 1
        </button>
        <button @click="showWGInfo"
                style="position: absolute; top: 7%; left: 20%; background: teal; color: white; width: 7.8%; height: 2.5%;">
          网格1
        </button>
      </div>
      <!--右侧信息窗口-->
      <div style="background: white" class="col-2">
        <q-card style="height: 100%;">
          <!--楼栋信息-->
          <q-card-section v-show="this.ldSelected">
            <!--楼栋名称-->
            <div class="q-gutter-md">
              <p class="text-h5">楼栋名称</p>
              <p class="text-body1 text-primary">{{ title }}</p>
            </div>

            <q-separator style="margin-bottom: 30px"/>

            <!--所属单位-->
            <div class="q-gutter-md">
              <p class="text-h5">所属单位</p>
              <p class="text-body1 text-primary">{{ admin }}</p>
            </div>

            <q-separator style="margin-bottom: 30px"/>

            <!--商户列表-->
            <div class="q-gutter-md">
              <p class="text-h5">商户列表</p>
              <q-list bordered>
                <q-item v-for="item in shList" :key="item.id" class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ item.shmc }}</q-item-label>
                    <q-item-label caption lines="1">电话：{{ item.lxfs }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn icon="info" color="primary" flat round dense @click="popupSH(item)"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

          </q-card-section>
          <!--网格信息-->
          <q-card-section v-show="this.wgSelected">
            <!--楼栋名称-->
            <div class="q-gutter-md">
              <p class="text-h5">网格名称</p>
              <p class="text-body1 text-primary">{{ title }}</p>
            </div>

            <q-separator style="margin-bottom: 30px"/>

            <!--负责人-->
            <div class="q-gutter-md">
              <p class="text-h5">负责人</p>
              <p class="text-body1 text-primary">{{ admin }}</p>
              <p class="text-body1 text-primary">电话：{{ adminTel }}</p>
            </div>

            <q-separator style="margin-bottom: 30px"/>

            <!--消防信息列表-->
            <div class="q-gutter-md">
              <p class="text-h5">消防信息列表</p>
              <q-list bordered>
                <q-item v-for="item in xftdList" :key="item.id" class="q-my-sm" clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ item.xftdmc }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn icon="info" color="primary" flat round dense @click="popupXFTD(item)"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!--弹出商户详情-->
      <div v-if="shList.length > 0" class="q-pa-md q-gutter-sm" style="width:100%">
        <q-dialog v-model="popupSHWindow" >
          <q-layout view="Lhh lpR fff" container class="bg-white" style="width:80%; max-width:80%;height:80%;">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title>查看商户详情</q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <div class="q-pa-lg">
                <div class="q-my-sm">
                  <q-form>
                    <div class="col-sm-5 col-xs-12">
                      <!--商户名称，联系方式-->
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">商户名称：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.shmc}}</div>
                        </div>
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">联系方式：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.lxfs}}</div>
                        </div>
                      </div>
                      <!--小区，楼栋号-->
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">小区：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.xq}}</div>
                        </div>
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">楼栋号：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.ld}}</div>
                        </div>
                      </div>
                      <!--单元号，户号-->
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">单元号：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.dy}}</div>
                        </div>
                        <div class="col col-md-2 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">户号：</div>
                        </div>
                        <div class="col col-md-4">
                          <div class="text-body1">{{selectedSH.h}}</div>
                        </div>
                      </div>
                      <div class="row items-center" style="margin-bottom:10px">
                        <div class="col col-md-12">
                          <q-card flat bordered>
                            <q-card-section v-html="selectedSH.bz" />
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
      <!--弹出消防通道详情-->
      <div v-if="xftdList.length > 0" class="q-pa-md q-gutter-sm" style="width:100%">
        <q-dialog v-model="popupXFTDWindow" >
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
                          <div class="text-body1">{{selectedXFTD.xftdmc}}</div>
                        </div>
                        <div class="col col-md-1 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">所属网格：</div>
                        </div>
                        <div class="col col-md-5">
                          <div class="text-body1">{{selectedXFTD.wg}}</div>
                        </div>
                      </div>
                      <!--器材列表-->
                      <div class="row items-center" style="margin-bottom:20px;">
                        <div class="col col-md-1 text-right">
                          <div class="q-mr-sm" style="font-size:14px; color:#757575">器材列表：</div>
                        </div>
                        <div class="col col-md-11" style="max-height: 300px; overflow-y: scroll; border: 1px rgba(0,0,0,.1) solid; border-radius: 5px">
                          <div class="row items-start q-gutter-lg" style="padding:20px">
                            <q-card style="height: 200px; width: 150px" class="my-card" v-for="item in selectedXFTD.qc" :key="item.id">
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
                            <q-card-section v-html="selectedXFTD.bz" />
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
    </div>
  </div>

</template>

<script>
export default {
  name: "xf",

  data() {
    return {
      //楼栋信息
      ldSelected: false,//点击的是楼栋
      popupSHWindow: false,//弹出商户详情
      shList: [
        {
          id: "1",
          xqID:"",
          shmc: '菜鸟驿站',
          lxfs: '13000000000',
          xq:"水晶嘉园",
          ld:"1",
          dy:"1",
          c:"1",
          h:"101",
          bz:"菜鸟驿站备注",
          fj:null,
          fjlb:[]
        },
        {
          id: "2",
          shmc: '李先生牛肉面',
          lxfs: '13000000000',
          xq:"水晶嘉园",
          ld:"1",
          dy:"1",
          c:"1",
          h:"102",
          bz:"李先生牛肉面备注",
          fj:null,
          fjlb:[]
        },
        {
          id: "3",
          shmc: '家庭便利店',
          lxfs: '13000000000',
          xq:"新星宇和悦",
          ld:"1",
          dy:"1",
          c:"1",
          h:"101",
          bz:"家庭便利店备注",
          fj:null,
          fjlb:[]
        },
        {
          id: "4",
          shmc: '肯德基',
          lxfs: '13000000000',
          xq:"新星宇和悦",
          ld:"1",
          dy:"1",
          c:"1",
          h:"102",
          bz:"肯德基备注",
          fj:null,
          fjlb:[]
        }
      ],
      selectedSH:{},

      //网格
      wgSelected: false, //点击的是网格
      popupXFTDWindow:false,//弹出消防通道
      xftdList:[
        {
          id: "1",
          wgID:"1",
          xftdmc: '消防通道1',
          wg:"网格1",
          bz:"消防通道1备注",
          qc:[
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            }
          ],
          fj:null,
          fjlb:[]
        },
        {
          id: "2",
          wgID:"1",
          xftdmc: '消防通道2',
          wg:"网格1",
          bz:"消防通道2备注",
          qc:[
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            }
          ],
          fj:null,
          fjlb:[]
        },
        {
          id: "3",
          wgID:"1",
          xftdmc: '消防通道3',
          wg:"网格1",
          bz:"消防通道3备注",
          qc:[
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            },
            {
              id:"qc1",
              qcmc:"灭火器",
              sl:"20",
              tp:"https://jmy-pic.wejianzhan.com/0/pic/c120a9b03b009542f7848abb5c560de7.jpg",
            },
            {
              id:"qc2",
              qcmc:"呼救器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/b9442090d40401cf6afc111e4a2c320e.jpg",
            },
            {
              id:"qc3",
              qcmc:"自助呼吸器",
              sl:"20",
              tp:"https://jmy-pic.baidu.com/0/pic/2a0b38e4c7ed59f48782202fa5f9db66.jpg",
            },
            {
              id:"qc3",
              qcmc:"消防斧",
              sl:"20",
              tp: "https://jmy-pic.baidu.com/0/pic/c52fe61e3d7becbebd317efdcd861d9d.jpg",
            }
          ],
          fj:null,
          fjlb:[]
        },
      ],
      selectedXFTD:{},
      title: "",
      admin: "",
      adminTel:"",
    }
  },

  methods: {
    popupSH(item){
      this.popupSHWindow = true;
      this.selectedSH = item
    },

    popupXFTD(item){
      this.popupXFTDWindow = true;
      this.selectedXFTD = item
    },

    showLDInfo() {
      this.wgSelected = false;
      this.ldSelected = true;
      this.title = "河滨小区1栋"
      this.admin = "延盛委31组"
    },
    showWGInfo() {
      this.wgSelected = true;
      this.ldSelected = false;
      this.title = "网格1"
      this.admin = "延盛委"
      this.adminTel = "13000000000"
    }
  }
}
</script>

<style scoped lang="less">

</style>
