<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Login</h1>
        </v-col>
      </v-row>

      <v-form ref="loginForm" v-model="isValid">
        <v-row class="mb-4">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[emailRules]"
              required
            />
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[passwordRules]"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              color="primary"
              @click="login"
              :disabled="!isValid"
              large
            >
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-row class="mt-4">
        <v-col cols="12" class="text-center">
          <v-btn @click="goToRegister" text>
            Don't have an account? Register here.
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { loginUser } from '../auth'; // Import login function from auth.js

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isValid: false,
      emailRules: [(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email'],
      passwordRules: [(v) => !!v || 'Password is required'],
    };
  },
  methods: {
    login() {
      loginUser(this.email, this.password);
    },
    goToRegister() {
      this.$router.push('/register'); // Navigate to the register page
    },
  },
};
</script>

<style scoped>
/* Add your custom styling here */
</style>
