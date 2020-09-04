
<template>
  <div class="ncs-dimension-image">
    <img :src="require('@/assets/images/sunflower-no-number.jpg')" style="" />
    <div class="score">{{centerValue}}</div>
  </div>
</template>

<script>
export default {
  name: 'NcsDimensionImage',
  methods: {
  },
  props: ['centerValue']
}
</script>

<style lang="scss" scoped>
.ncs-dimension-image {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 230px;
    height: 230px;
  }

  .score {
    position: absolute;
    color: #FFC719;
    font-size: 30px;
    font-weight: 600;
  }
}

@media (min-width: 800px) {
  .ncs-dimension-image {
    
  }
}
</style>
