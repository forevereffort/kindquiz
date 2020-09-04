<template>
  <fragment>
    <div class="headerIndent">
      <v-row>
        <v-flex class="headerIdent-title ml-1 mb-3 mt-8">
          {{ $t('reveal-kindness.your-kindness-is') }}
        </v-flex>
      </v-row>
    </div>
    <!-- CAROUSEL -->
    <section v-if="mobile">
      <v-carousel :show-arrows="false" :hide-delimiter-background="true" light height="300px">
        <v-carousel-item v-for="(aspect, i) in kindnessWordsListFiltered" :key="i">
          <v-row style="margin-top: 50px" align="center" justify="center">
            <div style="display: flex; flex-direction: column; justify-content: center; ">
              <div style="display: flex; flex-direction: column; justify-content: center; height: 200px; width: 200px; border-radius: 50%;; overflow: hidden; background-color: #ffc71a">
                <transition name="fade" appear>
                  <img :src="aspect.image" style="height: 200px; object-fit: cover;" />
                </transition>
              </div>
              <div style="display: flex; flex-direction: column; justify-content: center; height: 200px; width: 200px; margin-top: -200px; text-shadow: 2px 2px 4px dimgray; color: white; text-align: center; font-weight: 500; font-size: 20px;">
                {{ aspect.title }}
              </div>
            </div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </section>
    <section v-if="!mobile">
      <v-row style="margin-left: 8.4%; margin-top: 30px; margin-right: 8.4%" class="fill-height" align="center" justify="center">
        <!-- <v-flex xs1></v-flex> -->
        <v-flex>
          <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
            <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;" v-for="(aspect, i) in kindnessWordsListFiltered" :key="i">
              <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; width: 150px; border-radius: 50%;; overflow: hidden; background-color: #ffc71a">
                <img :src="aspect.image" style="min-height: 150px; object-fit: cover;" />
              </div>
              <div style="display: flex; flex-direction: column; justify-content: center; height: 150px; width: 150px; margin-top: -150px; text-shadow: 2px 2px 4px dimgray; font-size: 20px; font-weight: 500;">
                {{ aspect.title }}
              </div>
              <!-- <div class="primary headline" style="text-align: center; line-height: 150px; border-radius: 50%; width: 150px; height: 150px;">{{ aspect.title }}</div> -->
            </div>
          </div>
        </v-flex>
      </v-row>
    </section>
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
  props: ['mobile', 'profile', 'revealData', 'revealPage', 'kindnessWordsListFiltered']
}
</script>

<style lang="scss" scoped>
</style>
