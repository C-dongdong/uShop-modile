<template>
  <div class="box">
    <div class="headerTop">
      <div class="left" @click="goBack">
        <img src="" alt="" />
      </div>
      <div class="title">
        
      </div>
    </div>
    <div class="ShopList">
      <ul class="list-bottom" v-if="goods">
        <li v-for="(list, idx) in goods" :key="idx">
          <div>
            <img
              :src="
                list.img
                  ? $imgUrl + list.img
                  : 'http://p4.music.126.net/LB6hcyND-KTqBlfYMkbEnw==/109951165480872644.jpg?param=140y140'
              "
            />
          </div>
          <div>
            <p>{{ list.goodsname }}</p>
            <p>¥{{ list.price.toFixed(2) }}</p>
            <p>原价 ¥{{ list.market_price.toFixed(2) }} 元</p>
            <input type="button" @click="toDeatai(list.id)" value="立即购买" />
          </div>
        </li>
      </ul>
      <div v-else class="vacancySpace">
          <h2>此分类暂无商品！</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateGoods } from "../util/axios";
export default {
  data() {
    return {
      goods: [],
    };
  },
  mounted() {
    //   console.log(this.$route.query.id);
    getCateGoods(this.$route.query.id).then((res) => {
        console.log(res);
      if (res.code === 200) {
            console.log(res.list);
        this.goods = res.list;
      }
     
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toDeatai(id){
      this.$router.push('/detail?id='+id)
    }
  },
  
};
</script>

<style lang="" scoped>
.ShopList {
  color: black;
}
.vacancySpace{
    margin: 2rem 0;
    text-align: center;
}
.ShopList .list-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ShopList .list-bottom li {
  /* width: 3.4rem; */
  width: 100%;
  height: 1.7rem;
  margin: 0.05rem 0;
  box-shadow: 0px 0px 14px -6px black;
  display: flex;
}
.ShopList .list-bottom li:last-child {
  margin-bottom: 0.6rem;
}
.ShopList .list-bottom li div:first-child {
  width: 2.2rem;
  text-align: center;
  line-height: 1.7rem;
}
.ShopList .list-bottom li div:first-child img {
  width: 1.7rem;
}
.ShopList .list-bottom li div:last-child {
  padding: 0.1rem 0;
}
.ShopList .list-bottom li div:last-child p:nth-child(1) {
  font-size: 0.2rem;
  line-height: 0.4rem;
  margin-top: 0.06rem;
}
.ShopList .list-bottom li div:last-child p:nth-child(2) {
  margin: 0.1rem 0;
  font-size: 0.16rem;
  color: #e33c48;
}
.ShopList .list-bottom li div:last-child p:nth-child(3) {
  margin: 0 0 0.1rem;
  font-size: 0.12rem;
  color: #9c9c9c;
}
.ShopList .list-bottom li div:last-child input {
  width: 1rem;
  height: 0.32rem;
  color: white;
  background-color: #f26b10;
  border: none;
  font-size: 0.18rem;
}

</style>
