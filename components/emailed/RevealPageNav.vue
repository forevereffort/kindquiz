<template>
  <fragment>
    <v-app-bar app sticky class="primary reveal-app-bar" style="height: 100px; width: 100vw; padding: 0px;">
      <div v-if="mobile" 
        style="
          display: flex; 
          flex-direction: row; 
          justify-content: center; 
          width: 100%;
          height: 100px;
          margin: 43px 0px 0px 0px;"
      >
        <div style="height: 100px; display: flex; flex-direction: column; justify-content: center;">
          <div>
            <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" :style="{ height: logoHeight }" />
          </div>
        </div>
      </div>
      <div v-else style="
        display: flex; 
        flex-direction: row; 
        justify-content: space-between; 
        width: 100%;
        margin: 42px 0px 0px 0px;
        padding: 0px 70px 0px 60px;              
        ">
        <div style="height: 100px; display: flex; flex-direction: column; justify-content: center;">
          <div>
            <img :src="revealData.cohort.logo ? revealData.cohort.logo : require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite" :style="{ height: logoHeight }"  />
          </div>
        </div>
        <div style="height: 100px; width: 50%; display: flex; flex-direction: column; justify-content: center;">
          <div style="text-align: right; color: white; font-weight: 600;  font-size: 18px; -webkit-font-smoothing: antialiased;">
            {{ $t('reveal-nav.desc', [profile.firstName, profile.name, wordsForAppBar])}}</div>
        </div>
        <!-- 
        <div style="height: 12vh;  max-height: 100px; margin: 4vh 0px 0px 20px; display: flex; flex-direction: column; justify-content: center;">
            <div style="    display: inline-block;
    vertical-align: middle;">
              <img  :src="require('@/assets/images/TheKindQuiz-White.svg')" class="kindQuizWhite"  :style="{ height: logoHeight }" />
            </div>
            </div>
            <div style="height: 12vh; margin-top: 3.3vh; display: flex; flex-direction: column; justify-content: center;  width: 40%;">
            <div style="text-align: right; color: white; font-weight: 600; font-size: 18px; -webkit-font-smoothing: antialiased;">   {{ profile.firstName }} is {{ profile.name }} with a kindness that is {{ wordsForAppBar }}</div>
          </div> 
          -->
      </div>
    </v-app-bar>
    <div style="height: 40px; "></div>
  </fragment>
</template>

<script>

export default {
  name: 'RevealPageNav',
  components: {
  },
  methods: {
  },
  computed: {
    logoHeight() {
      if (this.revealData.cohort.cohortLabel === 'marine-conservation'
        || this.revealData.cohort.cohortLabel === 'whoi') {
        return '70px'
      } else {
        return '30px'
      }
    },
    wordsForAppBar() {
      var delimiter = ', ';
      var list = this.kindnessWordsListFiltered.map(a => a.title).join(delimiter)
      var index = list.lastIndexOf(delimiter);
      return list.substring(0, index) + ' & ' + list.substring(index + delimiter.length) + '.'
    },
  },
  props: ['mobile', 'profile', 'revealData', 'kindnessWordsListFiltered']
}
</script>

<style lang="scss" scoped>

.reveal-app-bar {
  position: -webkit-skicky;
  position: sticky !important;
}
</style>
