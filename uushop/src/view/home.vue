<template>
    <div class="container">
         <van-nav-bar title="小U商城" left-arrow />
          <img class="img_nav" src="../assets//images/nav.png" alt="">
         <van-swipe :autoplay="2000">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img class="swiperImg" :src="$imgUrl + item.img" alt="" />
        </van-swipe-item>
        </van-swipe>

         <van-grid :border="false" :column-num="5">
        <van-grid-item v-for="item in brandList" :key="item.title">
            <van-image :src="item.brandImg" />
            <p class="titleName">{{ item.title }}</p>
        </van-grid-item>
        </van-grid>
        <img class="conn" src="../assets//images/conn.png" alt="">
        <van-tabs type="card">
      <van-tab title="最新商品">
        <van-card
          v-for="newGoods in newList"
          :key="newGoods.id"
          :price="newGoods.price.toFixed(2)"
          desc="描述信息"
          :title="newGoods.goodsname"
          :thumb="
            newGoods.img
              ? $imgUrl + newGoods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
      <van-tab title="爆款商品">
        <van-card
          v-for="hotGoods in hotList"
          :key="hotGoods.id"
          :price="hotGoods.price.toFixed(2)"
          desc="描述信息"
          :title="hotGoods.goodsname"
          :thumb="
            hotGoods.img
              ? $imgUrl + hotGoods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
      <van-tab title="所有商品">
        <van-card
          v-for="goods in goodsList"
          :key="goods.id"
          :price="goods.price.toFixed(2)"
          desc="描述信息"
          :title="goods.goodsname"
          :thumb="
            goods.img
              ? $imgUrl + goods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
    </van-tabs>
    </div>
</template>

<script>
//引入接口文档
import {getBanner, getIndexGoodsList } from '../util/axios/index'
export default {
    data() {
        return {
            bannerList: [], //轮播图列表
             hotList: [], //热门商品
            newList: [], //最新商品
            goodsList: [], //所有商品
             brandList: [
                //品牌集合
                {
                title: "限时秒杀",
                brandImg: require("../assets/images/icon/seckill.png")
                },
                {
                title: "畅销商品",
                brandImg: require("../assets/images/icon/top.png")
                },
                {
                title: "品质大牌",
                brandImg: require("../assets/images/icon/brand.png")
                },
                {
                title: "小U自营",
                brandImg: require("../assets/images/icon/selfsupport.png")
                },
                {
                title: "积分商城",
                brandImg: require("../assets/images/icon/integral.png")
                }
            ]
        };
    },
    mounted(){
        this.getBannerList();
         this.getGoodsList();
    },
    methods:{
        //封装一个获取轮播图事件
        getBannerList() {
        getBanner().then(res => {
            if (res.code == 200) {
            this.bannerList = res.list;
            }
        });
        },
        getGoodsList() {
      getIndexGoodsList().then(res => {
        if (res.code == 200) {
          this.hotList = res.list[0].content;
          this.newList = res.list[1].content;
          this.goodsList = res.list[2].content;
        }
        console.log(res, "首页的商品列表");
      });
    }
    }
};
</script>

<style  lang="" scoped>
.container{
  width: 100%;
}
.van-nav-bar{
    background-color:#FF6040 ;
}
.swiperImg {
  width: 100%;
  height: 3.9rem;
}
.img_nav{
  width: 100%;
}
.conn{
  width: 100%;
}
</style>
