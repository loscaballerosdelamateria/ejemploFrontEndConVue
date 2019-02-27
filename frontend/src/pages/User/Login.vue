<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex shrink>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field id="username"
                            prepend-icon="person"
                            name="username"
                            label="Username"
                            type="text"
                            v-model="username"
                            v-on:keyup.enter.stop="login_user"
                            >
              </v-text-field>
              <v-text-field id="password"
                            prepend-icon="lock"
                            name="password"
                            label="Password"
                            type="password"
                            v-model="password"
                            v-on:keyup.enter.stop="login_user"
                            >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary"
                   @click.stop="login_user"
            >
            Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data: () => ({
      username: '',
      password: '',
    }),
    methods: {
      ...mapActions([
        'login'
      ]),
      login_user: function() {
        this.login({
          username: this.username,
          password: this.password
        })
          .then( () => {
            let paramAlertType = 'success';
            let paramAlertMsg = 'You are successfully logged in as: <strong>' + this.username + '</strong>';
            this.$router.push({ name: 'home', params: {paramAlertMsg, paramAlertType}});
          })
          .catch(error => {
            let alertMsg = '';
            let alertType = '';
            alertType = 'error';
            alertMsg = 'Status Code: ' + error.response.status + '<br>';
            alertMsg += 'Status Text: ' + error.response.statusText + '<br>';
            alertMsg += 'Data response: ' + JSON.stringify(error.response.data);
            this.$emit('evt-alert', alertMsg, alertType);
          });
      }
    }
  }
</script>
