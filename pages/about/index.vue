<template>
  <div>
    <div class="header">
      <div class="info">
        <p>
          聚为财，众为本
        </p>
        <p>互利共赢</p>
      </div>
    </div>
    <div class="white-bg">
      <h3 class="title">公司简介</h3>
      <div class="content">
        津晶科技信息服务（广州）有限责任公司，是由一批曾任职知名银行、消费金融、大型连锁零售商公司，及家电制造业公司等行业资深人士，联合创立的互联网公司，并于2017年12月注册成立
      </div>
    </div>
    <h3 class="title">平台简介</h3>
    <div>
      <div class="content" style="display: flex">
        <div style="padding: 50px 100px;padding-left: 150px">
          集众电采，是国内首家实现四流（“物资、商业、信息、资金”）互通的家电互联网供应链平台，我们践行“四维一体、互联互通”的商业理念，致力为家电行业的中小企业提供全方位服务。
        </div>
        <img src="@/assets/img/about/about-02.png" style="padding-right: 150px;" alt="">
      </div>
    </div>
    <div class="white-bg">
      <h3 class="title">战略伙伴</h3>
      <div class="content">
        <div class="partner">
          <p>
            <img src="@/assets/img/about/p001.png" alt="">
            <img src="@/assets/img/about/p002.png" alt="">
            <img src="@/assets/img/about/p003.png" alt="">
            <img src="@/assets/img/about/p004.png" alt="">
            <img src="@/assets/img/about/p005.png" alt="">
            <img src="@/assets/img/about/p006.png" alt="">
          </p>
          <p>
            <img src="@/assets/img/about/p007.png" alt="">
            <img src="@/assets/img/about/p008.png" alt="">
            <img src="@/assets/img/about/p009.png" alt="">
            <img src="@/assets/img/about/p010.png" alt="">
            <img src="@/assets/img/about/p011.png" alt="">
          </p>
          <img src="@/assets/img/about/p012.png" alt="">
          <img src="@/assets/img/about/p013.png" alt="">
          <img src="@/assets/img/about/p014.png" alt="">
        </div>
      </div>
    </div>
    <h3 class="title white-bg">联系我们</h3>
    <div class="content" style="display: flex;padding-top: 30px;">
      <ul>
        <li>
          商务合作&咨询（工作日09:00~18:00）
        </li>
        <li>
          <img src="@/assets/img/about/qq.png" alt="">
          3510294139
        </li>
        <li>
          <img src="@/assets/img/about/phone.png" alt="">
          18024595469
        </li>
        <li>
          <img src="@/assets/img/about/email.png" alt="">
          zhaoshang@jizhongdiancai.com
        </li>
        <li>
          <img src="@/assets/img/about/address.png" alt="">
          广东省广州市海珠区昌岗中路166号佳都商贸中心505-506
        </li>
      </ul>
      <div class="baidu-map" id="allmap">
        百度地图
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  methods: {
  },
  created () {
  },
  mounted () {
    /* eslint-disable */
    let map = new BMap.Map("allmap")
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    let myGeo = new BMap.Geocoder()
    myGeo.getPoint("昌岗中路166号佳都商务中心5楼505-506号", function(point){
      if (point) {
        map.centerAndZoom(point, 16);
        // map.addOverlay(new BMap.Marker(point));
        let marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      }
    }, "广州市")
    map.enableScrollWheelZoom(true);

  }
}

</script>
<style lang="stylus" scoped>
  //eslint-disable
  .header
    height 700px
    font-size 72px
    color #ffffff
    font-weight bold
    background url("~assets/img/about/about-01.png") no-repeat center
    .info
      padding-left 400px
      padding-top 270px
  .title
    text-align center
    color #333333
    font-size 36px
    font-weight bold
    padding-top 10px
    padding-bottom 40px
  .white-bg
    background #FFFFFF
  .content
    width 1300px
    padding-bottom 100px
    margin auto
    color #737373
    font-size 18px
    line-height 1.5
    ul
      padding-right 290px
      li
        padding-bottom 27px
        img
          vertical-align middle
    .baidu-map
      width 500px
      height 230px
  .partner
    padding 35px
    border 1px solid #DBDBDB
    p
      display flex
      justify-content space-between
      padding-bottom 30px
      img
        margin-right 0
    img
      margin-right 70px
</style>
