<template>
  <div class="info-box">
    <div class="mb-3">
      <b>Stakeholder</b> | {{pageData.profile.firstName + ' ' + pageData.profile.lastName}}
    </div>
    <div class="mb-3">
      <b>Enterprise</b> | {{pageData.revealData.cohort.name}}
    </div>
    <div class="">
      <b>Date</b> | {{ pageData.profile.createdAt | moment("MMMM DD, YYYY") }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NcsInfoBox',
  methods: {
  },
  props: ['pageData']
}
</script>

<style lang="scss" scoped>
.info-box {
  border: 2px solid #FFC719;
  padding: 10px 5px;
  font-size: 14px;
}

@media (min-width: 800px) {
  .info-box {
    padding: 21px 16px;

    font-size: 24px;
  }
}
</style>
