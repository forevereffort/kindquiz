<template>
  <fragment>
    <div class="headerIndent">
      <v-row>
        <v-flex class="headerIdent-title ml-1 mb-10 mt-8">
          {{ $t('reveal-profile.your-x-profile', [surveyTypeData.title]) }}
        </v-flex>
      </v-row>
    </div>
    <v-row justify-center>
      <v-flex xs1>
      </v-flex>
      <v-flex xs10>
        <div style="position: relative; text-align: center; color: white; margin: 0px 0px 20px 0px">
          <img :src="this.revealPage.seoImage" class="profileImageSecondary" />
          <!-- <div class="secondaryImageType" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            {{ profile.name }}
          </div> -->
        </div>
      </v-flex>
      <v-flex xs1>
      </v-flex>
    </v-row>
    <div v-if="mobile">
      <v-row justify-center>
        <v-flex xs1>
        </v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline">
            <!-- {{ profile.name }} -->
            <span style="font-weight: bold">{{ profile.name }}:</span> {{ revealPage.captionOne }}
          </div>
        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-row>
    </div>
    <div v-if="!mobile" style="width: 100%; padding-left: 26%; padding-right: 25%">
      <v-row justify-center>
        <v-flex xs1>
        </v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline print-wrap page1">
            <!-- {{ profile.name }} -->
            <span style="font-weight: bold">{{ profile.name }}:</span> {{ revealPage.captionOne }}
          </div>
        </v-flex>
        <v-flex xs1>
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
  props: ['surveyTypeData', 'mobile', 'profile', 'revealData', 'revealPage']
}
</script>

<style lang="scss" scoped>
</style>
