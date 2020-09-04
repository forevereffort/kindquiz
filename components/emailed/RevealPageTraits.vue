<template>
  <fragment>

    <div class="headerIndent">
      <v-row>
        <v-flex xs12 class="headerIdent-title ml-1 mb-6 mt-8">
          {{ $t('reveal-trait.title', [profile.name]) }}
        </v-flex>
      </v-row>
    </div>
    <div v-if="!mobile" style="width: 100vw; margin-top: 20px; padding: 0px 14% 0px 14%" ref="capture">
      <v-row>
        <v-flex xs12 md6 lg4 style-="padding: 24px;" v-for="(element, i) in profile.topTraits" :key="i">
          <div style="font-size: 20px; padding: 23px; width: 90%; border-radius: 16px; border: 1.5px solid #FFC719; margin-bottom: 24px">
            <div style="margin: 0px 0px 10px 0px; width: 100%; text-align: center; font-weight: bold; " class="headline">
              {{ element.title }}
            </div>
            {{ element.description }}
          </div>
        </v-flex>
      </v-row>
    </div>
    <div v-if="mobile" style="width: 100vw; border: display: flex; flex-direction: column; justify-content: flex-start;">
      <div v-for="(element, i) in profile.topTraits" :key="i" style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
        <div style="font-size: 22px; padding: 23px; width: 88%; border-radius: 16px; border: 1.5px solid #FFC719; margin-bottom: 24px">
          <div style="margin: 0px 0px 10px 0px; width: 100%; text-align: center; font-weight: bold; " class="headline">
            {{ element.title }}
          </div>
          {{ element.description }}
        </div>
      </div>
    </div>

    






    <!-- CoLab Kindness -->
    <div class="headerIndent" v-if="cohortSetting.showCoLab">
      <v-row>
        <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
          Kick-start your kindness
        </v-flex>
        <v-flex xs2>
        </v-flex>
      </v-row>
      <v-row justify-center class="mb-8">
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headerIndent-headline headline">
            The Kind CoLab is a global community designed to
            engage, educate, and empower individuals who seek to
            discover and activate their unique profiles through
            curated content, activities & events.
          </div>

          <div class="mt-5 headerIndent-headline headline text-center">
            <span style="font-weight: bold">Kindness thrives in community.</span>
          </div>

          <a href="https://www.kindcolab.ai/" class="mt-5 check-kindcolab-link text-right primary--text">
            <span class="mr-1 hidden-xs">Check out the</span>
            <div style="flex-direction: row; align-items: center; display: flex;">
              <img :src="require('@/assets/images/KindCoLab-TM-Yellow.svg')" />
              <v-icon color="primary">mdi-chevron-right</v-icon>
            </div>
          </a>
        </v-flex>
      </v-row>
    </div>





    <div style="height: 4vh"></div>
  </fragment>
</template>

<script>

export default {
  name: 'RevealPageCelebrity',
  components: {
  },
  methods: {
  },
  props: ['mobile', 'profile', 'revealData', 'revealPage', 'cohortSetting']
}
</script>

<style lang="scss" scoped>
</style>
