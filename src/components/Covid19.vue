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
          <td>{{ index + 1 }}</td>
          <td>{{ item.provinsi }}</td>
          <td>{{ item.kasusPosi }}</td>
          <td>{{ item.kasusSemb }}</td>
          <td>{{ item.kasusMeni }}</td>
        </tr>
      </tbody>
    </table>
    <p>{{ label }}</p>
    <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]"></pie-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      label: [],
      dt: []
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

    let url = "http://localhost:8000/api/chartdata";
    this.axios
      .get(url)
      .then(response => {
        this.dt = response.data.data;
        this.positif = response.data.data.map(download => download.Positif);
        this.label = response.data.data.map(downloa => downloa.provinsi);
      })
      .catch(err => alert(err));
  }
};
</script>