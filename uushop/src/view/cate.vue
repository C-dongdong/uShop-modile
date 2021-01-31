<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="分类" left-arrow />
    <!-- 搜索框 -->
    <van-cell-group>
      <van-field left-icon="search" placeholder="请随意搜索"
    /></van-cell-group>
    <div class="cateInfo">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in cateList" :key='item.id' :title="item.catename" />
      </van-sidebar>
      <!-- 二级分类展示 -->
      <van-grid :border="false" :gutter='10' :column-num="3">
        <van-grid-item :to="'/list?id='+item.id" v-for='item in secondList' :key='item.id'>
          <van-image :src="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/apple-1.jpg'" />
          <p class="catetitle">{{item.catename}}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
//引入接口列表
import {getCateList} from '../util/axios/index'
export default {
  data() {
    return {
      activeKey: 0,
      cateList:[],
      secondList:[]
    };
  },
  mounted() {
      //页面一加载就触发分类列表
      this.getCateInfo()
  },
  methods: {
      //封装一个左侧侧边栏切换的监听事件
      onChange(){
          console.log(this.activeKey,'activeKey');
          //当切换左侧侧边栏，动态获取二级分类
          this.secondList = this.cateList[this.activeKey].children
      },
      //封装一个获取分类列表的接口
      getCateInfo(){
          getCateList()
          .then(res=>{
              if(res.code==200){
                  //一级分类
                  this.cateList = res.list
                  //二级分类
                  this.secondList = res.list[0].children
              }
              console.log(res,'分类列表');
          })
      }
  },
};
</script>

<style lang="" scoped>
.cateInfo{
    display: flex;
}
.van-grid{
    flex: 1;
}
.catetitle{
    font-size: 13px;
    color: #333;
}
</style>
