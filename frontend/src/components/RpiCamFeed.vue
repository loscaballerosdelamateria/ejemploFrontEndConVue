<template>
  <transition name="fade" mode="out-in">
    <v-layout v-if="cam_picture">
      <v-flex>
          <v-img
            :src="cam_picture"
          >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex align-end flexbox>
                <span class="headline">
                  <Clocktime v-if="cam_picture" />
                </span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-img>
      </v-flex>
    </v-layout>
  </transition>
</template>

<script>
  import Clocktime from '@/components/Clocktime';
  import axios from 'axios';
  export default {
    name: 'RpiCamFeed',
    data: () => ({
      cam_picture: ''
    }),
    components: {
      Clocktime
    },
    methods: {
      getPicture(cam_id) {
        this.$emit('start-loading');
        let params = { headers: { 'Content-Encoding': 'gzip', } };
        axios.get('cameras/pic/' + cam_id, params)
          .then(response => {
            this.$emit('stop-loading');
            this.cam_picture = "data:image/jpeg;base64,".concat(response.data);
          })
          .catch( (error) => {
            let alertType = 'error';
            let alertMsg = 'Error when trying to get a Camera pic. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.cam_picture = '';
            this.$emit('stop-loading');
            this.$emit('evt-cam-error', alertMsg, alertType);
          });
      },
      startFeed(cam_id) {
        this.$emit('start-loading');
        let params = { headers:
                        { 'Content-Encoding': 'gzip',
                          'responseType': 'arraybuffer',
                        }
                    };
        axios.get('cameras/start_feed/' + cam_id, params)
          .then(response => {
            this.$emit('stop-loading');
            // response.data.forEach(function(frame) {
            //   this.cam_picture = "data:image/jpeg;base64,".concat(frame);
            // });
            this.cam_picture = "data:image/jpeg;base64,".concat(response.data);
          })
          .catch( (error) => {
            let alertType = 'error';
            let alertMsg = 'Error when trying to get a Camera feed. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.cam_picture = '';
            this.$emit('stop-loading');
            this.$emit('evt-cam-error', { alertType, alertMsg });
          });
      },
      stopFeed(cam_id) {
        axios.get('cameras/stop_feed/' + cam_id)
          .then( () => {
            this.cam_picture = '';
          })
          .catch( (error) => {
            let alertType = 'error';
            let alertMsg = 'Error when trying to the Camera pic. <br>';
            if (error.response)
            {
              alertMsg += 'Status Code: ' + error.response.status + '<br>';
              alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
              alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            };
            this.cam_picture = '';
            this.clearAll();
            this.$emit('evt-cam-error', { alertType, alertMsg });
          });
      },
      light() {
        // pass
      },
      clearAll() {
        this.cam_picture = '';
      }
    },
    props: [
      'camera_id',
      'current_action'
    ],
    watch: {
      current_action: function(newAction) {
        if (newAction == 'getPicture')
        {
          this.getPicture(this.camera_id);
        } else if (newAction == 'startFeed')
        {
          this.startFeed(this.camera_id);
        } else if (newAction == 'stopFeed')
        {
          this.stopFeed(this.camera_id);
        } else if (newAction == 'light')
        {
          this.light();
        } else if (newAction == 'clearAll')
        {
          this.clearAll();
        }
      }
    }
  }
</script>

<style scoped>
</style>
