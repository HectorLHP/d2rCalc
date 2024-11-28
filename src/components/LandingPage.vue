<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center align-center" fluid>
      <!-- Main header -->
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">
            Welcome to the Diablo 2 Item Value Calculator
          </h1>
        </v-col>
      </v-row>

      <!-- Buttons to navigate to other pages -->
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-btn
            @click="$router.push('/rings')"
            color="primary"
            class="mx-2"
            large
            outlined
          >
            Go to Rings
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-btn
            @click="$router.push('/')"
            color="primary"
            class="mx-2"
            large
            outlined
          >
            Go to Amulets (Coming soon)
          </v-btn>
        </v-col>
      </v-row>

      <!-- Login, Register, and Guest Access -->
      <v-row class="mt-5">
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-btn
            @click="goToLogin"
            color="secondary"
            class="mx-2"
            large
            outlined
          >
            Login
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-btn
            @click="goToRegister"
            color="secondary"
            class="mx-2"
            large
            outlined
          >
            Register
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-btn
            @click="useAsGuest"
            color="secondary"
            class="mx-2"
            large
            outlined
          >
            Continue as Guest
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goToLogin() {
      this.$router.push("/login");  // Route to login page
    },
    goToRegister() {
      this.$router.push("/register");  // Route to register page
    },
    useAsGuest() {
      console.log("Guest access");
      // Implement guest access logic (e.g., anonymous authentication)
    },
  },
};
</script>

<style scoped>
/* You can still add custom styling here if needed */
.landing-page {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #ffcc00; /* Diablo-themed color */
}
</style>
