

<template>
  <fragment>
    <div style="height: 100vh; display: flex; align-items: center; position: relative;">
      <div style="z-index: 100; width: 100%; position: relative;">

        <div style="z-index: 100; margin-top: 17vh; position: relative;">
          <v-row xs12>
            <v-flex xs12 class="mb-n4" style="color: white;">
              <div class="text-xs-center" style="font-size: 36px; width: 100%; text-align: center; text-shadow: 2px 2px 4px dimgray; ">
                {{ $t('reveal-footer.your-x-profile-is-', [surveyTypeData.title]) }}
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



        <fragment  v-if="!cohortSetting.showCoLab">
          <v-row cols="12" class="mt-5">
            <v-col xs="12" style="color: white;">
              <div class="text-xs-center profileTitle" style="text-transform: uppercase;">
                {{ $t('reveal-footer.share-compare') }}
              </div>
            </v-col>
          </v-row>
          <v-row cols="12">
            <v-col xs="12" style="color: white; margin-left: 0px">
              <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
                <KQSocialSharing
                  :profile="profile"
                  :cohortSetting="cohortSetting"
                  :surveyType="surveyType"
                />
              </div>
            </v-col>
          </v-row>
        </fragment>


        <v-row cols="12" v-if="cohortSetting.showCoLab" class="mt-5">
          <v-col xs="12" md="6">
            <v-rows cols="12">
              <v-col xs="12" style="color: white;">
                <div class="text-center profileTitle colab" style=" ">
                  {{ $t('reveal-footer.share-compare') }}
                </div>
              </v-col>
              <v-col xs="12" style="color: white; margin-left: 0px">
                <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
                  <KQSocialSharing
                    :profile="profile"
                    :cohortSetting="cohortSetting"
                  />
                </div>
              </v-col>
            </v-rows>
          </v-col>

          <v-col xs="12" md="6">
            <v-rows cols="12">
              <v-col xs="12" style="color: white;">
                <div class="text-xs-center profileTitle colab">
                  Join the community
                </div>
              </v-col>
              <v-col xs="12" class="text-center">
                <a href="https://www.kindcolab.ai/" class="colab-join-community">
                  <strong>Kind CoLab</strong><sup>TM</sup>
                </a>
              </v-col>
            </v-rows>
          </v-col>
        </v-row>

        <!-- <v-row>
          <v-col>
            <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
              <div v-if="!generatingPDF" @click="downloadVisualReport" style="margin: -77px 0px 0px 150px;"><img :src="require('@/assets/images/pdf.svg')" style="height: 45px;" /> </div>
              <div v-if="generatingPDF" style="margin: -77px 0px 0px 150px; height: 45px; width: 45px; border-radius: 50%; background-color: #ffc71a;"> </div>
            </div>
          </v-col>
        </v-row> -->
      </div>
      <div style="color: white; position: absolute; bottom: 10px; width: 100%;">
        <div style="display: flex; flex-direction: row; justify-content: center; text-shadow: 2px 2px 4px dimgray">
          <div style="text-align: center; direction: ltr">
            {{ $t('quiz.copyright', [new Date().getYear() + 1900]) }} | &nbsp;
            <a target="_blank" style="margin: 0px 4px 0px 3px; color: white !important; text-decoration: none;" href="https://summery.ai/ethical-data-privacy"> {{ $t('quiz.privacy-policy') }}</a> | <a target="_blank" style="margin: 0px 4px 0px 3px; color: white; text-decoration: none;" href="https://summery.ai"><span ref="powered"><img :src="require('@/assets/images/poweredBy.svg')" style="height: 22px; margin-bottom: -7px;" /> </span></a>
          </div>
        </div>
      </div>
    </div>

  </fragment>
</template>

<script>
import KQSocialSharing from './KQSocialSharing'

export default {
  name: 'RevealPageBottom',
  components: {
    KQSocialSharing
  },
  methods: {
  },
  props: ['surveyTypeData', 'cohortSetting', 'profile', 'surveyType']
}
</script>

<style lang="scss" scoped>

.colab-join-community {
  display: inline-flex;
  text-align: center;

  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1.5px solid #ffc719;
  padding: 5px 20px;

  box-shadow: 0px 2px 4px;
  background: #FFFFFF7F;

  text-decoration: none;

  strong {
    font-size: 40px;
    letter-spacing: 2px;
    text-shadow: 0px 2px 4px dimgrey;
  }
  sup {
    font-size: 7px;
    line-height: 7px;
    text-shadow: 0px 2px 4px dimgrey;
    top: -2.5em;
  }
}

.check-kindcolab-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;

  font-size: 17px;
  img {
    height: 15px;
  }
  // flex-direction: column;

  // align-items: flex-end;
}
@media (min-width:320px) {
  .profileTitle.colab {
    font-size: 25px;
  }
}


@media (min-width:374px) {

  .check-kindcolab-link {
    flex-direction: row;
    align-items: center;


    font-size: 20px;
    img {
      height: 20px;
    }
  }
  .profileTitle.colab {
    font-size: 35px;
  }

}

@media (min-width:641px) {

  .profileTitle.colab {
    font-size: 50px;
  }


  .check-kindcolab-link {
    flex-direction: row;
    align-items: center;


    font-size: 24px;
    img {
      height: 22px;
    }
  }
}
</style>
