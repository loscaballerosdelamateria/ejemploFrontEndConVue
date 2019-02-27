<template>
    <v-layout row wrap align-center class="mt-2">
      <v-flex>
        <div class="text-xs-center">
          <v-btn v-on:click.stop="$emit('evt-get-picture')"
                 fab dark color="primary">
            <v-icon dark>add_a_photo</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="$emit('evt-start-feed')"
                 fab dark color="primary" disabled>
            <v-icon dark>play_arrow</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="$emit('evt-stop-feed')"
                 fab dark color="primary" disabled>
            <v-icon dark>stop</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="$emit('evt-light')"
                 fab dark color="warning" disabled>
            <v-icon dark>flash_on</v-icon>
          </v-btn>
          <v-btn v-on:click.stop="$emit('evt-clear')"
                 fab dark color="error">
            <v-icon dark>clear</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
}
</script>

<style scoped>
  .v-icon {
    height:auto;
  }
</style>
