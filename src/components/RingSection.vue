<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Diablo 2 Rare Ring Value Calculator</h1>
        </v-col>
      </v-row>

      <!-- Row for two columns: Suffix and Prefix -->
      <v-row id="input-row" align="start" no-gutters>
        <!-- Suffix Column (Left) -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="stat in suffixStats"
          :key="'suffix-' + stat"
          class="d-flex flex-column"
        >
          <v-text-field
            :label="displayNames[stat] || stat"
            v-model.number="itemStats[stat]"
            :disabled="itemStats[stat] === 0 && suffixCount >= 3"
            :max="maxValues[stat]"
            :hint="`Max value is ${maxValues[stat]}`"
            type="number"
            variant="solo"
            class="stat-input"
          />
        </v-col>

        <!-- Prefix Column (Right) -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="stat in prefixStats"
          :key="'prefix-' + stat"
          class="d-flex flex-column"
        >
          <v-text-field
            :label="displayNames[stat] || stat"
            v-model.number="itemStats[stat]"
            :disabled="itemStats[stat] === 0 && prefixCount >= 3"
            :max="maxValues[stat]"
            :hint="`Max value is ${maxValues[stat]}`"
            type="number"
            variant="solo"
            class="stat-input"
          />
        </v-col>
      </v-row>

      <!-- Action and Result Section -->
      <v-row id="result-chart" justify="center">
        <v-col cols="12" sm="6" md="4" lg="3">
          <!-- Speedometer Display -->
          <v-row justify="center">
            <Speedometer :totalScore="totalScore" />
          </v-row>
          <!-- Buttons -->
          <v-row justify="center" class="mt-6">
            <v-btn @click="calculateValue" color="primary" large>
              Calculate Value
            </v-btn>
            <v-btn @click="clearInputs" color="secondary" large class="ml-4">
              Reset Inputs
            </v-btn>
          </v-row>

          <!-- Display Item Value -->
          <v-row justify="center">
            <p v-if="totalScore > 0" class="item-value-text">
              {{ totalScore }}
              {{ totalScore === 1 ? 'point' : 'points' }}
            </p>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import Speedometer from './Speedometer.vue';
import {
  maxValues,
  prefixStats,
  suffixStats,
  calculateItemValue,
} from './logic.js';

// Reactive data
const maxValuesData = ref(maxValues);
const itemStats = reactive({
  attackRating: 0,
  manaLeech: 0,
  fcr: 0,
  lifeLeech: 0,
  coldRes: 0,
  fireRes: 0,
  lightningRes: 0,
  poisonRes: 0,
  allRes: 0,
  strength: 0,
  dexterity: 0,
  life: 0,
  mana: 0,
  lifeReplenish: 0,
  minDamage: 0,
  maxDamage: 0,
}); // Holds the user inputs
const totalScore = ref(0);

// Display names for the stats
const displayNames = {
  fcr: 'Faster Cast Rate',
  strength: 'Strength',
  dexterity: 'Dexterity',
  life: 'Life',
  mana: 'Mana',
  lifeReplenish: 'Life Replenishment',
  lifeLeech: 'Life Leech',
  manaLeech: 'Mana Leech',
  coldRes: 'Cold Resistance',
  fireRes: 'Fire Resistance',
  lightningRes: 'Lightning Resistance',
  poisonRes: 'Poison Resistance',
  attackRating: 'Attack Rating',
  allRes: 'All Resistances',
  minDamage: 'Min Damage',
  maxDamage: 'Max Damage',
};

// Computed properties to count prefixes and suffixes
const prefixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => prefixStats.includes(stat) && itemStats[stat] > 0
  ).length;
});

const suffixCount = computed(() => {
  return Object.keys(itemStats).filter(
    (stat) => suffixStats.includes(stat) && itemStats[stat] > 0
  ).length;
});

// Watch for changes in itemStats to enforce max values
watch(
  itemStats,
  (newStats) => {
    for (const stat in newStats) {
      if (newStats[stat] > maxValues[stat]) {
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
    itemStats[stat] = 0; // Reset each stat to 0
  });
  totalScore.value = 0; // Reset the total score
};

</script>

<style scoped>
.item-value-text {
  font-size: 30px;
  font-weight: bold;
  color: rgb(55, 203, 92);
  margin-top: 0px;
}

/* Ensure higher specificity for hint messages */
.stat-input >>> .v-messages__message {
  color: #f9f6f6 !important; /* Change hint text color */
  font-size: 14px; /* Optional: Adjust font size */
  font-style: italic; /* Optional: Add font style */
}

.v-text-field {
  width: 200px;
}

h1 {
  color: rgb(0, 0, 0);
  text-shadow: 4px 4px 8px rgb(254, 241, 0);
  margin-bottom: 10px;
}
</style>
