<template>
  <div>
  <ClientOnly>
    <div class="desktop-ncs" v-show="$vuetify.breakpoint.mdAndUp">
      <NcsHeader mobile="mobile" :pageData="pageData"  />
      <div class="content-container">
        <div class="col1">
          <NcsTextBox mobile="mobile" :pageData="pageData"  />
          <NcsValueMatrix mobile="mobile" :pageData="pageData" :series="series" />
        </div>
        <div class="col2">
          <NcsInfoBox mobile="mobile" :pageData="pageData"  />
          <NcsDimension mobile="mobile" :pageData="pageData"  :centerValue="centerValue" />
        </div>
      </div>
      <NcsFooter mobile='mobile' :pageData="pageData"  />
    </div>

    <div class="mobile-ncs" v-show="!$vuetify.breakpoint.mdAndUp">
      <NcsHeader mobile="mobile" :pageData="pageData" />
      <NcsInfoBox mobile="mobile" :pageData="pageData"  />
      <NcsTextBox mobile="mobile" :pageData="pageData"  />
      <NcsValueMatrix mobile="mobile" :pageData="pageData" :series="series" />
      <NcsDimension mobile="mobile" :pageData="pageData" :centerValue="centerValue" />
      <NcsFooter mobile='mobile' :pageData="pageData"  />
    </div>
  </ClientOnly>
  </div>
</template>
<script>

import _ from 'lodash'
import Loader from './Loader'

import NcsHeader from './ncs/NcsHeader';
import NcsValueMatrix from './ncs/NcsValueMatrix';
import NcsDimension from './ncs/NcsDimension';
import NcsInfoBox from './ncs/NcsInfoBox';
import NcsTextBox from './ncs/NcsTextBox';
import NcsFooter from './ncs/NcsFooter';

export default {
  components: {
    Loader,
    NcsHeader,
    NcsValueMatrix,
    NcsDimension,
    NcsInfoBox,
    NcsTextBox,
    NcsFooter
  },
  props: {
    pageData: Object
  },
  beforeMount() {
  },
  created() {
  },
  mounted () {
    if (process.browser) {
      this.mobile = window.innerWidth < 900 ? true : false
      const self = this
      addEventListener('resize', () => {
        self.mobile = window.innerWidth < 900 ? true : false
      })
      this.loadData()
    } else {
    } 
  },
  methods: {
    loadData() {
      this.loading = false
    }
  },
  computed: {
    dimStatic () {
      return this.pageData.revealData.cohort.dimStatic
    },
    dimCals () {
      const dimCals = this.pageData.revealData.cohort.dimCals
      if (dimCals.count > 0) {
        return this.pageData.revealData.cohort.dimCals.sums.map((v) => (v / dimCals.count).toFixed(1))
      } else {
        return [0,0,0,0,0]
      }
    },
    indiDim () {
      return [
        this.pageData.profile.agility,
        this.pageData.profile.disruption,
        this.pageData.profile.empathy,
        this.pageData.profile.innovation,
        this.pageData.profile.integrity,
      ]
    },
    series () {
      return [{
        name: 'Organization',
        data: this.dimStatic
      }, {
        // name: this.pageData.revealData.cohort.name,
        name: 'Cohort',
        data: this.dimCals
      }, {
        name: 'Individual',
        data: this.indiDim
      }]
    },
    centerValue () {
      // 7 is first bar, 4.2 is second bar

      // 7 vs. 4.2 = 2.8 difference: 2.8^2 = 7.84
      // 4.4 vs. 3.6 = 0.8 ^ 2 = 0.64
      // 2.6 vs. 5.8 = 3.2 ^2 = 10.24
      // 3.2 vs. 4.4 = 1.2 ^ 2 = 1.44
      // 5.0 vs. 5.4 = 0.4 ^2 = 0.16
      // SUM TOTAL = 20.22 

      // sqrt 20.22 = 4.5 
      // 4.5 / 13.4 (sqrt 180) * 100 = 33.5% of the possible difference, so 
      // 100 - 33.5 = 66.5
      // 66.5% * (40%) = 26
      // 26 + 60(base percent) = 86 alignment....

      let sum = 0
      this.dimStatic.forEach((v, index) => {
        sum += (v - this.dimCals[index]) * (v - this.dimCals[index])
      })
      const percent = Math.sqrt(sum) / Math.sqrt(180) * 100
      const val = (100 - percent) * (4 / 10) + 60
      return val.toFixed(0)
    }
  },
  data() {
    return {
      mobile: true
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  width:100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d2dfe6;
  color: white;

  align-items: center;
}

.desktop-ncs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0px 80px;

  .content-container {
    display: flex;

    .col1 {
      flex: 1;
      margin-right: 33px;

      .text-box {
        margin-left: 80px;
        margin-right: 100px;
      }
      .value-matrix {      
        margin: 10px;
        padding: 70px;
      }
    }
    .col2 {
      width: 400px;

      .dimension-box {
        margin-top: 30px;
      }
    }
  }
  .ncs-footer {
    margin-top: 35px;
    margin-bottom: 20px;
  }
}

.mobile-ncs {
  .info-box {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 40px;
  }

  .text-box {
    margin-left: 45px;
    margin-right: 45px;
    margin-bottom: 40px;
  }

  .value-matrix { 
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 40px;

    padding: 20px 13px 25px 13px;
  }

  .dimension-box {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 60px;

    padding: 20px 13px 25px 13px;
  }
  
  .ncs-footer {
    margin-top: 60px;
    margin-bottom: 50px;
  }
}

</style>

<style lang="scss">
.desktop-ncs,
.mobile-ncs {
  background-color: #FFFFFF;

  .title {
    color: #000000;
    font-size: 18 !important;
    line-height: 20px;
  }
  .body-2 {
    font-size: 14px !important;
  }
}

@media (min-width: 800px) {
  .desktop-ncs,
  .mobile-ncs {
    background-color: #FFFFFF;

    .title {
      color: #000000;
      font-size: 36px !important;
      line-height: 40px;
    }
    .body-2 {
      font-size: 16px !important;
    }
  }
}
</style>