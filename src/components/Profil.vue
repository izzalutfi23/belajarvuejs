<template>
  <div class="container">
    <h2 class="pb-3 pt-3">Data Sebaran Covid-19</h2>
    <div class="column">
      <p>
        Data ke
        <b>
          {{ begin + 1 }} -
          {{ end >= list.length ? list.length : end }}
        </b>
        dari
        <b>{{ list.length }}</b> data
      </p>
    </div>
    <div class="columns">
      <div class="column has-text-right">
        <button class="button" @click="pageNav('left')" :disabled="begin === 0">◀</button>
        <div class="select">
          <select v-model="current_page" @change="pageNav(current_page)">
            <option v-for="i in Math.ceil(list.length / 10)" :key="i">{{ i }}</option>
          </select>
        </div>
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
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="begin === 0 ? 'disabled' : ''">
          <i class="page-link" @click="pageNav('left')">Previous</i>
        </li>
        <li v-for="i in Math.ceil(list.length / 10)" :key="i" class="page-item">
          <a class="page-link" @click="pageNav(i)">{{ i }}</a>
        </li>

        <li class="page-item" :class="end >= list.length ? 'disabled' : ''">
          <i class="page-link" @click="pageNav('right')">Next</i>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      list_paged: [],
      begin: 0,
      end: 10,
      current_page: 0
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
      } else if (!isNaN(direction)) {
        this.end = direction * 10;
        this.begin = this.end - 10;
      }
      this.list_paged = this.list.slice(this.begin, this.end);
      this.current_page = this.end / 10;
    }
  }
};
</script>