<template>
  <div class="container">
    <h2 class="pb-3 pt-3">Data Sebaran Covid-19</h2>
    <strong>All Resources</strong>
    <div class="row">
      <div class="search-wrapper panel-heading col-sm-12">
        <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
      </div>
    </div>
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
        <tr v-for="(item, index) in resultQuery" :key="item.fid">
          <td>{{ index + 1 + begin}}</td>
          <td>{{ item.provinsi }}</td>
          <td>{{ item.kasusPosi }}</td>
          <td>{{ item.kasusSemb }}</td>
          <td>{{ item.kasusMeni }}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <div class="row">
        <div class="col-lg-6">
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
        </div>
        <div class="col-lg-6">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="begin === 0 ? 'disabled' : ''">
              <i class="page-link" @click="pageNav('left')">Previous</i>
            </li>
            <select
              v-model="current_page"
              @change="pageNav(current_page)"
              name="page"
              style="border: 1px solid#CCC; font-family: Arial; padding: 3px; color: #999;"
            >
              <option v-for="i in Math.ceil(list.length / 10)" :key="i">{{ i }}</option>
            </select>
            <li class="page-item" :class="end >= list.length ? 'disabled' : ''">
              <i class="page-link" @click="pageNav('right')">Next</i>
            </li>
          </ul>
        </div>
      </div>
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
      current_page: 0,
      searchQuery: null
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
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.list.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.provinsi.toLowerCase().includes(v));
        });
      } else {
        return this.list_paged;
      }
    }
  }
};
</script>