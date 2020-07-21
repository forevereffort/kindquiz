<template>
<fragment>
<social-sharing :url="baseUrl" 
  :title="`I took The Kind Quiz® and my Kind profile is ${profile.name.toUpperCase()}. Discover your kindness too:`" 
  :description="`I took The Kind Quiz® and my Kind profile is ${profile.name.toUpperCase()}. Discover your kindness too:`" 
  :quote="`I took The Kind Quiz® and my Kind profile is ${profile.name.toUpperCase()}. Discover your kindness too:`" 
  :hashtags="hashtags" 
  :twitter-user="cohortSetting.twitterUser || 'SummeryAI'" 
  inline-template
>
  <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
    <div>
      <network network="facebook"><img :src="require('@/assets/images/facebook.png')" style="height: 45px;" /> </network>
    </div>
    <div style="width: 30px;"></div>
    <div>
      <network network="twitter"><img :src="require('@/assets/images/twitter.svg')" style="height: 45px;" /> </network>
    </div>
    <div style="width: 30px;"></div>
    <div>
      <network network="linkedin"><img :src="require('@/assets/images/linkedin.svg')" style="height: 45px;" /> </network>
    </div>
  </div>
</social-sharing>

</fragment>
</template>

<script>

import SocialSharing from 'vue-social-sharing'

export default {
  name: 'KQSocialSharing',
  components: {
    SocialSharing,
  },
  computed: {
    baseUrl () {
      if (process.browser) {
        return `https://www.kindquiz.com/${this.profile.cohortLabel}`
      } else {
        return ''
      }
    },  
    hashtags () {
      if (Array.isArray(this.cohortSetting.hashtags) && this.cohortSetting.hashtags.length > 0) {
        return `kindness,${this.cohortSetting.hashtags.join(',')}`;
      } else {
        return 'kindness';
      }
    }
  },
  methods: {
  },
  props: ['profile', 'cohortSetting']
}
</script>   