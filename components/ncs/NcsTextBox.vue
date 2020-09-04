<template>
  <div class="text-box">
    <div class="title">{{pageData.revealData.cohort.name}}</div>
    <div class="title">NCS<sup style="">®</sup> Scorecard</div>


    <p class="body-2 mt-6">
      The Net Culture Score at the center
of the sunflower represents the
harmony between the social impact
values of the stakeholder cohort
and the organization’s cultural
values. The higher the number, the
greater the alignment between
cohort and enterprise values.
    </p>
    <p class="body-2">
We measure individual values
through The Kind Quiz, which tests
the person’s values along five key
dimensions by asking situational
and factual questions. The
response to each question is
mapped to a numeric contribution
that is assigned via a weighted
scoring mechanism.
    </p>
    <p class="body-2">
To calculate the NCS, we collect a
representative set of corporate
public statements (mission and
vision statements, job descriptions,
financial reports) and using Natural
Language Processing search these
texts with our proprietary value
dictionary to register the same five
dimensions as measured by The
Kind Quiz. We check the results of
this analysis by crowd-truthing the
meaning and value impact of key
words and phrases.
    </p>
  </div>
</template>

<script>
export default {
  name: 'NcsTextBox',
  methods: {
  },
  props: ['pageData']
}
</script>

<style lang="scss" scoped>
.text-box {
  
}

@media (min-width: 800px) {
  .text-box {
  }
}
</style>
