<template>
  <v-container fluid>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    created() {
      this.$emit('start-loading');
      this.logout()
        .then( () => {
          let alertMsg = '';
          let alertType = '';
          alertType = 'success';
          alertMsg = 'You are successfully logged out.';
          this.$emit('stop-loading');
          this.$emit('evt-alert', alertMsg, alertType);
        })
        .catch(error => {
          let alertMsg = '';
          let alertType = '';
          alertType = 'error';
          alertMsg = 'Status Code: ' + error.response.status + '<br>';
          alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
          alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
          this.$emit('stop-loading');
          this.$emit('evt-alert', alertMsg, alertType);
        });
    },
    methods: {
      ...mapActions([
        'logout'
      ])
    }
  }
</script>
