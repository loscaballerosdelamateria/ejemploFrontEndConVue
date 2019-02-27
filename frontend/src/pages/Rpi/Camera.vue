<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex v-if="cameras.length > 0">
        <h2 class="text-xs-center mb-2">Cameras</h2>
        <v-tabs fixed-tabs
                slot="extension"
                centered
                v-model="model"
                grow
        >
          <v-tab v-for="cam in cameras"
                 :key="cam.id"
                 :href="`#tab-${cam.id}`"
                 v-on:click="clearAll"
                 >
            {{ cam.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="cam in cameras"
                      :key="cam.id"
                      :value="`tab-${cam.id}`">
              <RpiCamControls v-on:evt-get-picture="getPicture(cam.id)"
                              v-on:evt-start-feed="startFeed(cam.id)"
                              v-on:evt-stop-feed="stopFeed(cam.id)"
                              v-on:evt-light="light(cam.id)"
                              v-on:evt-clear="clearAll"
                              />
          </v-tab-item>
        </v-tabs-items>

      </v-flex>
    </v-layout>

  <RpiCamFeed v-bind:camera_id="camera_id"
              v-bind:current_action="current_action"
              v-on:evt-cam-error="camError"
              v-on:start-loading="$emit('start-loading')"
              v-on:stop-loading="$emit('stop-loading')"
              class="my-2"
              />
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import RpiCamFeed from '@/components/RpiCamFeed';
  import RpiCamControls from '@/components/RpiCamControls';
  export default {
    name: 'Camera',
    data: () => ({
      model: 'tab-1',
      dialog: false,
      camera_id: '',
      current_action: '',
      cameras: []
    }),
    components: {
      RpiCamFeed,
      RpiCamControls
    },
    created() {
      this.getCameras();
    },
    methods: {
      getCameras() {
        this.$emit('start-loading');
        axios.get('cameras/')
          .then(response => {
            this.cameras = response.data;
            this.$emit('stop-loading');
            this.current_action = '';
          })
          .catch( (error) => {
            let alertMsg = '';
            let alertType = '';
            alertType = 'error';
            alertMsg = 'Error when trying to the Cameras data. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.cameras = [];
            this.$emit('stop-loading');
            this.$emit('evt-alert', alertMsg, alertType);
            this.current_action = '';
          });
      },
      camError(alertMsg, alertType) {
        this.$emit('evt-alert', alertMsg, alertType);
      },
      getPicture(cam_id) {
        this.camera_id = cam_id;
        this.current_action = 'getPicture';
      },
      startFeed(cam_id) {
        this.camera_id = cam_id;
        this.current_action = 'startFeed';
      },
      stopFeed(cam_id) {
        this.camera_id = cam_id;
        this.current_action = 'stopFeed';
      },
      light(cam_id) {
        this.camera_id = cam_id;
        this.current_action = 'light';
      },
      clearAll() {
        this.camera_id = '';
        this.current_action = 'clearAll';
      }
    }
  }
</script>
