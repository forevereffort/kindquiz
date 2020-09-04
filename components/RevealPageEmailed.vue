<template>
  <div class="revealContainer" id="revealContainer" :style="{ backgroundImage: `url('${revealPage.profileImage}')` }" :title="revealPage.altText">

    <RevealPageTop :surveyTypeData="surveyTypeData" :profile="profile" :revealData="revealData" :cohortSetting="cohortSetting" />

    <div class="mainContainer" id="mainContainer">
      <component
        v-for="(layoutItem, index) in layout"
        :key="index"
        :is="layoutItem"
        :surveyTypeData="surveyTypeData"
        :profile="profile"
        :mobile="mobile"
        :revealData="revealData"
        :kindnessWordsListFiltered="kindnessWordsListFiltered"
        :revealPage="revealPage"
        :resources="resources"
        :cohortSetting="cohortSetting"
        :surveyType="surveyType"
      />

      <div style="height: 8vh"></div>
    </div>

    <RevealPageBottom :surveyTypeData="surveyTypeData"  :profile="profile" :cohortSetting="cohortSetting" :surveyType="surveyType" />
  </div>
</template>
<script>

import _ from 'lodash'


import Loader from './Loader'

import RevealPageTop from './emailed/RevealPageTop'
import RevealPageBottom from './emailed/RevealPageBottom'
import RevealPageNav from './emailed/RevealPageNav'

import RevealPageProfile from './emailed/RevealPageProfile'
import RevealPageKindness from './emailed/RevealPageKindness'
import RevealPageOverview from './emailed/RevealPageOverview'
import RevealPageCelebrity from './emailed/RevealPageCelebrity'
import RevealPageResource from './emailed/RevealPageResource'
import RevealPageTraits from './emailed/RevealPageTraits'
import RevealPageCauses from './emailed/RevealPageCauses'
import RevealPageActivateGogates from './emailed/RevealPageActivateGogates'

const LAYOUT_ITEM = {
  'RevealPageNav': RevealPageNav,
  'RevealPageProfile': RevealPageProfile,
  'RevealPageKindness': RevealPageKindness,
  'RevealPageOverview': RevealPageOverview,
  'RevealPageTraits': RevealPageTraits,
  'RevealPageCelebrity': RevealPageCelebrity,
  'RevealPageResource': RevealPageResource,
  'RevealPageCauses': RevealPageCauses,

  'RevealPageActivateGogates': RevealPageActivateGogates
};

const defaultLayout = [
  'RevealPageNav',
  'RevealPageProfile',
  'RevealPageKindness',
  'RevealPageOverview',
  'RevealPageTraits',
  'RevealPageCelebrity',
  'RevealPageResource',
  'RevealPageCauses',
];

