<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center" fluid>
      <!-- Title -->
      <v-row justify="center">
        <img
          src="/images/RingsBanner2.png"
          alt="Rare Rings"
          class="title-image"
        />
      </v-row>

      <!-- Main Section -->
      <v-row id="main-row" class="custom-row" align="start">
        <!-- Inputs Section -->
        <v-col cols="12" md="8" class="d-flex flex-row input-columns">
          <!-- Suffix Stats -->
          <div class="d-flex flex-column suffix-column mr-4">
            <h3>Suffix Stats</h3>
            <div v-for="stat in suffixStats">
              <v-text-field
                :label="displayNames[stat] || stat"
                v-model="itemStats[stat]"
                :placeholder="`Max value: ${maxValues[stat]}`"
                :disabled="(itemStats[stat] || 0) === 0 && suffixCount >= 3"
                :max="maxValues[stat]"
                type="number"
                variant="solo"
                class="stat-input"
              />
            </div>
          </div>

          <!-- Prefix Stats -->
          <div class="d-flex flex-column prefix-column">
            <h3>Prefix Stats</h3>
            <div v-for="stat in prefixStats">
              <v-text-field
                :label="displayNames[stat] || stat"
                v-model="itemStats[stat]"
                :placeholder="`Max value: ${maxValues[stat]}`"
                :disabled="(itemStats[stat] || 0) === 0 && prefixCount >= 3"
                :max="maxValues[stat]"
                type="number"
                variant="solo"
                class="stat-input"
              />
            </div>
          </div>
        </v-col>

        <!-- Speedometer and Buttons -->
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column justify-center align-center results-block mt-11"
        >
          <Speedometer :totalScore="totalScore" />
          <p v-if="totalScore > 0" class="item-value-text mt-4">
            Ring Rating: {{ totalScore }}
            {{ totalScore === 1 ? 'point' : 'points' }}
          </p>
          <v-btn @click="calculateValue" color="primary" large class="mt-5">
            Calculate Value
          </v-btn>
          <v-btn @click="clearInputs" color="secondary" large class="mt-4">
            Reset Inputs
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import Speedometer from './vue-speedometer.vue';
import {
  maxValues,
  prefixStats,
  suffixStats,
  calculateItemValue,
} from './logic.js';

// Reactive data

const itemStats = reactive({
  attackRating: null,
  manaLeech: null,
  fcr: null,
  lifeLeech: null,
  coldRes: null,
  fireRes: null,
  lightningRes: null,
  poisonRes: null,
  allRes: null,
  strength: null,
  dexterity: null,
  life: null,
  mana: null,
  lifeReplenish: null,
  minDamage: null,
  maxDamage: null,
}); // Holds the user inputs
const totalScore = ref(0);

// Display names for the stats
const displayNames = {
  fcr: 'FCR',
  strength: 'Strength',
  dexterity: 'Dexterity',
  life: 'Life',
  mana: 'Mana',
  lifeReplenish: 'Life Replenishment',
  lifeLeech: 'Life Leech',
  manaLeech: 'Mana Leech',
  coldRes: 'Cold Res',
  fireRes: 'Fire Res',
  lightningRes: 'Lightning Res',
  poisonRes: 'Poison Res',
  attackRating: 'Attack Rating',
  allRes: 'All Res',
  minDamage: 'Min Damage',
  maxDamage: 'Max Damage',
};

// Computed properties to count prefixes and suffixes

const prefixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => prefixStats.includes(stat) && (itemStats[stat] || 0) > 0 // Treat null or empty string as 0
  ).length;
});

const suffixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => suffixStats.includes(stat) && (itemStats[stat] || 0) > 0 // Treat null or empty string as 0
  ).length;
});

// Watch for changes in itemStats to enforce max values
watch(
  itemStats,
  (newStats) => {
    for (const stat in newStats) {
      if ((newStats[stat] || 0) > maxValues[stat]) {
        itemStats[stat] = maxValues[stat]; // Reset to max if exceeded
      }
    }
  },
  { deep: true }
);

// Function to calculate the item's total value
const calculateValue = () => {
  totalScore.value = calculateItemValue(itemStats);
};

// Function to reset all input fields
const clearInputs = () => {
  Object.keys(itemStats).forEach((stat) => {
    itemStats[stat] = null;
  });
  totalScore.value = 0;
};
</script>

<style scoped>
.title-image {
  max-width: 100%; /* Ensure the image fits within its container */
  height: 100px; /* Maintain aspect ratio */
  margin-bottom: 20px; /* Optional spacing */
}

h3 {
  margin-bottom: 5px;
  color: rgb(232, 222, 222);
}

/* Ensure higher specificity for hint messages */
.stat-input >>> .v-messages__message {
  color: #f9f6f6 !important; /* Change hint text color */
  font-size: 14px; /* Optional: Adjust font size */
  font-style: italic; /* Optional: Add font style */
}

.stat-input {
  max-width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.input-columns {
  max-width: 400px;
}

.item-value-text {
  font: bold 30px papyrus;
  color: rgb(169, 176, 171);
  margin-top: 0px;
}

.results-block {
  background-color: rgba(57, 53, 53, 0.8); /* Semi-transparent white */
  border-radius: 10px; /* Optional: Rounded corners */
  padding: 20px; /* Optional: Add padding inside the section */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Add a shadow */
  margin-top: 0px;
  width: 100%; /* Make sure it takes full width of its container */
  max-width: 600px; /* Optional: Set a maximum size */
}

.speedometer {
  width: 100%;
  height: 50vh; /* Adjust height to be 50% of the viewport height */
}
</style>
