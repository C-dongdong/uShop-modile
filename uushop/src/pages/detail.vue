<template>
  <div class="container">
    <div class="headerTop">
      <div class="left" @click="$router.go(-1)">
        <img src="" alt="" />
      </div>
      <div class="title">
      </div>
    </div>
    <div class="banner">
      <a href="javascript:;">
        <img
          :src="
            goods.img
              ? $imgUrl + goods.img
              : 'http://p4.music.126.net/LB6hcyND-KTqBlfYMkbEnw==/109951165480872644.jpg?param=140y140'
          "
          alt=""
        />
      </a>
    </div>
    <div class="content">
      <div class="text">
        <p>{{ goods.goodsname }}</p>
        <p>￥{{ goodsPrice }}<span></span></p>
      </div>
    </div>
    <div class="listDetail">
      <div>
        <p>购买数量</p>
        <div>
          <input type="button" @click="subtractCount" value="-" />
          <input type="text" :value="count" />
          <input type="button" @click="addCount" value="+" />
        </div>
      </div>
      <div>
        <p>商品属性</p>
      </div>
      <div>
        <p>
          {{ goods.specsname
          }}<span v-for="item in goods.specsattr" :key="item">{{ item }}</span>
        </p>
      </div>
    </div>
    <div class="ShopDetail">
      <div>
        <h3>商品详情</h3>
      </div>
      <div v-html="goods.description"></div>
    </div>
    <div class="account">
      <a href="javascript:;">
        <i class="iconfont">&#xe681;</i>
        <p>购物车</p>
      </a>
      <input type="button" @click="CartAdd" value="加入购物车" />
      <input type="button" value="立即购买" />
      <!-- <span>2</span> -->
    </div>
  </div>
</template>

<script>
import { getGoodsInfo,cartAdd } from "../util/axios";
export default {
  data() {
    return {
      count: 1,
      goods: [],
    };
  },
  mounted() {
    getGoodsInfo(this.$route.query.id).then((res) => {
      if (res.code === 200) {
          console.log(res,'res');
        this.goods = res.list[0];
        this.goods.specsattr = this.goods.specsattr.split(",");
        console.log(this.goods);
      }
    });
  },
  methods: {
    addCount() {
      this.count++;
    },
    subtractCount(){
        if(this.count>0){
            this.count--;
        }
    },
    CartAdd(){
           const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          cartAdd({
            uid: userInfo.uid,
            goodsid : this.goods.id,
            num : this.count
          })
          .then((res) => {
              console.log(res,'res');
            if(res.code ===200){
              alert('添加成功');
              return this.$router.push('/cart?uid='+userInfo.uid)
            }
            // alert('添加失败，请重试！')
          }).catch((err) => {
            // return alert('添加失败！')
          });
          return;
    }
  },
  computed: {
    goodsPrice() {
      if (this.goods.price) return this.goods.price.toFixed(2);
      return "";
    },
  },
};
</script>

<style  lang="" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  background-color: #f1f1f1;
}
.banner a {
  background-color: yellowgreen;
}
.banner a img {
  width: 100%;
}
.content {
  color: black;
  height: 1.3rem;
  background-color: white;
}
.content .text {
  padding: 0.1rem;
}
.content .text p:nth-child(1) {
  /* height: 0.4rem; */
  overflow: hidden;
  font-size: 0.28rem;
  line-height: 0.5rem;
}
.content .text p:nth-child(2) {
  margin-top: 10px;
  font-size: 0.24rem;
  color: #e33c3e;
}
.content .text p:nth-child(2) span {
  color: #868686;
  font-size: 0.12rem;
  margin-left: 0.15rem;
}
.listDetail {
  margin-top: 0.2rem;
  font-size: 0.18rem;
  /* height: 4rem; */
  background-color: white;
  line-height: 1rem;
  color: black;
}
.listDetail div {
  height: 0.6rem;
  background-color: white;
  line-height: 0.6rem;
  color: #3b3b3b;
  padding: 0 0.15rem;
}
.listDetail div:nth-child(2) {
  border-bottom: 1px solid #868686;
  display: flex;
  justify-content: space-between;
}
.listDetail div:nth-child(2) p span {
  color: #b2291d;
  border: 1px solid #b2291d;
  padding: 0 0.1rem;
  margin: 0 0.05rem;
  border-radius: 0.06rem;
}
.listDetail div:nth-child(1) {
  border-bottom: 1px solid #868686;
  display: flex;
  justify-content: space-between;
}
.listDetail div:nth-child(1) > div {
  padding: 0;
  width: 1.2rem;
  height: 0.36rem;
  align-self: center;
  border: 1px solid #868686;
  border-radius: 0.06rem;
  overflow: hidden;
  display: flex;
}
.listDetail div:nth-child(1) > div input {
  text-align: center;
  border: none;
  font-size: 0.16rem;
}
.listDetail div:nth-child(1) > div input:nth-child(odd) {
  width: 0.4rem;
  height: 100%;
}
.listDetail div:nth-child(1) > div input:nth-child(2) {
  flex: 1;
  width: 0.2rem;
  padding: 0 0.1rem;
  border-left: 1px solid #868686;
  border-right: 1px solid #868686;
}
.listDetail div:nth-child(3) p {
  color: #b6b6b6;
  font-size: 0.18rem;
}
.listDetail div:nth-child(3) p span {
  display: inline-block;
  padding: 0 0.13rem;
  line-height: 0.4rem;
  margin: 0 0.05rem;
  background-color: #e1e1e3;
  color: white;
  border-radius: 0.08rem;
}
.listDetail div:nth-child(3) p span:nth-child(1) {
  margin-left: 0.6rem;
}
.listDetail div:nth-child(3) p span:hover {
  background-color: #e33c3e;
}
.ShopDetail {
  color: black;
  margin-bottom: 1rem;
  background-color: white;
}
.ShopDetail div:first-child {
  height: 0.8rem;
  margin-top: 0.2rem;
  padding: 0 0.15rem;
}
.ShopDetail div h3 {
  font-size: 0.22rem;
  line-height: 0.8rem;
  color: #3b3b3b;
}

.account {
  width: 100%;
  height: 1rem;
  margin: auto;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.account a {
  flex: 1;
  align-self: center;
  text-align: center;
}
.account a p {
  font-size: .3rem;
  color: #868686;
}
.account a i {
  font-size: .4rem;
}
.account input {
  width: 3rem;
  border: none;
  font-size: .24rem;
  color: white;
  text-align: center;
  height: 1rem;
}
.account input:nth-child(2) {
  background-color: #f26b10;
}
.account input:nth-child(3) {
  background-color: #e43d40;
}
</style>
