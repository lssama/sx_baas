<template>
    <div class="page-wrap">
      <Header></Header>
      <div class="page-content-wrap wrap">
        <div class=" wrap">
          <div class="page-title-wrap">
            <div class="page-title">{{$t('navs.block')}}</div>
            <div class="page-nav-wrap fr">
              <ul class="link-wrap">
                <li><router-link :to="{path: '/chainlist'}">
                    {{$t('navs.chain')}}
                  </router-link></li>
                <li><i class="el-icon-arrow-right"></i></li>
                <li>
                    {{$t('navs.block')}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="table-wrap">
            <div class="table-height">
              <el-table
                :data="blocksList"
                :empty-text="$t('message.noData')"
                style="width: 100%">
                <el-table-column
                  prop="height"
                  :label="$t('listHeader.bHeight')"
                  width="140">
                  <template slot-scope="scope">
                    <!-- <router-link :to="{path: '/block/info', query: { height: scope.row.height }}"> -->
                      <span @click="toBlocksInfo(scope)" class="table-link-color">{{scope.row.height}}</span>
                    <!-- </router-link> -->
                  </template>
                </el-table-column>
                <el-table-column
                  prop="block_body.timestamp"
                  :label="$t('listHeader.bTime')"
                  width="180">
                  <template slot-scope="scope">
                    <span>{{scope.row.block_body.timestamp | TimestampVallue}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="id"
                  :label="$t('listHeader.bHash')">
                  <template slot-scope="scope">
                    <span >{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('listHeader.action')"
                  width="100">
                  <template slot-scope="scope">
                    <!-- <router-link :to="{path: '/block/info', query: { height: scope.row.height }}"> -->
                      <span class="table-link-color" @click="toBlocksInfo(scope)">{{$t("button.detail")}}</span>
                    <!-- </router-link> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              class="el-pagination-wrap fr"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
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
      pageSize: 10,
      pageIndex:1
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    this.getList()
    // console.log(this.$route.query.chainID)
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

    toBlocksInfo(data){
      // console.log(data)
      let height = data.row.height
      // console.log(height)
      this.$router.push({path:'/block/info',query:{chainID:this.$route.query.chainID,height:height}})
    },

    // handleSizeChange (val) {
    //   // this.getList(val)
    //   console.log(val)
    // },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getList()
    },
    getList () {
      let data = {
        chainID:this.$route.query.chainID,
        pageIndex:this.pageIndex,
        pageSize:10,
        publicKey:sessionStorage.getItem('publicKey'),
        signature:'fsfs'
      }
      this.getBlocksList(data)
      // console.log(val)
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
