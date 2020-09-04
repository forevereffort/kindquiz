<template>
  <fragment>
    <client-only>
      <Loader v-if="(!pages.length && !showRevealPage) || savingProfile" />
    </client-only>


    <v-app-bar class="topBar" app align-center style="z-index: 2000" v-if="pages.length && active + 1 !== pages.length">
      <div style="
        display: flex; 
        flex-direction: row; 
        justify-content: center;
        width: 100%;
      ">
        <div style="margin-right: 0px">
          <img v-if="pages.length" :src="cohort.logoDark ? cohort.logoDark : require('@/assets/images/TheKindQuiz-Yellow.svg')" style="height: 30px;" />
        </div>
      </div>
    </v-app-bar>

    <!-- PAGE BACKGROUND IMAGE -->
    <!-- <transition name="fade" appear> -->
    <img :key="active + 'img'" v-if="pages.length && showImage && active !== pages.length - 1" :id="`slide${active+1}`" :src="images[active].src" class="pageImage" :alt="images[active].alt" />
    <!-- </transition>  -->
    <!-- PAGE BACKGROUND IMAGE -->



    <!-- THE KIND QUIZ LOGO ON DESKTOP ONLY -->
    <img v-if="pages.length && !mobile && !showRevealPage" :src="cohort.logo ? cohort.logo : require('@/assets/images/TheKindQuiz-Yellow.svg')" style="max-height: 100px; position: fixed; top: 15px; left: 20px;" :style="{ 'max-width': (cohortSettings.logoMaxWidth || 200) + 'px' }">
    <!-- GLIDE CONTAINER SYSTEM  -->

    <vue-glide
      v-model="active"
      class="vueGlide"
      v-if="pages.length && active + 1 !== pages.length"
      :gap="0"
      :animationDuration="450"
      :perView="cohortSettings.rtl ? 1 : 2"
      :bound="true"
      :perTouch="1"
      @glide:run-after="checkState()"
      :dragDistance="false"
      :rewind="false"
      :peek="0"
      :direction="cohortSettings.rtl ? 'rtl' : 'ltr'"
    >
      <vue-glide-slide
        v-for="(page, i) in pages"
        :key="i"
        style="width: 90vw;"
      >
        <div
          class="cardHolderGeneral cardHolder"
          v-if="active + 1 > i"
          :id="'cardHolder' + i"
          :ref="'cardHolder' + i"
          :style="{ marginLeft: active - 1 === i ? marginLeft : '' }"
        >
          <div class="center-all">
            <div class="center-all welcome-container" v-if="page.title==='welcome'">
              <v-card
                style="border-radius: 20px; background: rgba(255, 255, 255, 1);" 
                :class="'no-scoot'"
                class="welcome-card"
              >
                <v-card-title
                  style="word-break: normal;"
                  class="title font-weight-regular"
                  primary-title
                  :id="'cardTitle' + i"
                  :ref="'cardTitle' + i"
                >
                  <div class="itemText" v-html="page.text">
                  </div>
                </v-card-title>
              </v-card>
            </div>

            <div
              :key="j + 'card'"
              v-for="(item, j) in page.items"
              class="center-all"
            >

              <v-card
                style="border-radius: 20px; background: rgba(255, 255, 255, 1);" 
                :class="j === 0 ? 'no-scoot' : 'scoot'"
              >
                <v-card-title
                  style="word-break: normal;"
                  class="title font-weight-regular"
                  :style="{ backgroundColor: item.primaryColor}"
                  primary-title
                  :id="'cardTitle' + i"
                  :ref="'cardTitle' + i"
                >
                  <span class="itemText">{{ item.text }}</span>
                  <span style="display: none">{{revealPageId}}</span>
                </v-card-title>


                <div
                  v-for="(response, k) in item.responses"
                  :key="k"
                >
                  <v-divider></v-divider>


                  <!-- TEXT FIELD RESPONSE TYPE -->
                  <v-layout
                    align-center
                    v-if="item.type === 'Textfield'"
                    :class="getResponseClass(k, j, item, page)"
                    class="pt-2"
                    style="width: 100%"
                  >
                    <v-flex xs11 :class="{
                      'pt-4': true,
                      'pr-7': cohortSettings.rtl,
                      'pl-7': !cohortSettings.rtl,
                    }" style="word-break: normal;">
                      <v-text-field
                        v-if="response.text.includes('name')"
                        v-model="response.responseText"
                        clearable
                        :label="response.text"
                      >
                      </v-text-field>
                      
                      <v-text-field
                        v-if="!response.text.includes('name')"
                        type="email"
                        v-model="response.responseText"
                        clearable
                        :label="response.text"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-row style="color: #8e8e8e; font-size: 13px; margin-top: -30px; width: 100%; height: 70px;padding-left: 38px;padding-right: 33px;" v-if="item.type === 'Textfield' && response.text.includes('mail')">
                    Your email enables us to send you information about your {{surveyTypeData.title}} profile
                  </v-row>



                  <!-- MULTIPLE CHOICE SINGLE -->
                  <v-layout
                    align-center
                    v-if="item.type === 'MultiOptionSelectOne' || item.type === 'Dichotomous'"
                    @click="selectResponse(item, response)"
                    :class="getResponseClass(k, j, item, page)"
                    class="pt-2"
                    :style="{ background: response.clicked ? '#efefef' : 'rgb(255,255,255, 1)'}"
                    style="width: 100%"
                  >
                    <v-flex
                      v-if="item.responses.length < 26"
                      xs4
                      class="display-2 font-weight-medium"
                      :class="{
                        'pt-4': true,
                        'pr-7': cohortSettings.rtl,
                        'pl-7': !cohortSettings.rtl,
                      }"
                      style="word-break: normal;"
                    >
                      <span>{{ (k + 10).toString(36).toUpperCase()}}</span>
                    </v-flex>

                    <v-flex
                      v-if="item.responses.length < 26"
                      xs6
                      align-center
                      style="margin: 5px 0px 0px 0px; word-break: normal;"
                    >
                      <span class="responseText" style="font-weight: 500; display: block;">{{ response.text }} </span>
                    </v-flex>

                    <v-flex
                      v-if="item.responses.length >= 26"
                      xs12
                      align-center
                      style="margin: 5px 0px 0px 0px; word-break: normal;"
                      class="px-4"
                    >
                      <span class="responseText" style="font-weight: 500; display: block;">{{ response.text }} </span>
                    </v-flex>
                  </v-layout>



                  <!-- MultiOptionSelectMany -->
                  <v-layout
                    align-center
                    v-if="item.type === 'MultiOptionSelectMany'"
                    @click="selectMultiResponseSelectMany(item, response)" 
                    :class="getResponseClass(k, j, item, page)"
                    class="pt-2"
                    :style="{ background: response.clicked ? '#efefef' : 'rgb(255,255,255, 1)'}" style="width: 100%"
                  >
                    <v-flex xs12 align-center class="px-4 font-weight-medium" style="margin: 5px 0px 0px 0px; word-break: normal;">  <span class="responseText">{{ response.text }} </span>
                    </v-flex>
                  </v-layout>
                </div>
              </v-card>

              <!-- IN BETWEEN MULTIPLE CARDS ON PAGE GOES HERE -->
              <!-- <div style="height: 99px;"  v-if="item.type==='Textfield'">
                  <div class="materialShadow emailMessage">
                  </div>
              </div> -->
            </div>


            <div style="height: 50px; z-index: -10">
              <transition name="fade">
                <div class="materialShadow selectResponse" v-if="snackbar && active === i">{{ alertMessage ? alertMessage : pages[active].items.length > 1 ? 'Please respond to all items.' : 'Please select a response to continue.'}}
                </div>
              </transition>
            </div>
            <div v-if="!screenThresholdNine || isSelectManyOrTextFieldOnPage || (active == 0 && hasWelcomePage)" style=" padding: 4px; margin-top: 20px; display: flex; flex-direction: row; justify-content: center" :ref="`myNavButtons${active}`" :id="`myNavButtons${active}`">
              <v-btn
                :disabled="loading"
                v-if="active > basePageNum && !screenThresholdNine"
                x-large
                style="width: 140px; margin-right: 20px;"
                @click="back"
              >{{ $t('quiz.back') }}</v-btn>
              <v-btn
                v-if="active >= basePageNum"
                :loading="loading"
                x-large
                style="width: 140px;"
                @click="next"
              >{{ $t('quiz.next') }}</v-btn>

              <v-btn
                v-if="active == 0 && hasWelcomePage"
                x-large
                style="width: 140px;"
                @click="next"
              >{{ $t('quiz.start') }}</v-btn>
            </div>
          </div>
        </div>
      </vue-glide-slide>
    </vue-glide>

    <div v-if="pages.length" style="z-index: 100; width: 40px; height: 100px;"></div>
    <!-- <v-snackbar
      :timeout="1500"
      v-model="snackbar"
      :multi-line="true"
      align-center
      style="visbility: hidden"
    >
      Please respond to all item(s).
      <v-btn
        color="#ffc71a"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar> -->



    <!-- FOOTER -->
    <section v-if="active + 1 < pages.length">
      <transition name="fade" appear>

        <div style="position: fixed; bottom: 10px;" id="footer" v-if="screenThresholdTwelve && active >= basePageNum">
          <div style="display: flex; flex-direction: row; justify-content: center; width: 100vw; font-weight: bold; color: #6c7578; opacity: 0.94">
            <div style="font-size: 3vh;"> {{ currentPageStr }} </div>
            <div style="font-size: 2.2vh; margin-top: 0.85vh"> /{{ totalPageStr }}</div>
          </div>
        </div>
      </transition>
      <transition name="fade" appear>
        <div style="position: fixed; bottom: 12px;" id="footer">
          <div style="display: flex; flex-direction: row; justify-content: center; width: 100vw; font-weight: bold; text-shadow: 2px 2px 4px dimgray;"  v-if="!screenThresholdTwelve && active >= basePageNum">
            <div style="color: white; font-size: 3vh;"> {{currentPageStr}} </div>
            <div style="color: #ffc71a; font-size: 2.2vh; margin-top: 0.9vh"> /{{totalPageStr}}</div>
          </div>

          <div class="footer-links" v-if="!screenThresholdTwelve">
            <div class="text-center" style="direction: ltr">{{ $t('quiz.copyright', [new Date().getYear() + 1900]) }}</div>
            <span class="footer-links-separator"> &nbsp; | &nbsp; </span>
            <a class="text-center" target="_blank" style="margin: 0px 5px 0px 5px; color: white !important; text-decoration: none;" href="https://summery.ai/ethical-data-privacy"> {{ $t('quiz.privacy-policy') }}</a>
            <span class="footer-links-separator">&nbsp; | &nbsp;</span>
            <a class="text-center" href="https://www.summery.ai" target="_blank"><img :src="require('@/assets/images/poweredBy.svg')" style="height: 22px; margin: 0px 3px -7px 3px;" /></a>
          </div>
        </div>
      </transition>
    </section>
    <!-- END FOOTER -->



    <reveal-page-emailed 
      v-if="showRevealPageEmailed"
      :pageData="revealPageData"
      :surveyType="surveyType"
      :surveyTypeData="surveyTypeData"
    >
    </reveal-page-emailed>

    <reveal-page-ncs
      v-if="showNCSRevealPage"
      :pageData="revealPageData"
    >
    </reveal-page-ncs>
  </fragment>
