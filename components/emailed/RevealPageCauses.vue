<template>
  <ClientOnly>  
  <fragment>

    <!-- OVERVIEW -->
    <!-- <div style="width: 100vw">
      <v-row class="ml-1 mb-3 mt-8">
        <v-flex xs1>
        </v-flex>
        <v-flex  style="font-size: 32px; font-weight: 500; color: #474747">
          Causes you care about most
        </v-flex>
      </v-row>
    </div> -->
    <section v-if="mobile">
      <v-row>
        <v-flex xs1></v-flex>
        <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
          {{ $t('reveal-cause.title') }}
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
      <v-row justify-center>
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline" v-html="$t('reveal-cause.desc')">
          </div>
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
    </section>
    <!-- DESKTOP CAUSES HEADER -->
    <section v-if="!mobile">
      <div class="headerIndent">
        <v-row>
          <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
            {{ $t('reveal-cause.title') }}
          </v-flex>
          <v-flex xs2>
          </v-flex>
        </v-row>
        <v-row justify-center>
          <v-flex xs1></v-flex>
          <v-flex xs10>
            <div class="headline headerIndent-headline" v-html="$t('reveal-cause.desc')">
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
      </div>
    </section>

    <div v-if="mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center">
      <div style="width: 310px;">
        <v-row cols="12">
          <v-col xs="5" md="3" v-for="(cause, i) in profile.causes" :key="i + 'causes'">
            <div class="primary" style="border-radius: 50%; width: 140px; height: 140px; overflow: hidden">
              <img
                :src="require(`@/assets/images/${causeBase}${cause}.jpg`)"
                :alt="require('@/assets/images/causes/default.jpg')"
                style="height: 140px"
                @error="imgError"
              />
              <div style="display: flex; flex-direction: column; justify-content: center; height: 140px; margin-top: -150px; color: white; text-shadow: 2px 2px 4px dimgray; font-size: 20px">
                <div>{{ filterText(cause) }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-if="!mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center" ref="causes">
      <div style="width: 65%;">
        <v-row cols="12">
          <v-col xs="5" md="3" v-for="(cause, i) in profile.causes" :key="i + 'causes'">
            <div class="primary" style="border-radius: 50%; width: 150px; height: 150px; overflow: hidden">
              <img
                :src="require(`@/assets/images/${causeBase}${cause}.jpg`)"
                :alt="require('@/assets/images/causes/default.jpg')"
                style="height: 150px"
                @error="imgError"
              />
              <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; margin-top: -162px; color: white; text-shadow: 2px 2px 4px dimgray; font-size: 22px">
                <div>{{ filterText(cause) }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- ADD SOME WHITESPACE AT BOTTOM -->
    <div style="height: 4vh"></div>
  </fragment>
  </ClientOnly>
</template>

<script>

export default {
  name: 'RevealPageCauses',
  components: {
  },
  methods: {
    filterText(text) {
      const matchUp = {
        'Food Security & Sustainability': 'Food Security Sustainability'
      }
      if (matchUp[text]) {
        return matchUp[text]
      }
      return text
    },
    imgError(){
      this.src = require('@/assets/images/causes/default.jpg');
    } 
  },
  computed: {
    causeBase() {
      return `causes/${this.surveyType}/`;
    }
  },
  props: ['mobile', 'profile', 'surveyType']
}
</script>

<style lang="scss" scoped>
</style>
