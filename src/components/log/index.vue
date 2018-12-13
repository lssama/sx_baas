<template>
    <div class="page-wrap">
      <Header></Header>
      <div class="page-content-wrap wrap">
        <div class=" wrap">
          <div class="page-title-wrap">
            <div class="page-title">日志</div>
          </div>
        </div>
        <div class="page-content">
          正 在 开 发。。。
        </div>
      </div>
      <div class="footer-page-wrap">
        <Footer></Footer>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import Header from '../header'
import Footer from '../footer'
export default {
  data () {
    return {
      pageSize: 10
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    this.getList(1)
  },
  computed: {
    blocksList: {
      get () {
        return this.$store.state.block.blocksList
      }
    },
    page: {
      get () {
        return this.$store.state.block.page
      }
    },
    total: {
      get () {
        return this.$store.state.block.total
      }
    }
  },
  methods: {
    ...mapActions(['getBlocksList']),

    handleSizeChange (val) {
      this.getList(val)
    },
    handleCurrentChange (val) {
      this.getList(val)
    },
    getList (page) {
      this.getBlocksList(page)
    }
  },
  filters: {
    TimestampVallue (value) {
      return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="less">
  @import '../../assets/css/page.less';
</style>
