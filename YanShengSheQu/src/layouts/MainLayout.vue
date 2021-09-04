<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title style="position: relative">
          <img style="height: 60px;margin-left: 10px;margin-right: 5px" src="/img/logo.png"/>
          <span style="font-size: 30px; position: absolute; top:50%; transform: translateY(-50%)">延 盛 社 区</span>
        </q-toolbar-title>
        <!--顶部导航start-->
        <div class="self-stretch row no-wrap gt-md" style="float:left;">
          <q-btn flat :to="value.to" :label="value.label" v-for="(value,index) in com">
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="nav in value.child" :to="nav.to">
                  <q-item-section>
                    <q-item-label>{{ nav.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <!--顶部导航end-->
        <q-btn flat round dense icon="person_outline" label="管理员" title="管理信息"/>
        <q-btn flat round dense icon="power_settings_new" class="q-ml-lg" label="退出" to="/"/>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer show-if-above v-model="left" side="left" bordered>

    </q-drawer> -->
    <!-- 菜单 -->
    <q-drawer show-if-above v-model="left" side="left" elevated id="menu" style="background:#0CC">
      <q-list class="bg-primary-menu-BGColor" style="overflow:hidden">
        <template v-for="(item1, index1) in menuData.data">
          <!-- 一级有子集 -->
          <q-expansion-item v-if="item1.children!=undefined" group="one" :label="item1.name" :icon="item1.icon"
                            expand-separator class="text-primary-column bg-primary-menu-BGColor">
            <template v-for="(item2, index2) in item1.children">
              <!-- 二级有子集 -->
              <q-expansion-item v-if="item2.children!=undefined" group="tow" :label="item2.name" :icon="item2.icon"
                                dense-toggle expand-separator :header-inset-level="0.2" class="text-primary-column">
                <template v-for="(item3, index3) in item2.children">
                  <!-- 三级有子集 -->
                  <q-expansion-item v-if="item3.children!=undefined" group="three" :label="item3.name"
                                    :icon="item3.icon" dense-toggle :header-inset-level="0.4"
                                    class="text-primary-column">
                    <template v-for="(item4, index4) in item3.children">
                      <!-- 四级只可以为菜单 -->
                      <q-item :to="item4.urlPath" :key="item4.id" clickable v-ripple
                              class="text-primary-menu-unselected">
                        <q-item-section avatar>
                          <q-icon :name="item4.icon" style="margin-left: 35px;margin-right: 15px;"/>
                        </q-item-section>
                        <q-item-section>
                          {{ item4.name }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-expansion-item>
                  <!-- 三级无子集 -->
                  <q-item v-if="item3.children==undefined" :to="item3.urlPath" :key="item3.id" clickable v-ripple
                          class="text-primary-menu-unselected">
                    <q-item-section avatar>
                      <q-icon :name="item3.icon" style="margin-left: 23px;margin-right: 15px;"/>
                    </q-item-section>
                    <q-item-section>
                      {{ item3.name }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-expansion-item>
              <!-- 二级无子集 -->
              <q-item v-if="item2.children==undefined" :to="item2.urlPath" :key="item2.id" clickable v-ripple
                      class="text-primary-menu-unselected">
                <q-item-section avatar>
                  <q-icon :name="item2.icon" style="margin-left: 12px;margin-right: 15px;"/>
                </q-item-section>
                <q-item-section>
                  {{ item2.name }}
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
          <!-- 一级无子集 -->
          <q-item v-if="item1.children==undefined" :to="item1.urlPath" :key="item1.id" clickable v-ripple
                  class="text-primary-menu-unselected">
            <q-item-section avatar>
              <q-icon :name="item1.icon"/>
            </q-item-section>
            <q-item-section>
              {{ item1.name }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      com: [
        /*{
            label:"首页",
            to:"/main",

          },*/
        {
          label: "数字社区",

          child: [
            {
              label: "新建档案",
              to: "/xjda"
            },
            {
              label: "修改档案",
              to: "/xgda"
            },
            {
              label: "档案查询",
              to: "/dacx"
            },
            {
              label: "新建小区",
              to: "/xjxq"
            },
            {
              label: "修改小区",
              to: "/xgxq"
            },
            {
              label: "小区查询",
              to: "/xqcx"
            }
          ]
        },
        {
          label: "AI消防",

          child: [
            {
              label: "新建档案",
              to: "/xjda"
            },
            {
              label: "修改档案",
              to: "/xgda"
            },
            {
              label: "档案查询",
              to: "/dacx"
            },
            {
              label: "新建小区",
              to: "/xjxq"
            },
            {
              label: "修改小区",
              to: "/xgxq"
            },
            {
              label: "小区查询",
              to: "/xqcx"
            }
          ]
        },
        {
          label: "系统设置",
          child: [
            {
              label: "用户/权限管理",
              to: "/yhgl"
            },
            {
              label: "房屋性质维护",
              to: "/fwxzwh"
            },
            {
              label: "证明类型维护",
              to: "/zmlxwh"
            }
          ]
        }
      ],
      menuData: {
        data: [
          {
            "id": "szsq",
            "pId": "aaaaa",
            "label": "数字社区",
            "icon": "dvr",
            "name": "数字社区",
            "uuid": "aa001",
            "puuid": "szsq",
            "sort": 1,
            "state": "",
            "type": "menu",
            "children": [
              {
                "id": "dagl",
                "pId": "szsq",
                "label": "档案管理",
                "icon": "perm_contact_calendar",
                "name": "档案管理",
                "uuid": "aa001",
                "puuid": "szsq",
                "sort": 1,
                "state": "",
                "type": "menu",
                "children": [
                  {
                    "id": "xjda",
                    "pId": "dagl",
                    "label": "新建档案",
                    "path": "xjda",
                    "icon": "playlist_add",
                    "name": "新建档案",
                    "puuid": "dagl",
                    "sort": 11,
                    "type": "menu",
                    "urlPath": "xjda",
                    "uuid": "xjda"
                  },
                  {
                    "id": "xgda",
                    "pId": "dagl",
                    "label": "修改档案",
                    "path": "list",
                    "icon": "border_color",
                    "name": "修改档案",
                    "puuid": "dagl",
                    "sort": 12,
                    "type": "menu",
                    "urlPath": "xgda",
                    "uuid": "xgda"
                  },
                  {
                    "id": "dacx",
                    "pId": "dagl",
                    "label": "档案查询",
                    "path": "dacx",
                    "icon": "search",
                    "name": "档案查询",
                    "puuid": "dagl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "dacx",
                    "uuid": "dacx"
                  },
                ]
              },
              {
                "id": "shgl",
                "pId": "szsq",
                "label": "商户管理",
                "icon": "store",
                "name": "商户管理",
                "uuid": "aa002",
                "puuid": "szsq",
                "sort": 2,
                "state": "",
                "type": "menu",
                "children": [
                  {
                    "id": "xjsh",
                    "pId": "shgl",
                    "label": "新建商户",
                    "path": "xjsh",
                    "icon": "playlist_add",
                    "name": "新建商户",
                    "puuid": "shgl",
                    "sort": 1,
                    "type": "menu",
                    "urlPath": "xjsh",
                    "uuid": "xjsh"
                  },
                  {
                    "id": "xgsh",
                    "pId": "dagl",
                    "label": "修改商户",
                    "path": "list",
                    "icon": "border_color",
                    "name": "修改商户",
                    "puuid": "shgl",
                    "sort": 2,
                    "type": "menu",
                    "urlPath": "xgsh",
                    "uuid": "xgsh"
                  },
                  {
                    "id": "shcx",
                    "pId": "shgl",
                    "label": "商户查询",
                    "path": "shcx",
                    "icon": "search",
                    "name": "商户查询",
                    "puuid": "dagl",
                    "sort": 3,
                    "type": "menu",
                    "urlPath": "shcx",
                    "uuid": "shcx"
                  },
                ]
              },
              {
                "id": "xqgl",
                "pId": "szsq",
                "label": "小区管理",
                "icon": "domain",
                "name": "小区管理",
                "uuid": "aa002",
                "puuid": "szsq",
                "sort": 2,
                "state": "",
                "type": "menu",
                "children": [
                  {
                    "id": "xjxq",
                    "pId": "xqgl",
                    "label": "新建小区",
                    "path": "xjxq",
                    "icon": "playlist_add",
                    "name": "新建小区",
                    "puuid": "xqgl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "xjxq",
                    "uuid": "xjxq"
                  },
                  {
                    "id": "xgxq",
                    "pId": "xqgl",
                    "label": "修改小区",
                    "path": "xgxq",
                    "icon": "border_color",
                    "name": "修改小区",
                    "puuid": "xqgl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "xgxq",
                    "uuid": "xgxq"
                  },
                  {
                    "id": "xqcx",
                    "pId": "xqgl",
                    "label": "小区查询",
                    "path": "xqcx",
                    "icon": "search",
                    "name": "小区查询",
                    "puuid": "xqgl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "xqcx",
                    "uuid": "xqcx"
                  },
                ]
              },
              {
                "id": "wggl",
                "pId": "szsq",
                "label": "网格管理",
                "icon": "dashboard",
                "name": "网格管理",
                "uuid": "aa003",
                "puuid": "szsq",
                "sort": 3,
                "state": "",
                "type": "menu",
                "children": [
                  {
                    "id": "xjwg",
                    "pId": "wggl",
                    "label": "新建网格",
                    "path": "xjwg",
                    "icon": "playlist_add",
                    "name": "新建网格",
                    "puuid": "wggl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "xjwg",
                    "uuid": "xjwg"
                  },
                  {
                    "id": "xgwg",
                    "pId": "wggl",
                    "label": "修改网格",
                    "path": "xgwg",
                    "icon": "border_color",
                    "name": "修改网格",
                    "puuid": "wggl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "xgwg",
                    "uuid": "xgwg"
                  },
                  {
                    "id": "wgcx",
                    "pId": "wggl",
                    "label": "网格查询",
                    "path": "wgcx",
                    "icon": "search",
                    "name": "网格查询",
                    "puuid": "wggl",
                    "sort": 13,
                    "type": "menu",
                    "urlPath": "wgcx",
                    "uuid": "wgcx"
                  },
                ]
              },
            ]
          },
          {
            "id": "aixf",
            "pId": "aaaa2",
            "label": "AI消防",
            "icon": "fire_extinguisher",
            "name": "AI消防",
            "uuid": "aa002",
            "puuid": "aixf",
            "sort": 2,
            "state": "",
            "type": "menu",
            "children": [
              {
                "id": "xfxx",
                "pId": "aixf",
                "label": "消防信息",
                "path": "xfxx",
                "icon": "art_track",
                "name": "消防信息",
                "puuid": "aixf",
                "sort": 11,
                "type": "menu",
                "urlPath": "xfxx",
                "uuid": "xfxx"
              },
              {
                "id": "xjxftd",
                "pId": "aixf",
                "label": "新建消防通道",
                "path": "xjxftd",
                "icon": "playlist_add",
                "name": "新建消防通道",
                "puuid": "aixf",
                "sort": 11,
                "type": "menu",
                "urlPath": "xjxftd",
                "uuid": "xjxftd"
              },
              {
                "id": "xgxftd",
                "pId": "aixf",
                "label": "修改消防通道",
                "path": "xgxftd",
                "icon": "border_color",
                "name": "修改消防通道",
                "puuid": "aixf",
                "sort": 11,
                "type": "menu",
                "urlPath": "xgxftd",
                "uuid": "xgxftd"
              },
              {
                "id": "xftdcx",
                "pId": "aixf",
                "label": "消防通道查询",
                "path": "xftdcx",
                "icon": "search",
                "name": "消防通道查询",
                "puuid": "aixf",
                "sort": 11,
                "type": "menu",
                "urlPath": "xftdcx",
                "uuid": "xftdcx"
              },
            ]
          },
          {
            "id": "xtsz",
            "pId": "aaaaa",
            "label": "系统设置",
            "icon": "miscellaneous_services",
            "name": "系统设置",
            "uuid": "aa001",
            "puuid": "szsq",
            "sort": 6,
            "state": "",
            "type": "menu",
            "children": [
              {
                "id": "yhgl",
                "pId": "xtsz",
                "label": "用户/权限管理",
                "path": "yhgl",
                "icon": "how_to_reg",
                "name": "用户/权限管理",
                "puuid": "xtsz",
                "sort": 62,
                "type": "menu",
                "urlPath": "yhgl",
                "uuid": "yhgl"
              },
              {
                "id": "fwxzwh",
                "pId": "xtsz",
                "label": "房屋性质维护",
                "path": "fwxzwh",
                "icon": "post_add",
                "name": "房屋性质维护",
                "puuid": "xtsz",
                "sort": 64,
                "type": "menu",
                "urlPath": "fwxzwh",
                "uuid": "fwxzwh"
              },
              {
                "id": "zmlxwh",
                "pId": "xtsz",
                "label": "证明类型维护",
                "path": "zmlxwh",
                "icon": "post_add",
                "name": "证明类型维护",
                "puuid": "xtsz",
                "sort": 65,
                "type": "menu",
                "urlPath": "zmlxwh",
                "uuid": "zmlxwh"
              }
            ]
          }
        ]
      }
    }
  },
  /*mounted() {
     this.leftDrawerOpen=false,
     this.disable=true
    },*/
  methods: {
    tabclick(index) {
      if (
        this.com[index].child != undefined &&
        this.com[index].child.length > 0
      ) {
        (this.leftDrawerOpen = true), (this.disabl = false);
      } else {
        (this.leftDrawerOpen = false), (this.disabl = true);
      }
    },
    changeColor(color) {
      colors.setBrand("primary", color);
      this.customizeColor = color;
    },
    changeCustomizeColor() {
      colors.setBrand("primary", this.customizeColor);
    }
  }
}
</script>
