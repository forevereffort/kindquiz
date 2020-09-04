<template>
  <div class="header">
    <img :src="require('@/assets/images/ncs-yellow.svg')" style="height: 35px;" />
  </div>
</template>

<script>
export default {
  name: 'NcsHeader',
  methods: {
  },
  props: []
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 25px;
  margin-left: 30px;
  margin-bottom: 30px;
}

@media (min-width: 800px) {
  .header {
    margin-top: 44px;
    margin-left: 40px;
    margin-bottom: 60px;
  }
}
</style>
