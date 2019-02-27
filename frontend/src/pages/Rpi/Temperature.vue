<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex v-if="temperatures.length > 0">
        <h2 class="text-xs-center mb-2">Temperature</h2>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="temp in temperatures"
                                     :key="temp.id"
                                     >
            <div slot="header">{{ temp.name }}</div>
            <v-card>
              <v-card-text>{{ temp.status }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  export default {
    name: 'Temperature',
    data: () => ({
      temperatures: []
    }),
    created() {
      this.getTemperatures();
    },
    methods: {
      getTemperatures() {
        this.$emit('start-loading');
        axios.get('temperatures/')
          .then(response => {
            this.temperatures = response.data;
            this.$emit('stop-loading');
          })
          .catch( (error) => {
            let alertMsg = '';
            let alertType = '';
            alertType = 'error';
            alertMsg = 'Error when trying to the Temperatures data. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.temperatures = [];
            this.$emit('stop-loading');
            this.$emit('evt-alert', alertMsg, alertType);
          });
      }
    }
  }
</script>
