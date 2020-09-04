<template>
  <div class="dimension-box">
    <div v-show="!mobile">
      <NcsDimensionImage :centerValue="centerValue" />
    </div>
    <div class="title mb-6" :class="{ 'mt-4': !mobile }">Measuring Value Dimensions</div>

    <div v-show="mobile">
      <NcsDimensionImage :centerValue="centerValue" />
    </div>

    <div>
      <p class="body-2">The NCS score reflects a
      composite of five key dimensions.
      These dimensions are measured by
      our Kind Quiz assessment (for
      individuals) and our text-based
      analysis (for institutions).</p>
      <p class="body-2"><b>Agility</b> is changing directions to
      leverage opportunities.</p>
      <p class="body-2"><b>Disruption</b> is challenging the status
      quo.</p>
      <p class="body-2"><b>Empathy</b> is sharing emotional
      experiences.</p>
      <p class="body-2"><b>Innovation</b> is discovering and
      exploring new directions and paths.</p>
      <p class="body-2"><b>Integrity</b> is taking a thoughtful,
      deliberative approach to situations
      and relationships.</p>
    </div>
  </div>
</template>

<script>
import NcsDimensionImage from './NcsDimensionImage';

export default {
  name: 'NcsTextBox',
  components: {
    NcsDimensionImage,
  },
  methods: {
  },
  computed: {
  },
  props: ['mobile', 'centerValue']
}
</script>

<style lang="scss" scoped>
.dimension-box {
  border: 2px solid #FFC719;
  border-radius: 12px;

  padding: 13px 20px 50px 20px;
}

@media (min-width: 800px) {
  .dimension-box {
    border-radius: 30px;
  }
}
</style>
