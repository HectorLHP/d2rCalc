<template>
  <div class="speedometer-container">
    <!-- Vue Speedometer Component -->
    <vue-speedometer      
      :width="580"
      :needleHeightRatio="0.9"
      :value="totalScore"
      :currentValueText="` `"
      :maxValue="6"
      :segments="7"
      :maxSegmentLabels="6"
      :customSegmentStops="[0, 3.5, 4, 4.5, 5, 5.5, 6]"
      :customSegmentLabels="customSegmentLabels"
      :ringWidth="57"
      :needleTransitionDuration="4000"
      needleTransition="easeElastic"
      needleColor="#a7ff83"
      :segmentColors="[
        'red',
        'gold',
        'lightgreen',
        'limegreen',
        'green',
        'lime',
      ]"
    />
    <!-- Ring Rating Text -->
  </div>
</template>

<script setup>
import VueSpeedometer from 'vue-speedometer';
import { computed } from 'vue';
import { getRingRating } from './logic.js'; // Ensure the path is correct

// Props for dynamic totalScore
const props = defineProps({
  totalScore: {
    type: Number,
    required: true, // Ensure the prop is passed
  },
});

// Compute the ring rating based on totalScore
const ringRating = computed(() => getRingRating(props.totalScore));

// Segment labels for the speedometer
const customSegmentLabels = [
  { text: 'Charsi', position: 'INSIDE', color: '#555' },
  { text: 'Self Use', position: 'INSIDE', color: '#555' },
  { text: 'Good', position: 'INSIDE', color: '#black' },
  { text: 'Great', position: 'INSIDE', color: 'black', fontSize: '15px' },
  { text: 'Elite', position: 'INSIDE', color: 'orangered', fontSize: '15px' },
  { text: 'TROPHY', position: 'INSIDE', color: 'blue', fontSize: '12px' },
];
</script>

<style>
.speedometer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.ring-rating-text {
  font-size: 34px; /* Adjust the size */
  font-weight: bold; /* Optional: Make it bold */
  color: gold; /* Optional: Change the color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Optional: Add some flair */
}
</style>
