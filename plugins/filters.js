import Vue from 'vue'

Vue.filter('removebackSpash', (value) => {
  if (value) {
    return value.replace(/\\/g, '');
  }
});