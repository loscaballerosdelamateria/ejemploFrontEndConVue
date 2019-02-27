<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
    <v-list dense>
      <v-list-tile>
        <v-list-tile-title class="title orange--text lighten-3">
          <v-icon class="orange--text lighten-3">
            apps
          </v-icon>
          &nbsp;&nbsp;Rpi Web
        </v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <RpiDrawerItem icon="home"
                     routeName="home"
                     routeTitle="Home"
                     />

      <RpiDrawerItem icon="camera_alt"
                     routeName="camera"
                     routeTitle="Camera"
                     />

      <RpiDrawerItem icon="memory"
                     routeName="temperature"
                     routeTitle="Temperature"
                     />

      <RpiDrawerItem icon="file_copy"
                     routeName="logfiles"
                     routeTitle="Log Files"
                     />

      <RpiDrawerItem icon="list"
                     routeName="functions"
                     routeTitle="Functions"
                     />

    </v-list>

    </v-navigation-drawer>

    <RpiToolbar v-on:drawer-signal="drawer = !drawer" />

  </div>
</template>

<script>
import RpiToolbar from '@/components/RpiToolbar';
import RpiDrawerItem from '@/components/RpiDrawerItem';
export default {
  name: 'RpiDrawer',
  components: {
    RpiToolbar,
    RpiDrawerItem
  },
  data: () => ({
    drawer: null
  })
};
</script>

<style scoped>
</style>
