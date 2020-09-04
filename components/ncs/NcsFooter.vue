<template>
  <div class="ncs-footer">
    <a class="text-center" href="https://www.summery.ai" target="_blank"><img :src="require('@/assets/images/poweredByYellow.svg')" style="height: 22px;" /></a>
    <div class="copyright">
      © 2020 Summery, Inc. All rights reserved.
      <br />
      
      <a class="text-center" target="_blank" style="color: black !important; text-decoration: none;" href="https://summery.ai/ethical-data-privacy">Privacy Policy.</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NcsFooter',
  methods: {
  },
  props: []
}
</script>

<style lang="scss" scoped>
.ncs-footer {
  text-align: center;

  .copyright {
    margin-top: 10px;
    font-size: 13px;
    font-color: #8B8B8B;
  }
}

@media (min-width: 800px) {
  .ncs-footer {
    .copyright {
      margin-top: 16px;
      font-size: 13px;
      font-color: #8B8B8B;
    }
  }
}
</style>
