<template>
  <v-app id="inspire" dark>
    <RpiSpinner v-bind:loading="loading" />
    <RpiAlert v-bind:alertMsg="alertMsg"
              v-bind:alertType="alertType"
              v-on:clear-alert="alertMsg = ''; alertType = ''"
              />
    <RpiDrawer />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view
          v-on:start-loading="startLoading"
          v-on:stop-loading="stopLoading"
          v-on:evt-alert="evtAlert"
          >
        </router-view>
      </transition>
    </v-content>
    <RpiFooter />
  </v-app>
</template>

<script>
  import RpiDrawer from '@/components/RpiDrawer';
  import RpiFooter from '@/components/RpiFooter';
  import RpiSpinner from '@/components/RpiSpinner';
  import RpiAlert from '@/components/RpiAlert';
  export default {
    name: 'App',
    data: () => ({
      loading: false,
      alertMsg: '',
      alertType: '',
    }),
    components: {
      RpiDrawer,
      RpiFooter,
      RpiSpinner,
      RpiAlert
    },
    methods: {
      startLoading() {
        this.loading = true;
      },
      stopLoading() {
        this.loading = false;
      },
      evtAlert(evtAlertMsg, evtAlertType) {
        this.alertMsg = evtAlertMsg;
        this.alertType = evtAlertType;
      }
    }
  }
</script>

<style>
  /* Links */
  a, a:hover, a:visited, a:link, a:active {
    line-height: inherit;
    text-decoration: none !important;
    cursor: pointer;
    outline: none;
    border: 0;
    color: #fff;
  }
  /* end */

  /* Router transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  /* end */
</style>
