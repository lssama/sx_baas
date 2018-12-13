<template>
    <div class="page-wrap">
        <Header></Header>
        <div class="page-content-wrap wrap">{{chaininfo}}</div>

        <div class="footer-page-wrap">
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from "../header";
import Footer from "../footer";
export default {
  components: {
    Header,
    Footer
  },
  mounted(){
      // console.log(this.$route.query)
      this.getInfo(this.$route.query.ID)
  },
  methods: {
      ...mapActions(['getChaininfo']),

      getInfo(params) {
          this.getChaininfo(params)
      }
  },
  computed: {
    chaininfo: {
      get () {
        return this.$store.state.chain.chaininfo
      }
    },
  }
};
</script>

<style lang="less">
  @import '../../assets/css/page.less';
</style>