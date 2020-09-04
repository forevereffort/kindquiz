<template>
  <fragment>
    <section v-if="mobile">
      <div class="headerIndent">
        <v-row>
          <v-flex class="headerIdent-title ml-1 mb-3 mt-8">
            {{ $t('reveal-overview.overview') }}
          </v-flex>
        </v-row>
      </div>
      <v-row justify-center>
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline">
            <!-- {{ profile.name }} -->
            <span style="font-weight: bold">{{ $t('reveal-overview.your-x-profile', [surveyTypeData.title]) }}</span>
            {{ $t('reveal-overview.desc') }}
          </div>
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
      <span v-for="(aspect, i) in revealPage.overview" :key="i">
        <v-row>
          <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
            {{ aspect.title }}
          </v-flex>
        </v-row>
        <v-row justify-center>
          <v-flex xs1></v-flex>
          <v-flex xs10>
            <div class="headline headerIndent-headline">
              {{ aspect.description }}
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
      </span>
    </section>
    <section v-if="!mobile">
      <div class="headerIndent">
        <v-row>
          <v-flex class="headerIdent-title mb-3 mt-8">
            Overview
          </v-flex>
        </v-row>
        <div style="height: 20px;"></div>
        <v-row justify-center>
          <v-flex xs1></v-flex>
          <v-flex xs10>
            <div class="headline headerIndent-headline">
            <span style="font-weight: bold">{{ $t('reveal-overview.your-x-profile', [surveyTypeData.title]) }}</span>
            {{ $t('reveal-overview.desc') }}
            </div>
          </v-flex>
        </v-row>
      </div>
      <div style="height: 40px;"></div>
      <div style="width: 100%; padding-left: 14%; padding-right: 14%;">
        <v-row cols="12">
          <v-col v-for="(aspect, i) in revealPage.overview" :key="i" xs="4" md="4" class="mb-3 mt-8 headline" style=" color: black; text-align: center; font-weight: bold">
            {{ aspect.title }}
            <div style="margin: 10px 0 0 0; position: relative; text-align: left; color: black; font-weight: 400; font-size: 22px; text-align: center">
              {{ aspect.description }}
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <div style="height: 4vh"></div>
  </fragment>
</template>

<script>

export default {
  name: 'RevealPageOverview',
  components: {
  },
  methods: {
  },
  props: ['surveyTypeData', 'mobile', 'profile', 'revealData', 'revealPage']
}
</script>

<style lang="scss" scoped>
</style>
