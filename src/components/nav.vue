<template>
  <ul class="nav-wrap">
    <li :class="{'current': index == 1}" @click="setIndex(1)">
      <router-link :to="{path: '/chainlist'}">
        {{$t('navs.overview')}}
      </router-link>
    </li>
    <li :class="{'current': index == 2}" @click="setIndex(2)">
      <router-link :to="{path: '/contract'}">
        {{$t('navs.contract')}}
      </router-link>
    </li>
    <li :class="{'current': index == 3}" @click="setIndex(3)">
      <router-link :to="{path: '/deploy'}">
        {{$t('navs.deploy')}}
      </router-link>
    </li>
    <li :class="{'current': index == 4}" @click="setIndex(4)">
      <router-link :to="{path: '/monitoring'}">
        {{$t('navs.monitoring')}}
      </router-link>
    </li>
    <li :class="{'current': index == 5}" @click="setIndex(5)">
      <router-link :to="{path: '/manage'}">
        {{$t('navs.manage')}}
      </router-link>
    </li>
    <li :class="{'current': index == 6}" @click="setIndex(6)">
      <router-link :to="{path: '/alarm'}">
        {{$t('navs.alarm')}}
      </router-link>
    </li>
    <li :class="{'current': index == 7}" @click="setIndex(7)">
      <router-link :to="{path: '/logs'}">
        {{$t('navs.log')}}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      index: 1,
      menuVisible: false
    }
  },
  mounted () {
    this.index = sessionStorage.getItem('INDEX') ? sessionStorage.getItem('INDEX') : 1
  },
  methods: {
    setIndex (index) {
      sessionStorage.setItem('INDEX', index)
    },
    clickMenu () {
      if (this.menuVisible === true) {
        setTimeout(() => {
          this.menuVisible = !this.menuVisible
        }, 100)
      } else {
        this.menuVisible = !this.menuVisible
      }
    }
  }
}
</script>

<style lang="less">
.nav-wrap {
  line-height: 60px;
  li{
    display: inline-block;
    margin-right: 30px;
    font-size: 16px;
    a{
      display: inline-block;
      width: 100%;
      color: #DBEEF7;
    }
    &:hover{
      font-weight: bold;
      a{
        color: #fff;
      }
    }
  }
  .current{
    font-weight: bold;
    a{
      color: #fff;
    }
  }
}
</style>
