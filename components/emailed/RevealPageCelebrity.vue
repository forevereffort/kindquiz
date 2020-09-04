<template>
  <fragment>
    

    <!-- FAMOUS PERSONAE -->
    <div class="headerIndent">
      <v-row>
        <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
          {{ $t('reveal-celebrity.title', [profile.name]) }}
        </v-flex>
        <v-flex xs2>
        </v-flex>
      </v-row>
      <v-row justify-center class="mb-8">
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headerIndent-headline headline">

            <span style="font-weight: bold">{{ $t('reveal-celebrity.with-your-x', [profile.name]) }}</span>
            {{ $t('reveal-celebrity.stand-out') }}
          </div>
        </v-flex>
      </v-row>
    </div>
    <div style="height: 25px"></div>
    <section v-if="mobile">
      <span class="mt-8" v-for="(aspect, i) in revealPage.famousPeople" :key="i + 'famous'" v-if="aspect.image">
        <!-- <v-row>
          <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
            {{ aspect.title }}
          </v-flex>
        </v-row> -->
        <v-row justify-center>
          <v-flex xs12 class="pb-2 pt-2">
            <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
              <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                <div class="primary headline" style="text-align: center; line-height: 190px; border-radius: 50%; width: 190px; height: 190px; overflow: hidden;">
                  <img :src="aspect.image" style="height: 190px" />
                </div>
              </div>
            </div>
          </v-flex>
        </v-row>
        <v-row justify-center class=" headline pb-2 pt-2 ml-8 mr-10">
          <v-flex xs11>
            <div style="width: 100%; text-align: center; margin: 0px 20px 0px 10px">
              <span v-html="aspect.name"> {{ aspect.name }} </span> <span v-html="$options.filters.removebackSpash(aspect.description)"></span>
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
      </span>
    </section>
    <section v-if="!mobile">
      <div style="padding-left: 10%; padding-right: 10%" ref="famous">
        <span v-for="(aspect, i) in revealPage.famousPeople" :key="i + 'famousDesktop'" v-if="aspect.image">
          <!-- <v-row>
            <v-flex xs12 class="ml-1 mb-3 mt-8" style="font-size: 32px; font-weight: 500; color: black; text-align: center;">
              {{ aspect.title }}
            </v-flex>
          </v-row> -->
          <v-row justify-center v-if="(i + 1) % 2 !== 0">
            <v-flex xs4 class="pb-2 pt-2">
              <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                  <div class="primary headline" style="margin-right: -30px; line-height: 160px; border-radius: 50%; width: 160px; height: 160px; overflow: hidden;">
                    <img :src="aspect.image" style="height: 160px" />
                  </div>
                </div>
              </div>
            </v-flex>
            <v-flex xs7>
              <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; line-height: 30px; text-align: left; margin: 0px 0px 0px 0px; font-size: 22px;">
                <div>
                  <span v-html="aspect.name"></span> <span v-html="$options.filters.removebackSpash(aspect.description)"></span>
                </div>
              </div>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-row>
          <v-row justify-center v-if="(i + 1) % 2 === 0">
            <v-flex xs1></v-flex>
            <v-flex xs7>
              <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; line-height: 30px; text-align: left; margin: 0px 20px 0px 10px; font-size: 22px">
                <div>
                  <span v-html="aspect.name"> </span> <span v-html="aspect.description"></span>
                </div>
              </div>
            </v-flex>
            <v-flex xs4 class="pb-2 pt-2">
              <div style=" justify-content: center; flex-direction: row; display: flex; width: 100%">
                <div style="position: relative; text-align: center; color: white; margin-right: 3.3%;">
                  <div class="primary headline" style="margin-left: -15px; text-align: center; line-height: 160px; border-radius: 50%; width: 160px; height: 160px; overflow: hidden;">
                    <img :src="aspect.image" style="height: 160px" />
                  </div>
                </div>
              </div>
            </v-flex>
          </v-row>
        </span>
      </div>
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
  props: ['mobile', 'profile', 'revealData', 'revealPage']
}
</script>

<style lang="scss" scoped>
</style>
