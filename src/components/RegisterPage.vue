<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Register</h1>
        </v-col>
      </v-row>

      <v-form ref="registerForm" v-model="isValid">
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
              @click="register"
              :disabled="!isValid"
              large
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-row class="mt-4">
        <v-col cols="12" class="text-center">
          <v-btn @click="goToLogin" text>
            Already have an account? Login here.
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { registerUser } from '../auth'; // Import register function from auth.js

export default {
  name: 'RegisterPage',
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
    register() {
      registerUser(this.email, this.password);
    },
    goToLogin() {
      this.$router.push('/login'); // Navigate to the login page
    },
  },
};
</script>

<style scoped>
/* Add your custom styling here */
</style>
