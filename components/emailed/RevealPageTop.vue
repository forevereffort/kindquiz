<template>
  <fragment>
    <div style="z-index: 100; margin-top: 10vh; height: 100px; position: relative;">
      <v-row xs12>
        <v-flex xs12 class="mt-n10 ml-6">
          <div style="font-size: 36px; width: 100%; text-align: left; text-shadow: 2px 2px 4px dimgray; ">
            <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-Yellow.svg')" class="kindQuizYellow" :style="{ 'max-width': (cohortSetting.logoMaxWidth || 200) + 'px' }" />
          </div>
        </v-flex>
      </v-row>
    </div>
    <div style="z-index: 100; margin-top: 17vh; position: relative;">
      <v-row xs12>
        <v-flex xs12 class="mb-n4" style="color: white;">
          <div class="text-xs-center" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
            {{ $t('reveal-top.your-x-profile-is-', [surveyTypeData.title])}}
          </div>
        </v-flex>
      </v-row>
      <v-row xs12>
        <v-flex xs12 style="color: white;">
          <div class="text-xs-center mt-4" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
            {{ profile.name }}
          </div>
        </v-flex>
      </v-row>
    </div>
    <div style="z-index: 100; margin-top: 14vh; position: relative;">
      <v-row>
        <v-flex xs1></v-flex>
        <v-flex xs10 style="color: white;">
          <div class="text-xs-center mb-3 ml-2 mr-2" style="font-size: 18px; font-weight: 500; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
            {{ $t('reveal-top.check-out', [surveyTypeData.title])}}
          </div>
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
      <v-row>
        <v-flex xs12 style="color: white;">
          <div @click="scrollDown" class="text-xs-center scolldown-icon-cont">
            <ScrollDownIcon />
          </div>
        </v-flex>
      </v-row>
    </div>
    <div style="height: 4vh"></div>
  </fragment>
</template>

<script>
import ScrollDownIcon from './ScrollDownIcon'

export default {
  name: 'RevealPageTop',
  components: {
    ScrollDownIcon,
  },
  methods: {
    scrollDown() {
      const smoothscroll = require('smoothscroll-polyfill')
      smoothscroll.polyfill()
      var mainContainer = document.getElementById('mainContainer')
      mainContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
  },
  props: ['surveyTypeData', 'revealData', 'profile', 'cohortSetting']
}
</script>

<style lang="scss" scoped>
.scolldown-icon-cont {
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px dimgray;
}
</style>