export default {
  beforeMount() {
  },
  created() {
    if (process.browser) {
      const MailtoUI = require('mailtoui/dist/mailtoui-min.js')

      MailtoUI.run()

      this.mobile = window.innerWidth < 894 ? true : false
      addEventListener('resize', () => {
        this.mobile = window.innerWidth < 894 ? true : false
      })

    } else {
    }
    this.loadData()
  },
  mounted () {
    const self = this



    setTimeout(() => {
      const jQuery = require('jquery')
      window.$ = jQuery

      const resourceDescs = jQuery('.resource-desc')
      resourceDescs.each((rId, r) => {
        jQuery(r).find('a').each((eId, ele) => {
          jQuery(ele).off('click');
          jQuery(ele).click((ev) => {
            ev.preventDefault()

            const win = window.open(ev.target.href, '_blank');
            win.focus();
            console.log(ev.target.href)

            this.$axios.post('/engagementCounts', {
              cohortLabel: self.profile.cohortLabel,
              profileId: self.profile.id,
              resourceId: +jQuery(r).attr('data-res-id')
            })


            this.$ga.event({
              eventCategory: this.cohortLabel,
              eventAction: `resourceClicked`,
              eventLabel: `${ev.target.href}`,
              eventValue: +jQuery(r).attr('data-res-id')
            })
          })
        })
      })
    }, 100)



    this.$ga.event({
      eventCategory: this.cohortLabel,
      eventAction: `visitProfile`,
      eventLabel: `Name: ${this.profile.firstName} Type: ${this.profile.name} Id: ${this.id}`,
      eventValue: 1
    })
  },
  components: {
    Loader,
    RevealPageCauses,
    RevealPageTop,
    RevealPageBottom,
    RevealPageNav,
    RevealPageProfile,
    RevealPageKindness,
    RevealPageOverview,
    RevealPageCelebrity,
    RevealPageResource,
    RevealPageTraits,
  },
  methods: {
    getImgFromUrl(logoUrl, callback) {
      this.img = new Image()
      this.img.src = logoUrl
      this.img.onload = () => {
        callback(this.img)
      }
    },
    showCaptureRef(ref) {
      console.log("this.$refs.capture: " + ref);
      // let vc = this;
      return ref;
    },
    loadData() {
      this.id = this.pageData.id
      this.cohort = this.pageData.cohort
      this.profile = this.pageData.profile
      this.revealPage = this.pageData.revealPage
      this.revealData = this.pageData.revealData

      const settings = this.pageData.revealData.cohort.settings
      this.$i18n.locale = settings.language || 'en'
      if (settings.rtl) {
        this.$vuetify.rtl = true
      }
      
      try {
        const resources = []
        // Combind resources and sort
        const groupedRes = _.groupBy(this.profile.matchedResources, 'resource.resourceType')
        this.profile.survey.resourceTypes.forEach(type => {
          if (groupedRes[type] && Array.isArray(groupedRes[type]) && groupedRes[type][0].resource) {
            resources.push(groupedRes[type][0].resource)
          }
        })

        this.resources = resources
      } catch(err) {
        console.log(err)
      }
    },
  },
  computed: {
    layout() {
      const currentLayout = this.cohortSetting.layout || defaultLayout;
      return currentLayout.map(layout => LAYOUT_ITEM[layout]);
    },
    cohortSetting() {
      if (this.revealData && this.revealData.cohort
         && this.revealData.cohort.settings) {
        return this.revealData.cohort.settings
      } else {
        return {}
      }
    },
    kindnessWordsListFiltered() {
      let list = []
      if (this.revealPage.kindnessWordsList) {
        list = this.revealPage.kindnessWordsList.filter((word) => {
          if (word.title !== '') {
            return word.title
          }
        })
      }
      return list
    }
  },
  props: {
    pageData: Object,
    surveyType: String,
    surveyTypeData: Object
  },
  data() {
    return {
      generatingPDF: false,
      href: 'mailto:tony.stark@example.com',

      loading: false,
      
      
      distanceToTop: 0,
      mobile: true,
      img: null,

      resources: [],
      profile: null,
      revealData: null,
      revealPage: null,

    }
  }
}
</script>

<style lang="scss">

.headerIdent-title {
  font-size: 32px;
  font-weight: 500;
  color: #474747;
}

.headerIndent-headline {
  margin: 10px 0 0 0%;
  position: relative;
  text-align: left;
  color: black;
}


.profileTitle {
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px dimgray;
}


@media (min-width:320px) {
  /* smartphones, iPhone, portrait 480x320 phones */
  .headerIndent {
    padding-left: 10%;
    padding-right: 10%;
  }

  .profileTitle {
    font-size: 35px;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 4px dimgray;
  }

  .secondaryImageType {
    font-size: 40px;
    text-shadow: 2px 2px 4px dimgray;
  }

  .profileImageSecondary {
    width: 96%;
    border-radius: 16px;
  }

}

/* normal smartphones of 2020 */
@media (min-width:374px) {
  .profileTitle {
    font-size: 40px;
  }
  .secondaryImageType {
    font-size: 45px;
    text-shadow: 2px 2px 4px dimgray;
  }
}

@media (min-width:641px) {
  /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
  .profileTitle {
    font-size: 96px;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 4px dimgray;
  }
  .secondaryImageType {
    font-size: 40px;
    text-shadow: 2px 2px 4px dimgray;
  }

  .profileImageSecondary {
    width: 46%;
    border-radius: 16px;
  }

  .headerIndent {
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media (min-width:961px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
}

@media (min-width:1025px) {
  /* big landscape tablets, laptops, and desktops */
}

@media (min-width:1281px) {
  /* hi-res laptops and desktops */
}


.mainContainer {
  z-index: 200;
  height: auto;
  width: 100vw;
  margin-top: 13vh;
  color: black;
  background-color: white;

}

.kindQuizWhite {
  height: 30px;
}

.kindQuizYellow {
  max-height: 100px;
  max-width: 300px; 
}

/* .revealImage {
    position: sticky; bottom: 0%; top: 0px; width: 106vw; height: 100vh; object-fit: cover; z-index: 50;
  } */
.revealContainer {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
  color: white;
  height: 100vh;
  z-index: 9000;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
.resource-desc {
  word-break: break-word;
}
</style>