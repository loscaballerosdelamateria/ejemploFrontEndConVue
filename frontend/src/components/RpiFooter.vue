<template>
  <v-footer app fixed class="justify-center">
    <span class="footer-font">&copy; 2019 Rpi Web</span>
  </v-footer>
</template>

<script>
export default {
  name: 'RpiFooter',
  data: () => ({
    drawer: null
  })
};
</script>

<style scoped>
  .footer-font {
    font-family: 'Roboto Mono';
  }
</style>
