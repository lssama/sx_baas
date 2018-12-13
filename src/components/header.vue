<template>
  <div class="header-wrap">
    <div class="wrap">
      <div class="logo-wrap">
        <img src="../assets/imgs/logo.png" alt="logo">
      </div>
      <div class="header-right-wrap fr">
        <div class="header-nav-wrap">
          <Nav></Nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './nav'
export default {
  data () {
    return {}
  },
  components: {
    Nav
  }
}
</script>
<style lang="less">
.header-wrap{
  flex: 0 0 auto;
  background: #4599f8;
  color: #fff;
  .logo-wrap{
    height: 100px;
    display: inline-block;
    img{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .header-right-wrap{
    height: 100px;
    display: inline-block;
    .header-nav-wrap{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
