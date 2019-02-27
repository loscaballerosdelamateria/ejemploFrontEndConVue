<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex v-if="logfiles.length > 0">
        <h2 class="text-xs-center mb-2">Log Files</h2>
        <v-expansion-panel popout focusable>
          <v-expansion-panel-content v-for="logf in logfiles"
                                     :key="logf.id"
                                     expand-icon=""
                                     >
            <div slot="header"
                 v-on:click="getLogfilesContent(logf.id)"
                 >
              <strong>{{ logf.name }}</strong>
            </div>
            <v-card>
              <v-card-text v-html="logfiles_content[logf.id]"
                           class="rpi-code-font"
                           >
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Logfiles',
    data: () => ({
      logfiles: [],
      logfiles_content: [],
      panel_opened: -1
    }),
    created() {
      this.getLogfiles();
    },
    methods: {
      getLogfiles() {
        this.$emit('start-loading');
        axios.get('logfiles/')
          .then(response => {
            this.logfiles = response.data;
            for (let i = 0; i < this.logfiles.length; i++) {
              this.logfiles_content.push('');
            }
            this.$emit('stop-loading');
          })
          .catch( (error) => {
            let alertMsg = '';
            let alertType = '';
            alertType = 'error';
            alertMsg = 'Error when trying to the Logfiles data. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.logfiles = [];
            this.logfiles_content = [];
            this.$emit('stop-loading');
            this.$emit('evt-alert', alertMsg, alertType);
          });
      },
      getLogfilesContent(log_id) {
        if (this.panel_opened == log_id) {
          this.panel_opened = -1;
          return;
        } else {
          this.panel_opened = log_id;
        };
        this.$emit('start-loading');
        axios.get('logfiles/' + log_id)
          .then(response => {
            this.logfiles_content.splice(log_id, 1, '');
            if (response.data.error) {
              this.logfiles_content.splice(log_id, 1, response.data.error);
            } else {
              let log_content = response.data.log_content;
              let newValue = '';
              for (let i = 0; i < log_content.length; i++) {
                newValue = newValue + log_content[i] + '<br>';
              };
              this.logfiles_content.splice(log_id, 1, newValue);
            }
            this.$emit('stop-loading');
          })
          .catch( (error) => {
            let alertMsg = '';
            let alertType = '';
            alertType = 'error';
            alertMsg = 'Error when trying to get the Logfiles content. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.logfiles_content.splice(log_id, 1, 'No content found.');
            this.$emit('stop-loading');
            this.$emit('evt-alert', alertMsg, alertType);
          });
      }
    }
  }
</script>

<style scoped>
  .rpi-code-font {
    font-family: 'Roboto Mono';
    color: #fff;
  }
</style>
