<template>
  <!-- <v-content>
    <v-container>
      <p class="title text-xs-left">Log In</p>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          @click="validate"
        >
          Validate
        </v-btn>
      </v-form>
    </v-container>
  </v-content> -->
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Log In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert :value="errorAlert" type="error" outline>
                  {{ errorAlertContent }}
                </v-alert>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    id="password"
                    :counter="8"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import JWTDecode from 'jwt-decode';

export default {
  data: () => ({
    errorAlertContent: '',
    errorAlert: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 3) || 'Password must be more than 8 characters',
    ],
  }),
  methods: {
    login() {
      const vm = this;
      if (vm.$refs.form.validate()) {
        const payload = {};
        payload.username = vm.name;
        payload.password = vm.password;
        console.log('payload', payload);
        vm.$backend.$loginHandle(payload).then((response) => {
          const decoded = JWTDecode(response.accessToken);
          localStorage.setItem('idToken', response.accessToken);
          localStorage.setItem('authRole', decoded.role);
          localStorage.setItem('authName', decoded.sub);
          localStorage.setItem('authIat', decoded.iat);
          localStorage.setItem('authExp', decoded.exp);
          console.log(decoded);
          if (decoded.role === 'admin') {
            this.$router.push({ name: 'home-admin' });
          } else if (decoded.role === 'nonAdmin') {
            this.$router.push({ name: 'home-user' });
          }
        }).catch((error) => {
          if (error) {
            vm.errorAlert = true;
            vm.errorAlertContent = 'UnAuthorized User';
            console.log('error', error);
            // if (error.response) {
            console.log(error.response);
            // } else if (error.request) {
            //   console.log(error.response);
            // } else {
            console.log(error.message);
          }
          // }
        });
      }
    },
  },
};
</script>

<style>

</style>
