<template>
  <v-app id="kindquiz" :style="{
    'background-color': isNcs ? '#FFF' : '#d2dfe6'
  }">
    <nuxt />
  </v-app>
</template>

<script>
export default {
  components: {
  },
  methods: {
  },
  name: 'App',
  async created() {
  },
  mounted() {
  },
  computed: {
    isNcs() {
      return !!this.$route.query.ncs
    }
  },
  watch: {
  },
  data: () => ({
  }),
}
</script>
