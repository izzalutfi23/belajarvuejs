<template>
  <div class="container">
    <h2 class="pb-3 pt-3">Data Sebaran Covid-19</h2>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>Provinsi</th>
          <th>Positif</th>
          <th>Sembuh</th>
          <th>Meninggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.fid">
          <td>{{ index + 1}}</td>
          <td>{{ item.provinsi }}</td>
          <td>{{ item.kasusPosi }}</td>
          <td>{{ item.kasusSemb }}</td>
          <td>{{ item.kasusMeni }}</td>
        </tr>
      </tbody>
    </table>
    <LineChart style="width: 100%;"></LineChart>
  </div>
</template>

<script>
import LineChart from "./Linechart";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    let uri = "https://indonesia-covid-19.mathdro.id/api/provinsi";
    this.axios
      .get(uri)
      .then(response => {
        this.list = response.data.data;
      })
      .catch(err => alert(err));
  }
};
</script>