<template>
  <v-dialog v-model="alert"
            width="50em"
            max-width="90%"
            >
    <v-card>
      <v-card-title primary-title
                    class="headline py-2 lighten-1"
                    v-bind:class="`rpi-alert-${alertType}`"
                    >
        {{ alertType }}
        <v-spacer></v-spacer>
        <v-btn icon
               dark
               @click="alert = false"
               >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <span v-html="alertMsg"></span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'RpiAlert',
    data () {
      return {
        alert: false
      }
    },
    props: [
      'alertMsg',
      'alertType'
    ],
    watch: {
      alert: function(alert_status) {
        if (!alert_status) {
          this.$emit('clear-alert');
        }
      },
      alertMsg: function(newMsg) {
        if (newMsg != '')
        {
          this.alert = true;
        }
      }
    }
  }
</script>

<style scoped>
  .rpi-alert-error {
    background-color: #ff5252;
    color: white;
  }
  .rpi-alert-success {
      background-color: #4caf50;
      color: white;
  }
  .rpi-alert-warning {
      background-color: #fb8c00;
      color: white;
  }
  .rpi-alert-info {
      background-color: #2196f3;
      color: white;
  }
</style>
