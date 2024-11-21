<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center" fluid>
      <v-row class="mb-5">
        <v-col cols="12" class="text-center">
          <h1 class="display-2">Diablo 2 Rare Ring Value Calculator</h1>
        </v-col>
      </v-row>

      <!-- Row for two columns: Suffix and Prefix -->
      <v-row>
        <!-- Suffix Column (Left) -->
        <v-col
          cols="12" sm="6" md="6"
          v-for="(stat, index) in suffixStats"
          :key="'suffix-' + stat"
          class="d-flex flex-column"
        >
          <v-text-field
            :label="displayNames[stat] || stat"
            v-model.number="itemStats[stat]"
            :disabled="itemStats[stat] === 0 && suffixCount >= 3"
            :max="maxValues[stat]"
            type="number"
          />
        </v-col>

        <!-- Prefix Column (Right) -->
        <v-col
          cols="12" sm="6" md="6"
          v-for="(stat, index) in prefixStats"
          :key="'prefix-' + stat"
          class="d-flex flex-column"
        >
          <v-text-field
            :label="displayNames[stat] || stat"
            v-model.number="itemStats[stat]"
            :disabled="itemStats[stat] === 0 && prefixCount >= 3"
            :max="maxValues[stat]"
            type="number"
          />
        </v-col>
      </v-row>

      <!-- Action and Result Section -->
      <v-row>
        <v-col cols="12" class="text-center">
          <!-- Speedometer Display -->
          <Speedometer :totalScore="totalScore" />

          <!-- Calculate Button -->
          <v-btn @click="calculateValue" color="primary" large class="my-4">
            Calculate Value
          </v-btn>

          <!-- Display Item Value -->
          <p v-if="totalScore > 0" class="item-value-text">
            Total Item Value: {{ totalScore }}
            {{ totalScore === 1 ? 'point' : 'points' }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
/* Adjust column spacing and margins */
.v-col {
  margin-bottom: 1rem;
}
</style>



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
</script>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 220px;
}

.item-value-text {
  font-size: 30px;
  font-weight: bold;
  color: rgb(55, 203, 92);
  margin-top: 20px;
}

/* Adjust the row container to reduce space between columns */
.v-row {
  max-width: 300px;
  margin: 0; /* Remove any outer margin */
  padding: 10px; /* Remove padding to avoid extra space */
  justify-content: space-between; /* Spread columns without extra space in the center */
}

.v-text-field {
  width: 120%;  
  max-height: 55px;
  margin: -10px;
  background-color: rgba(246, 246, 246, 0.8);
  border-radius: 15px;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  color: rgb(0, 0, 0);
  text-shadow: 4px 4px 8px rgb(254, 241, 0);
  margin-bottom: 10px;
}
</style>