</template>

<script>
// import Logo from '~/components/Logo.vue'

import { mask } from 'vue-the-mask'
import _ from 'lodash'
import { mapGetters } from 'vuex'

import Loader from '@/components/Loader'
import RevealPageEmailed from '@/components/RevealPageEmailed'
import RevealPageNcs from '@/components/RevealPageNcs'
import { cohortMockdata } from '@/utils'

export default {
  async asyncData (context) {
    const {
      app,
      store,
      route,
      params,
      query,
      env,
      isDev,
      isHMR,
      redirect,
      error
    } = context

    const filterStatus = (status) => {
      if (status === 'inactive') {
        return redirect('/notfound')
      } else if (status === 'testing' && !query.testing) {
        return redirect('/notfound')
      }
    }
    if (!params.cohort) {
      return redirect('/classic')
    }

    if (query.id) {
      try {
        let tempId = query.id.slice(0, query.id.indexOf('_'))
        let id = query.id.slice(query.id.indexOf('_') + 1)

        if (query.ncs) {
          let profile = (await context.$axios.post('/getProfileByTempIdAndCohort', {
            tempUserProfileId: tempId,
            cohortLabel: params.cohort,
            id: id
          })).data

          const revealData = (await context.$axios.post('/getCohortAndSurveyByCohortLabel', { cohortLabel: params.cohort })).data
          console.log(revealData)
          const revealPage = (await context.$axios.post('/getRevealPageById', { id: profile.revealPageId })).data

          return {
            showNCSRevealPage: true,
            revealPageData: {
              cohortLabel: params.cohort,
              id: id,
              profile: profile,
              revealData: revealData,
              revealPage: revealPage
            }
          }
        } else {
          let profile = (await context.$axios.post('/getProfileByTempIdAndCohort', {
            tempUserProfileId: tempId,
            cohortLabel: params.cohort,
            id: id
          })).data

          const revealData = (await context.$axios.post('/getCohortAndSurveyByCohortLabel', { cohortLabel: params.cohort })).data

          const revealPage = (await context.$axios.post('/getRevealPageById', { id: profile.revealPageId })).data


          return {
            showRevealPageEmailed: true,
            revealPageData: {
              cohortLabel: params.cohort,
              id: id,
              profile: profile,
              revealData: revealData,
              revealPage: revealPage
            }
          }
        }
      } catch(err) {
        return redirect('/notfound')
      }
    } else {
      try {
        const surveyCohortResp = await context.$axios.post('/getCohortAndSurveyByCohortLabel', { cohortLabel: params.cohort })
        // const surveyCohortResp = { data: cohortMockdata }

        surveyCohortResp.data.survey.quickLoadJSON.forEach(page => {
          page.items.forEach(item => {
            item.responses.forEach(response => {
              response.clicked = false
            })
          })
        })

        filterStatus(surveyCohortResp.data.cohort.status)
        return {
          surveyCohort: surveyCohortResp.data,
        }
      } catch(err) {
        // console.log(err)
        // error(err)
        return redirect('/notfound')
      }
    }
  },
  components: {
    Loader,
    RevealPageEmailed,
    RevealPageNcs
  },
  directives: {
    mask
  },
  head() {
    if (this.showRevealPageEmailed || this.showNCSRevealPage) {
      const cohortLabel = this.revealPageData.cohortLabel || ''
      const profile = this.revealPageData.profile;
      const title = this.showRevealPageEmailed
        ? (`${profile.firstName}'s ${this.surveyTypeData.title} Profile` || `${this.surveyTypeData.title} Profile`)
        : `${profile.firstName}'s NCS`

      const description = `${profile.firstName} is ${profile.name}`
      const image = this.revealPageData.revealPage.seoImage || this.revealPageData.revealPage.profileImage

      return {
        title: title,
        meta: [
          { name: 'title', content: title },
          { hid: 'description', name: 'description', content: description },

          { hid: 'og:url', name: 'og:url', content: `https://1582831145273_1579143247037_kindquizsocialshare.com/${cohortLabel}` },
          { hid: 'og:title', name: 'og:title', content: title },
          { hid: 'og:site_name', name: 'og:site_name', content: title },
          

          { hid: 'og:description', name: 'og:description', content: description },
          { hid: 'image', name: 'image', content: image, property: 'og:image' },
          { hid: 'og:image', name: 'og:image', content: image },
          

          // { hid: 'og:image:url', name: 'og:image:url', content: image.split('https').join('http') },
          // { hid: 'og:image:secure_url', name: 'og:image:secure_url', content: image },


          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image',  content: image },
        ]
      }
    } else {
      const cohortLabel = this.surveyCohort.cohort.cohortLabel || ''
      const title = this.surveyCohort.cohort.settings.seoTitle || 'The Kind Quiz'
      const description = this.surveyCohort.cohort.settings.seoDescription || 'Discover your kindness.'
      const image = this.surveyCohort.cohort.settings.seoImage || 'https://summery-kq-images.s3.amazonaws.com/1582831145273_1579143247037_kindquizsocialshare.png'
      return {
        title: title,
        meta: [
          { name: 'title', content: title },
          { hid: 'description', name: 'description', content: description },

          { hid: 'og:url', name: 'og:url', content: `https://kindquiz.com/${cohortLabel}` },
          { hid: 'og:title', name: 'og:title', content: title },
          { hid: 'og:site_name', name: 'og:site_name', content: title },

          
          { hid: 'og:description', name: 'og:description', content: description },
          { hid: 'image', name: 'image', content: image, property: 'og:image' },
          { hid: 'og:image', name: 'og:image', content: image },
          { hid: 'og:image:width', name: 'og:image:width', content: '598' },
          { hid: 'og:image:height', name: 'og:image:height', content: '398' },



          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image',  content: image },
        ]
      }
    }
  },

  mounted() {
    this.$ga.page(this.$router)
    this.$i18n.locale = this.cohortSettings.language || 'en'

    this.$store.dispatch('app/setEnvironment', { root: true })
    addEventListener('resize', this.calcMetric)
    this.calcMetric()

    if (this.cohortSettings.rtl) {
      this.$vuetify.rtl = true
    }


    if (this.showRevealPage) {
      return ;
    }

    if(this.hasWelcomePage) {
      this.images.push(new Image())
      this.images[this.images.length - 1].src = this.surveyCohort.survey.welcome.backgroundImage
      this.images[this.images.length - 1].alt = this.surveyCohort.survey.welcome.altText
    }
    this.surveyCohort.survey.quickLoadJSON.forEach((page) => {
      this.images.push(new Image())
      this.images[this.images.length - 1].src = page.backgroundImage
      this.images[this.images.length - 1].alt = page.altText
    })

    let imageLoadingCount = 0
    const maxImageCount = Math.min(5, this.images.length)

    this.images.slice(0, maxImageCount).forEach(image => {
      image.onload = () => {
        imageLoadingCount ++  
        if (imageLoadingCount == maxImageCount) {
          this.pages = this.surveyCohort.survey.quickLoadJSON

          this.pages.push({
            title: 'finalSlot'
          })

          if(this.hasWelcomePage) {
            this.pages.unshift({
              title: 'welcome',
              text: this.surveyCohort.survey.welcome.text,
              items: [],
            })
          }

          this.$nextTick(() => {
            try {
              let myCard = document.getElementById('cardHolder' + String(this.active))
              let myCardTitle = document.getElementById('cardTitle' + String(this.active))
              if (this.viewPortWidth > 500) {
                myCard.style.marginTop = (this.viewPortHeight / 2.5) - myCardTitle.clientHeight < 0 ? '0px' : (this.viewPortHeight / 3.35) - myCardTitle.clientHeight + 'px'
              } else {
                myCard.style.marginTop = (this.viewPortHeight / 2.5) - myCardTitle.clientHeight < 0 ? '0px' : (this.viewPortHeight / 2.5) - myCardTitle.clientHeight + 'px'
              }
            } catch(err) {

            }
          })

          this.allResponses = []
          this.pages.forEach(page => {
            Array.isArray(page.items) && page.items.forEach(item => {
              this.allResponses = this.allResponses.concat(item.responses)
            })
          })
        }
      }
    })
  },
  methods: {
    calcMetric() {
      this.viewPortHeight = window.innerHeight
      this.screenThresholdOne = window.innerWidth <= 1425
      this.screenThresholdTwo = window.innerWidth <= 1325
      this.screenThresholdThree = window.innerWidth <= 1225
      this.screenThresholdFour = window.innerWidth <= 1125
      this.screenThresholdFive = window.innerWidth <= 1025
      this.screenThresholdSix = window.innerWidth <= 925
      this.screenThresholdSeven = window.innerWidth <= 825
      this.screenThresholdEight = window.innerWidth <= 725
      this.screenThresholdNine = window.innerWidth <= 625
      this.screenThresholdTen = window.innerWidth <= 525
      this.screenThresholdEleven = window.innerWidth <= 425
      this.screenThresholdTwelve = window.innerWidth <= 325
      this.viewPortWidth = window.innerWidth
      this.viewPortHeight = window.innerHeight
    },
    getResponseClass(k, j, item, page) {
      return k === item.responses.length - 1 && j === page.items.length - 1 
        ? 'bottomResponse' 
        : k === item.responses.length - 1 
          ? 'bottomResponse_notLast' 
          : 'notBottom'
    },

    

    dispatchPersonalInfo(selection) {
      // email
      // firstName
      // lastName
      // residence
      // professionalLevel
      // age
      if (['residence', 'professionalLevel', 'age', 'most_need', 'gender'].indexOf(selection.type) != -1) {
        this.personalInfo = {
          ...this.personalInfo,
          [selection.type]: selection.text
        } 
      } else if (selection.type === 'email') {
        this.personalInfo = {
          ...this.personalInfo,
          [selection.type]: selection.responseText.toLowerCase()
        } 
      } else {
        this.personalInfo = {
          ...this.personalInfo,
          [selection.type]: selection.responseText
        } 
      }
    },


    pageHasAllRequiredAnswers(page) {
      let completed = true
      let minResponse = 1 // in future, item.minResponses    dynamically  in the bottom if statement, will be database field.  

      page.items.forEach((item) => {
        let counter = 0
        if (item.type === 'Dichotomous') {
          minResponse = 1
        }
        if (item.type === 'MultiOptionSelectOne') {
          minResponse = 1
        }
        if (item.type === 'MultiOptionSelectMany') {
          minResponse = 0
        }
        if (item.type === 'Textfield') {
          minResponse = item.responses.length
        }
        item.responses.forEach((response) => {
          if (response.clicked || response.responseText) {
            if (response.responseText) {
              this.dispatchPersonalInfo(response) // dispatch, email, firstName, or lastName
            }
            counter += 1
          }
        })
        if (counter < minResponse) {
          completed = false
        }
      })
      return completed
    },
    isValidPage(page, showError) {
      if (!this.pageHasAllRequiredAnswers(page)) {
        if (showError) {
          this.snackbar = true
          setTimeout(() => {
            this.snackbar = false
            this.alertMessage = ''
          }, 6000)
        }
        return false
      }

      const isCausePage = page.items[0] && page.items[0].responses[0].type === 'cause';
      const isDonationInflPage = page.items[0] && page.items[0].responses[0].type === 'donation_influences';

      if ((isCausePage && this.causes.length === 0)
        || (isDonationInflPage && this.donation_influences.length === 0)) {
        if (showError) {
          this.alertMessage = "Please choose at least one."
          this.snackbar = true
          setTimeout(() => {
            this.snackbar = false
          }, 6000)
        }
        return false
      }

      return true
    },
    async checkState() {
      if (this.active < 1) {
        return ;
      }

      const prevPage = this.pages[this.active - 1];
      if (!this.isValidPage(prevPage)) {
        this.active -= 1;
      }
    },
    selectResponse(item, response) {
      item.responses.forEach((response) => {
        response.clicked = false
      })
      response.clicked = !response.clicked

      setTimeout(() => {      
        if (this.isValidPage(this.pages[this.active]) && this.screenThresholdTen && !this.isSelectManyOrTextFieldOnPage) {
          this.eventSelectResponse(this.pages[this.active])
          this.active += 1
        }

        this.$store.dispatch('app/recordResponse', response)
        this.dispatchPersonalInfo(response)

        if (response.topTraits[0].title !== '') {
          // console.log(response.topTraits)
          // let idx = _.findIndex(this.topTraits, { title: response.topTraits[0].title })
          let idx = _.findIndex(this.topTraits, { itemId: response.itemId })
          if (idx === -1) {
            this.topTraits.push({ title: response.topTraits[0].title, description: response.topTraits[0].description, itemId: response.itemId })
          } else {
            this.topTraits.splice(idx, 1, { title: response.topTraits[0].title, description: response.topTraits[0].description, itemId: response.itemId })
          }
        }
      }, 10)
    },
    selectMultiResponseSelectMany(item, response) { // this is only used for the "causes" right now.
      response.clicked = !response.clicked
      if (response.type === 'cause') {
        if (response.clicked) {
          this.causes.push(response.text)
          this.causes = this.causes.sort((c1, c2) => {
            if (c1 > c2) {
              return 1
            } else if (c1 < c2) {
              return -1
            } else {
              0
            }
          })
          this.causes = [...new Set(this.causes)] // uniquify
        } else {
          this.causes = this.causes.filter(cause => cause !== response.text)  
        }
      }

      if (response.type === 'donation_influences') {
        if (response.clicked) {
          this.donation_influences.push(response.text)
          this.donation_influences = [...new Set(this.donation_influences)] // uniquify
        } else {
          this.donation_influences = this.donation_influences.filter(i => i !== response.text)  
        }
      }

      this.$store.dispatch('app/recordResponse', response)
    },
    back() {
      this.active -= 1
    },
    async next() {
      if (!this.isValidPage(this.pages[this.active], true)) {
        return 
      }

      // if not last page
      if (this.active + 1 !== this.pages.length - 1) {
        this.eventSelectResponse(this.pages[this.active])
        this.active += 1
        return 
      }


      // if it's last page
      if (this.active + 1 === this.pages.length - 1) { // very cool, just checking if responses are clicked will dipstach email
        this.loading = true

        var re = /\S+@\S+\.\S+/
        if (!re.test(this.personalInfo.email)) {
          this.alertMessage = 'Please include a valid email address'
          this.snackbar = true
          this.loading = false
          setTimeout(() => {
            this.snackbar = false
          }, 6000)
          return
        }


        try {
          this.savingProfile = true
          let emailInUse = await this.$axios.post('/checkEmail', { email: this.personalInfo.email, cohortId: this.cohortId })

          if (emailInUse.data.emailCount === 0) {
            // then this passes back-end test. Email can be used once per cohort (i.e., once per URL param)
            this.active += 1

            let res = await this.$axios.post('/getRevealPageById', { id: this.revealPageId })
            const dim = this.getFinalDimension()

            const profileData = {
              email: this.personalInfo.email,
              firstName: this.personalInfo.firstName,
              lastName: this.personalInfo.lastName,
              residence: this.personalInfo.residence,
              professionalLevel: this.personalInfo.professionalLevel,
              age: this.personalInfo.age,
              most_need: this.personalInfo.most_need,
              gender: this.personalInfo.gender,

              responses: this.responses, //json
              name: res.data.title,
              revealPageId: this.revealPageId,
              tempUserProfileId: this.tempUserProfileId,
              
              causes: this.causes, // json
              donation_influences: this.donation_influences,
              topTraits: this.topTraits, // json


              agility: dim[0],
              disruption: dim[1],
              empathy: dim[2],
              innovation: dim[3],
              integrity: dim[4],

              cohortLabel: this.cohortLabel,
              cohortId: this.cohortId,
              surveyId: this.surveyId
            }

            let res2 = await this.$axios.post('/saveProfile', {
              profileImage: res.data.profileImage,
              profileData: profileData,
              dimension: dim,
            })

            const revealRoute = `/${profileData.cohortLabel}?id=${profileData.tempUserProfileId}_${res2.data.id}`

            localStorage.removeItem('tempUserProfileId')
            location.href = revealRoute

          } else if (emailInUse.data.emailCount > 0) {
            this.alertMessage = 'This email is taken.'
            this.snackbar = true
            setTimeout(() => {
              this.snackbar = false
            }, 6000)
          }
          this.savingProfile = false
          this.loading = false
          return
        } catch (e) {
          console.log(e)
          this.loading = false
          alert('Unknown connection issue.')
          return
        }
      }
    },

    eventSelectResponse(page) {
      this.$ga.event({
        eventCategory: this.cohortLabel,
        eventAction: `selectResponse`,
        eventLabel: `${page.items.map(item => {
          const resp = item.responses.find(v => v.clicked)

          return `Item ID: ${item.id} Resp ID: ${resp ? resp.id : ''}`;
        }).join(' | ')}`,
        eventValue: page.id
      })
    },

    getFinalDimension () {
      let totalDimension = [0, 0, 0, 0, 0]
      this.allResponses.forEach(resp => {
        const exists = this.responses.find(r => r.id === resp.id)

        const toSum = !!exists
          ? resp.yesDim
          : resp.noDim

        if (!toSum
          || !Array.isArray(toSum)
          || toSum.length !== 5) {
          return 
        }

        totalDimension = totalDimension.map((v, index) => {
          return v + (+toSum[index])
        })
      })

      const dimCals = this.surveyCohort.survey.dimCals

      if (!dimCals || !dimCals.total || !dimCals.delta) {
        totalDimension = [0, 0, 0, 0, 0]
      } else {
        totalDimension = totalDimension.map((v, index) => {
          return  parseFloat(((v + (+dimCals.delta[index])) * 6 / (+dimCals.total[index]) + 1).toFixed(2))
        })
        console.log(totalDimension, 'after')
      }
      
      return totalDimension
    }
  },
  computed: {
    cohortSettings() {
      try {
        if (this.showRevealPage) {
          return this.revealPageData.revealData.cohort.settings
        } else {
          console.log(this.surveyCohort.cohort)
          return this.surveyCohort.cohort.settings
        }
      } catch(err) {
        return {}
      }
    },
    surveyTypeData() {
      return this.allSurveyTypeData[this.surveyType]
    },
    surveyType() {
      let surveyTitle = ''
      try {
        if (this.showRevealPageEmailed || this.showNCSRevealPage) {
          if (this.revealPageData.revealData) {
            surveyTitle = this.revealPageData.revealData.survey.title
          }
        } else {
          if (this.surveyCohort && this.surveyCohort.survey) {
            surveyTitle = this.surveyCohort.survey.title
          }
        }
      } catch(err) {
        // pass
      }

      const allGogatesSurveyTitles = ['gogates']
      if (allGogatesSurveyTitles.indexOf(surveyTitle) !== -1) {
        return 'gogates'
      } else {
        return 'kind'
      }
    },
    basePageNum() {
      return this.hasWelcomePage ? 1 : 0
    },
    currentPageStr() {
      let cPage = this.hasWelcomePage ? this.active - 1 : this.active;

      return cPage < 9
        ? '0' + (cPage + 1)
        : cPage + 1
    },
    totalPageStr() {
      return this.hasWelcomePage
        ? this.pages.length - 2
        : this.pages.length - 1;
    },
    hasWelcomePage() {
      return !!this.surveyCohort.survey.welcome && !!this.surveyCohort.survey.welcome.backgroundImage
    },
    showRevealPage() {
      return this.showRevealPageEmailed || this.showNCSRevealPage;
    },
    responses: {
      get () {
        return this.$store.state.app.responses
      },
      set (value) {
        this.$store.commit('app/setResponses', value)
      }
    },
    mobile() { return  this.screenThresholdEleven },
    cohort() { return this.surveyCohort.cohort },
    cohortLabel() { return this.surveyCohort.cohort.cohortLabel },
    cohortId() { return this.surveyCohort.cohort.id },
    surveyId() { return this.surveyCohort.survey.id },
    

    isOutOfBounds() {
      // var elem = document.querySelector('#myNavButtons' + this.active)
      // var bounding = this.$refs.myNavButtons1.getBoundingClientRect()      
      return this.active + 1
    },


    ...mapGetters('app', ['tempUserProfileId']),
    weightArray() {
      let myArray = []
      this.responses.forEach(response => {
        if (response.weights) {
          response.weights.forEach(weight => {
            let matched = false
            myArray.forEach(instance => {
              if (instance.id === weight.id) {
                instance.weight = Number(instance.weight) + Number(weight.weight)
                matched = true
              }
            })
            if (matched === false) {
              myArray.push({
                title: weight.title,
                weight: weight.weight,
                itemId: weight.itemId,
                id: weight.id
              })
            }

          })
        }
      })

      myArray = myArray.sort((s1, s2) => s1.title > s2.title ? -1 : 1)
      return myArray
    },
    revealPageId() {
      let id = null
      let biggestWeight = -100000

      this.weightArray.forEach((obj) => {
        if (obj.weight > biggestWeight) {
          biggestWeight = obj.weight
          id = obj.id
        }
      })
      console.log(id, 'Selected reveal id')
      return id
    },
    marginLeft() {
      if (this.screenThresholdTwelve) {
        return '-130px'
      }
      if (this.screenThresholdEleven) {
        return '-150px'
      }
      if (this.screenThresholdOne) {
        return '-232px'
      }
      return '-240px'
    },
    isSelectManyOrTextFieldOnPage() {
      let isManySelectOrTextField = false
      if (this.pages[this.active].items) {
        this.pages[this.active].items.forEach(item => {
          if (item.type === 'Textfield' || item.type === 'MultiOptionSelectMany') {
            isManySelectOrTextField = true
          }
        })
      }
      return isManySelectOrTextField
    },

  },
  watch: {
    tempUserProfileId (val) {
      this.$ga.set('userId', val)
    },
    active() {
      try {
        window.scrollTo(0, 0)
        this.snackbar = false
        this.$nextTick(() => {
          try {
            let myCard = document.getElementById('cardHolder' + String(this.active))
            let myCardTitle = document.getElementById('cardTitle' + String(this.active))
            // console.log((this.viewPortHeight / 2.5) - myCardTitle.clientHeight < 0)
            // console.log((this.viewPortHeight / 2.5) - myCardTitle.clientHeight)
            if (this.viewPortWidth > 500) {
              myCard.style.marginTop = (this.viewPortHeight / 2.5) - myCardTitle.clientHeight < 70 ? '0px' : (this.viewPortHeight / 3.35) - myCardTitle.clientHeight + 'px'
            } else {
              myCard.style.marginTop = (this.viewPortHeight / 2.5) - myCardTitle.clientHeight < 0 ? '0px' : (this.viewPortHeight / 2.5) - myCardTitle.clientHeight + 'px'
            }
          } catch(err) {

          }
        })
        // console.log(this.viewPortHeight)
      } catch(err) {
        console.log(err)
      }
    }
  },
  data: () => ({
    allSurveyTypeData: {
      gogates: {
        title: 'GoGates'
      },
      kind: {
        title: 'Kind'
      }
    },

    showRevealPageEmailed: false,
    showNCSRevealPage: false,
    alertMessage: '',
    showLoadingFlower: true,

    show404: false,

    loading: false,
    snackbar: false,
    active: 0,
    showImage: true,
    vibrant: [],
    muted: [],
    darkMuted: [],

    revealData: {},


    viewPortHeight: 1024,
    viewPortWidth: 768,
    screenThresholdOne: true,
    screenThresholdTwo: true,
    screenThresholdThree: true,
    screenThresholdFour: true,
    screenThresholdFive: true,
    screenThresholdSix: false,
    screenThresholdSeven: false,
    screenThresholdEight: false,
    screenThresholdNine: false,
    screenThresholdTen: false,
    screenThresholdEleven: false,
    screenThresholdTwelve: false,
    activeMargin: '20vw',


    pages: [],
    mask: 'Aaaaaaaaaaaaaaaa',
    
    causes: [],
    donation_influences: [],

    allResponses: [],


    topTraits: [],
    revealPageIdEmail: null,
    images: [],
    resources: [],
    profile: null,

    personalInfo: {
      email: '',
      firstName: '',
      lastName: '',
      residence: '',
      professionalLevel: '',
      age: '',
      most_need: '',
    },
    savingProfile: false
  }),
}
</script>

