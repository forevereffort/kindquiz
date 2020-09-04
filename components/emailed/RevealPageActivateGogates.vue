<template>
  <fragment>
    <section v-if="mobile">
      <v-row>
        <v-flex xs1></v-flex>
        <v-flex xs10 class="headerIdent-title ml-1 mb-6 mt-8">
          Activate your {{profile.name}} values
        </v-flex>
        <v-flex xs1></v-flex>
      </v-row>
      <v-row justify-center>
        <v-flex xs1></v-flex>
        <v-flex xs10>
          <div class="headline headerIndent-headline">
            <p>
              We invite you to join our GoGates community of kindness and to consider making a donation to help us accelerate impact and transform lives. Visit 
              <a href="https://www.gatesfoundation.org/philanthropypartners/donate" target="_blank">Gates Philanthropy Partners</a>
              to learn more.
            </p>
            <p class="text-center">
              <a href="https://www.gatesfoundation.org/philanthropypartners/donate" target="_blank" class="gpp-logo-link">
                <img src="https://summery-kq-images.s3.us-east-2.amazonaws.com/gogates/Logos+_+Icons/Copy+of+GPP_Logo_BW.png" />
              </a>
            </p>
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
            Activate your {{profile.name}} values
          </v-flex>
          <v-flex xs2>
          </v-flex>
        </v-row>
        <v-row justify-center>
          <v-flex xs1></v-flex>
          <v-flex xs10>
            <div class="headline headerIndent-headline">
              <p>
                We invite you to join our GoGates community of kindness and to consider making a donation to help us accelerate impact and transform lives. Visit 
                <a href="https://www.gatesfoundation.org/philanthropypartners/donate" target="_blank">Gates Philanthropy Partners</a>
                to learn more.
              </p>
              <p class="text-center">
                <a href="https://www.gatesfoundation.org/philanthropypartners/donate" target="_blank" class="gpp-logo-link">
                  <img src="https://summery-kq-images.s3.us-east-2.amazonaws.com/gogates/Logos+_+Icons/Copy+of+GPP_Logo_BW.png" />
                </a>
              </p>
            </div>
          </v-flex>
          <v-flex xs1></v-flex>
        </v-row>
      </div>
    </section>
    <div style="height: 4vh"></div>
  </fragment>
</template>

<script>

export default {
  name: 'RevealPageActivateGogates',
  components: {
  },
  methods: {
  },
  computed: {
  },
  props: ['mobile', 'profile', 'surveyType']
}
</script>

<style lang="scss" scoped>
.gpp-logo-link {
  img {
    max-height: 200px;
    max-width: 100%;
  }
}
</style>
