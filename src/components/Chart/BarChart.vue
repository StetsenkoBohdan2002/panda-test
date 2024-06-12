<template>
  <canvas class="card-bar-chart" ref="chartRef" height="100"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart } from 'chart.js/auto';

const chartRef = ref<HTMLCanvasElement | null>(null);

const props = defineProps<{
  chartData: { time: string; temp: number }[];
}>();

let chartInstance: Chart | null = null;

function createChart(chartData: { time: string; temp: number }[]) {
  let delayed = null;
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    if (ctx) {
      const chartLabels = chartData.map((item) => item.time);
      const chartValues = chartData.map((item) => (item.temp - 273.15).toFixed(2));

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }
}

onMounted(() => {
  createChart(props.chartData);
});

watch(
  () => props.chartData,
  (newChart) => {
    createChart(newChart);
  },
  { deep: true }
);
</script>

<style scoped>
.card-bar-chart {
  margin-top: 40px;
}
</style>
