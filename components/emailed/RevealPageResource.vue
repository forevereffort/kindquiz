<template>
  <fragment>

    <section v-if="mobile && resources.length > 0">
      <v-row>
        <v-flex xs1></v-flex>
        <v-flex xs10 class="ml-1 mb-6 mt-8" style="font-size: 32px; font-weight: 500; color: #474747">
          {{ $t('reveal-resource.title', [profile.firstName]) }}
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
      <v-row justify-center>
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline">
            {{ $t('reveal-resource.desc', [profile.name]) }}
          </div>
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
    </section>
    <!-- DESKTOP CAUSES HEADER -->
    <section v-if="!mobile && resources.length > 0">
      <div class="headerIndent">
        <v-row>
          <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
            {{ $t('reveal-resource.title', [profile.firstName]) }}
          </v-flex>
          <v-flex xs2>
          </v-flex>
        </v-row>
        <v-row justify-center>
          <v-flex xs1></v-flex>
          <v-flex xs10>
            <div class="headline headerIndent-headline">
              {{ $t('reveal-resource.desc', [profile.name]) }}
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
      </div>
    </section>
    <div v-if="mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center">
      <div style="width: 70%;">
        <v-row cols="12" v-for="(resource, index) in resources" :key="index + 'resources'" class="mb-4">
          <div class="d-flex justify-center" style="width: 100%">
            <img :src="resource.photoUrl" style="max-width: 150px; max-height: 150px;" class="mb-2" />
          </div>
          <ClientOnly>
            <div class="headline resource-desc" :data-res-id="resource.id" style="text-align: left" v-html="resource.description"></div>
          </ClientOnly>
        </v-row>
      </div>
    </div>

    <div v-if="!mobile" style="width: 100%; text-align: center; margin: 50px 0px 0px 0px; display: flex; flex-direction: row; justify-content: center" ref="causes">
      <div style="width: 70%;">
        <v-row cols="12" v-for="(resource, index) in resources" :key="index + 'resources'" class="mb-10">
          <v-flex xs3 class="d-flex align-center">
            <img :src="resource.photoUrl" style="max-width: 200px; width: 100%" />
          </v-flex>
          <v-flex xs1>
          </v-flex>
          <v-flex xs7 class="d-flex align-center">
            <ClientOnly>
              <div class="headline resource-desc" :data-res-id="resource.id" style="text-align: left" v-html="resource.description"></div>
            </ClientOnly>
          </v-flex>
        </v-row>
      </div>
    </div>
    <div style="height: 4vh"></div>
  </fragment>
</template>

<script>

export default {
  name: 'RevealPageResource',
  components: {
  },
  methods: {
  },
  props: ['mobile', 'profile', 'revealData', 'revealPage', 'resources']
}
</script>

<style lang="scss" scoped>
</style>