<style scoped lang="scss">
.materialShadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.cardHolderGeneral {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: 100vw;
}


.center-all {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bottomResponse {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-bottom: 15px;
}

.bottomResponse_notLast {
  height: auto;
  padding-bottom: 40px;
}

.notBottom {
  height: auto;
  padding-bottom: 15px;
}

.itemText {
  color: white;
  font-size: 20px;
  line-height: 25px;
  font-weight: 550;
}

.welcome-container {
  margin-top: 100px;
}
.welcome-card .itemText {
  color: #000;
  font-size: 14px;
  font-weight: 400;
}

.footer-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  color: #efefef;
  text-shadow: 2px 2px 4px dimgray;
  font-size: 15px;
}


@media screen and (max-device-height: 490px) {

  .no-scoot {
    border-radius: 20px;
    margin-top: 0px;
    word-break: normal;
    margin-bottom: 0px;
  }
}




/* iphone 6 zoomed view */
@media screen and (max-device-width: 501px) {

  .selectResponse {
    z-index: -10;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border: 4px solid #db1028;
    color: #FF5252;
    font-size: 19px;
    line-height: 58px;
    font-style: italic;
    width: 77vw;
    font-size: 14px;
    margin-top: -20px;
    display: flex;
    padding-bottom: 5px;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    height: 50px;
  }

  .vueGlide {
    color: white;
    width: 100vw;
    display: flex;

    /* border: 1px solid blue;  */
    margin: 17vh 0px 0px 0px;
    z-index: 100;
  }


  .itemText {
    padding: 6px 20px 0px 20px;
    -webkit-font-smoothing: antialiased;
  }

  .responseText {
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
  }

  .scoot {
    border-radius: 20px;
    margin-top: 0px;
  }

  /* // this is it. Programmatically define this for iphone 4 and small screens so overlap effect goes away. */
  .no-scoot {
    border-radius: 20px;
    margin-top: 0px;
    word-break: normal;
  }

  .topBar {
    padding: 5px 0px 5px 0px;
    z-index: 1000;
  }

  .pageImage {
    position: fixed;
    bottom: 40%;
    width: 100vw;
    height: 60vh;
    object-fit: cover;
  }

  .scoot {
    word-break: normal;
    margin-top: -18px;
    width: 77vw;
  }

  .no-scoot {
    width: 77vw;
    border-radius: 20px;
    margin-top: 0px;
    word-break: normal;
  }

  .emailMessage {
    z-index: -10;
    width: 77vw;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border: 4px solid gray;
    color: gray;
    font-size: 17px;
    line-height: 28px;
    font-style: italic;
    margin-top: -20px;
    display: flex;
    padding: 25px 10px 5px 10px;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    height: 120px;
    text-align: center;
  }

  .cardHolder {
    margin-left: -7vw;
  }

  .footer-links {
    flex-direction: column;
    align-items: center;
    .footer-links-separator {
      display: none;
    }
  }
}






