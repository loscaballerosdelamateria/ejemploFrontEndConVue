<template>
  <!-- <v-dialog v-model="loading" max-width="100%" persistent>
    <v-card class="cardDialogBox">
      <v-card-text>
        <div class="text-xs-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="amber"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog> -->
  <div class="spinner-container" v-if="loading">
    <v-progress-circular
      indeterminate
        :size="70"
        :width="4"
      class="spinner2"
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: 'RpiSpinner',
    data: () => ({
      loading2: true
    }),
    props: [
      'loading'
    ]
  }
</script>

<style scoped>
  /* .v-progress-circular {
    margin: 1rem;
    text-align: center;
  }
  .cardDialogBox {
    padding: 10rem;
  } */
  /* Spinner */
  .spinner-container {
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-color: rgba(47, 47, 47, 0.9);
  }
  .spinner2 {
    position: absolute;
    color: #f4e622;
    top: 50%;
    z-index: 9999;
    margin-left: -35px;
    margin-top: -35px;
  }
  /* end */
</style>
