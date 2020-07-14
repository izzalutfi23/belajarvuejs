<template>
  <div class="container">
    <h2 class="pb-3 pt-3">Data Sebaran Covid-19</h2>
    <div class="columns">
      <div class="column has-text-right">
        <button class="button" @click="pageNav('left')" :disabled="begin === 0">◀</button>
        <button class="button" @click="pageNav('right')" :disabled="end >= list.length">▶</button>
      </div>
    </div>
    <br />
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
        <tr v-for="(item, index) in list_paged" :key="item.fid">
          <td>{{ index + 1 + begin}}</td>
          <td>{{ item.provinsi }}</td>
          <td>{{ item.kasusPosi }}</td>
          <td>{{ item.kasusSemb }}</td>
          <td>{{ item.kasusMeni }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      list_paged: [],
      begin: 0,
      end: 10
    };
  },
  created() {
    let uri = "https://indonesia-covid-19.mathdro.id/api/provinsi";
    this.axios
      .get(uri)
      .then(response => {
        this.list = response.data.data;
        this.pageNav();
      })
      .catch(err => alert(err));
  },
  methods: {
    pageNav: function(direction) {
      if (direction === "left") {
        this.begin -= 10;
        this.end -= 10;
      } else if (direction === "right") {
        this.begin += 10;
        this.end += 10;
      }
      this.list_paged = this.list.slice(this.begin, this.end);
    }
  }
};
</script>