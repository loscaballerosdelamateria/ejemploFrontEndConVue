<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon v-on:click="$emit('drawer-signal')">
    </v-toolbar-side-icon>
    <v-toolbar-title>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y
            transition="slide-y-transition"
            bottom
    >
      <v-btn slot="activator" fab small dark
             >
        <v-icon large
                v-bind:class="{'orange--text lighten-3': loggedIn}"
                style="height:auto;"
                >
          account_circle
        </v-icon>
      </v-btn>
      <v-list dense>

        <v-list-tile >
          <v-list-tile-content><v-list-tile-title>
            <span class="font-weight-medium orange--text lighten-3">
              {{ username || 'Nobody' }}
            </span>
          </v-list-tile-title></v-list-tile-content>
          <v-list-tile-action>
            <v-icon small class="orange--text lighten-3">
              account_circle
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile :to="{ name: 'login' }" v-if="!loggedIn">
          <v-list-tile-content><v-list-tile-title>
            <span class="font-weight-medium">
              Login
            </span>
          </v-list-tile-title></v-list-tile-content>
          <v-list-tile-action><v-icon small>lock</v-icon></v-list-tile-action>
        </v-list-tile>

        <v-list-tile :to="{ name: 'logout' }" v-if="loggedIn">
          <v-list-tile-content><v-list-tile-title>
            <span class="font-weight-medium">
              Logout
            </span>
          </v-list-tile-title></v-list-tile-content>
          <v-list-tile-action><v-icon small>lock_open</v-icon></v-list-tile-action>
        </v-list-tile>

      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'RpiToolbar',
    data: () => ({
    }),
    computed: {
      ...mapState([
        'username'
      ]),
      ...mapGetters([
        'loggedIn'
      ])
    }
  };
</script>

<style scoped>
</style>
