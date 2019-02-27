<template>
  <v-list-tile :to="{ name: routeName }">
    <v-list-tile-action><v-icon>{{ icon }}</v-icon></v-list-tile-action>
    <v-list-tile-content><v-list-tile-title>
      {{ routeTitle }}
    </v-list-tile-title></v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'RpiDrawerItem',
  props: [
    'icon',
    'routeName',
    'routeTitle'
  ]
}
</script>

<style scoped>
</style>
