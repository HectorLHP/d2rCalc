<!-- Speedometer.vue -->

<template>
  <div>
    <canvas ref="speedometerCanvas" width="400" height="200"></canvas>
  </div>
  <!-- Separate text container -->
  <div class="ring-rating-text-container">
    <p v-if="totalScore > 0" class="ring-rating-text">{{ ringRating }}</p>
    <!-- Display the ring rating text -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import { getRingRating } from './logic.js'; // Ensure the path to logic.js is correct

// Props for passing dynamic score
const props = defineProps({
  totalScore: {
    type: Number,
    required: true,
  },
});

const speedometerCanvas = ref(null);
let speedometerChart;
const ringRating = ref(getRingRating(props.totalScore)); // Initialize the rating based on totalScore

const createSpeedometer = () => {
  if (!speedometerCanvas.value) return;
  const ctx = speedometerCanvas.value.getContext('2d');

  speedometerChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [props.totalScore, 6 - props.totalScore], // Ensure the data is split correctly
          backgroundColor: [getColor(props.totalScore), '#D3D3D3'], // Set color dynamically
          borderWidth: 0, // No border for a clean look
        },
      ],
    },
    options: {
      rotation: -90, // Start from top-center
      circumference: 180, // Half-circle
      cutout: '80%', // Inner radius (donut effect)
      plugins: {
        tooltip: false, // Disable tooltip
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

// Color function based on score
const getColor = (score) => {
  if (score === 6) return '#2fff00'; // Brightest Green for 6
  if (score === 5) return '#4CAF50'; // Bright Green for 5
  if (score >= 4) return '#8BC34A'; // Lighter Green for 4
  return '#FF6347'; // Red for less than 4
};

onMounted(() => {
  createSpeedometer();
});

// Watch for changes in totalScore and update the chart
watch(
  () => props.totalScore,
  (newValue) => {
    if (speedometerChart) {
      ringRating.value = getRingRating(newValue); // Update rating when value changes
      speedometerChart.data.datasets[0].data = [newValue, 6 - newValue];
      speedometerChart.data.datasets[0].backgroundColor = [
        getColor(newValue),
        '#D3D3D3',
      ];
      speedometerChart.update();
    }
  }
);
</script>

<style>
.ring-rating-text {
  font-size: 34px; /* Adjust the size */
  font-weight: bold; /* Optional: Make it bold */
  color: gold; /* Optional: Change the color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Optional: Add some flair */
  margin-top: -70px; /* Optional: Add spacing */
}

canvas {
  display: block;
  margin: auto;
}
</style>