@media screen and (min-device-width: 481px) {

  .selectResponse {
    z-index: -10;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border: 4px solid #db1028;
    color: #FF5252;
    font-size: 19px;
    line-height: 58px;
    font-style: italic;
    width: 491px;
    font-size: 14px;
    margin-top: -20px;
    display: flex;
    padding-bottom: 5px;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    height: 50px;
  }

  .itemText {
    padding: 20px 20px 20px 20px;
    -webkit-font-smoothing: antialiased;
  }

  .vueGlide {
    color: white;

    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* border: 1px solid blue;  */
    margin: 7vh 0px 0px 0px;
    z-index: 100;
  }

  .pageImage {
    position: fixed;
    bottom: 0%;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  .scoot {
    word-break: normal;
    margin-top: -18px;
    width: 491px;
  }

  .no-scoot {
    width: 491px;
    bottom: 0px;
    border-radius: 20px;
    margin-top: 0px;
    word-break: normal;
  }


  .emailMessage {
    z-index: -10;
    width: 491px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border: 4px solid gray;
    color: gray;
    font-size: 17px;
    line-height: 28px;
    font-style: italic;
    margin-top: -20px;
    display: flex;
    padding: 25px 25px 15px 25px;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    height: 100px;
    text-align: center;
  }

  .topBar {
    visibility: hidden;
  }

  .cardHolder {
    margin-left: -1vw;
    margin-right: 100vw;
  }
  .glide--rtl .cardHolder {
    margin-right: -1vw;
  }

  .responseText {
    font-size: 18px;
    line-height: 22px;
  }
}

@media screen and (min-device-width: 425px) {
  .topBar {
    visibility: hidden;
  }
}

@media screen and (max-device-height: 500px) {
  .scoot {}

  .itemText {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  .responseText {
    font-size: 16px;
    line-height: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>