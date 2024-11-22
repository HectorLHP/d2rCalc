<template>
  <v-app>
    <div id="app">
      <!-- Main app container -->
      <v-container fluid>
        <!-- You can add a header here if you'd like -->

        <!-- Render the routed views here -->
        <router-view />
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
// No additional logic needed here for now
</script>

<style scoped>
/* Apply background styling directly to the wrapper element */
#app {
  background-image: url('/images/roguecamp.jpeg'); /* Update the path if necessary */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Ensure it covers the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: rgb(245, 247, 246);
}

/* Make the Vuetify app layout transparent */
.v-application {
  background-color: transparent;
  box-shadow: none;
}
</style>
