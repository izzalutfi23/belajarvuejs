<template>
  <div>{{positif}}</div>
</template>
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      label: [],
      positif: [],
      chartData: {
        labels: this.label,
        datasets: [
          {
            label: "Line Chart",
            data: this.positif,
            fill: false,
            borderColor: "#2554FF",
            backgroundColor: "#2554FF",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  created() {
    let uri = "https://indonesia-covid-19.mathdro.id/api/provinsi";
    this.axios
      .get(uri)
      .then(response => {
        this.label = response.data.data.map(item => item.provinsi);
        this.positif = response.data.data.map(item => item.kasusPosi);
      })
      .catch(err => alert(err));
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>