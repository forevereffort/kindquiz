<template>
<fragment>
  <div style="background-color: #ffc71a; height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center;">
    <div style="background-color: #ffc71a; width: 100%; display: flex; flex-direction: row; justify-content: center;">
      <img :src="require('@/assets/images/Flower-W.svg')" style="animation: pulse-me 2s ease-out infinite; max-height: 200px" />
    </div>
  </div>
</fragment>
</template>

<script>

export default {
  name: 'Loader',
  methods: {
  },
  props: []
}
</script>