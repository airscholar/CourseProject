<template>
  <div>
    <div class="col col-8 align-middle mt-5 offset-2">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submit(url)">
            <div class="form-group">
              <label for="url">Enter Long Url</label>
              <input type="url" class="form-control" v-model="url" />
            </div>
            <div class="for-group" v-show="shortUrl">
              <p>
                Short URL:
                <a :href="shortUrl" class="text-primary">{{ shortUrl }}</a>
              </p>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">Shorten URL</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Shortened Urls -->
    <div class="card container">
      <div class="card-body">
        <div class="container h-100">
          <div class="d-flex justify-content-center h-100">
            <div class="searchbar">
              Search by long url:
              <input
                class="search_input"
                type="text"
                name=""
                placeholder="Search..."
                v-model="search"
                v-on:input="searchHandler(search)"
              />
              <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
            </div>
          </div>
        </div>
        <div class="shortener-box">
          <div class="container">
            <div class="row">
              <div
                class="col-lg-4 col-xs-12 text-center"
                v-for="(url, key) in filteredShortenedUrls"
                :key="key"
              >
                <div class="box">
                  <div class="box-title">
                    <h3>Shortened URL {{ key + 1 }}</h3>
                  </div>
                  <div class="box-text">
                    Long URL: <span>{{ url.target }}</span> <br />
                    Short URL: <a :href="url.address">{{ url.address }}</a>
                  </div>
                  <button
                    type="button"
                    class="box-btn btn btn-primary"
                    @click="getStats(url.short_url)"
                  >
                    <i class="fa fa-search"></i> Show/Hide Stats
                  </button>
                  <div v-show="showModal" @close="showModal">
                    <div class="shortener-stats">
                      <div class="shortener-stats__stat">
                        <span class="shortener-stats__stat-label">
                          Total clicks:
                        </span>
                        <span class="shortener-stats__stat-value">
                          {{ url.total_visit_count }}
                        </span>
                      </div>
                      <h4>Browsers Stats</h4>
                      <div class="shortener-stats-main">
                        <div class="row">
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Chrome:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_chrome || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Edge:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_edge || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Safari:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_safari || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Firefox:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_firefox || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              IE:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_ie || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Others:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.visit_count_other || 0 }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4>OS Stats</h4>
                      <div class="shortener-stats-main">
                        <div class="row">
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Windows:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_windows || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Linux:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_linux || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Mac:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_macos || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Android:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_android || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              iOS:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_ios || 0 }}
                            </span>
                          </div>
                          <div class="shortener-stats__stat">
                            <span class="shortener-stats__stat-label">
                              Others:
                            </span>
                            <span class="shortener-stats__stat-value">
                              {{ url.os_other || 0 }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
// import StatsModal from "./ShortenerStats.vue";

export default {
  name: "Shortener",
  props: {},
  // components: {
  //   StatsModal
  // },

  mounted: function() {
    axios
      .get(`http://localhost:4000/api/list`)
      .then(response => {
        this.filteredShortenedUrls = this.shortenedUrls = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      url: "",
      shortUrl: "",
      shortenedUrls: [],
      filteredShortenedUrls: [],
      search: "",
      showModal: false,
      urlStats: {}
    };
  },
  methods: {
    retrieveStats: function() {
      return this.urlStats;
    },
    getStats: async function(url) {
      const response = await axios.get(
        `http://localhost:4000/api/statistics/${url}`
      );
      this.urlStats = response.data.results;
      this.showModal = !this.showModal;
      return response.data.results;
    },
    submit: async function(url) {
      try {
        const response = await axios.post(`http://localhost:4000/api/encode`, {
          url
        });

        this.shortUrl = response.data.results.address;
        Swal.fire({
          title: "Success!",
          html:
            "Short URL: <a href=" +
            this.shortUrl +
            ">" +
            response.data.results.short_url +
            "</a>",
          icon: "success",
          confirmButtonText: "OK"
        });
        //avoid duplication
        if (this.filteredShortenedUrls.length === 0) {
          this.filteredShortenedUrls.push(response.data.results);
        } else {
          let isDuplicate = false;
          this.filteredShortenedUrls.forEach(shortenedUrl => {
            if (shortenedUrl.target === url) {
              isDuplicate = true;
            }
          });
          if (!isDuplicate) {
            this.filteredShortenedUrls.push(response.data.results);
          }
        }
        // this.filteredShortenedUrls.push(response.data.results);
      } catch (err) {
        console.log(err);
      }
    },
    searchHandler: function(searchData) {
      console.log(searchData);
      if (searchData.length >= 3) {
        this.filteredShortenedUrls = this.filteredShortenedUrls.filter(
          shortenedUrl => {
            return shortenedUrl.target.includes(searchData);
          }
        );
      } else {
        this.filteredShortenedUrls = this.shortenedUrls;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

body {
  background: #f2f2f2;
  font-family: "Poppins", sans-serif;
}

h3 {
  font-family: "Poppins", sans-serif;
}

.shortener-box .box {
  background: #fff;
  border: 1px;
  border-style: ridge;
  border-color: black;
  border-radius: 10px;
  padding: 10px 0px;
  margin: 10px 10px;
  cursor: pointer;
  word-wrap: break-word;
  transition: all 0.5s ease-out;
}

.shortener-box .box:hover {
  box-shadow: 0 0 6px #4183d7;
}

.shortener-box .box .box-text {
  margin: 0px 0px;
  font-size: 15px;
  line-height: 30px;
}

.shortener-box .box .box-btn a {
  text-decoration: none;
  color: #4183d7;
  font-size: 16px;
}

.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #757880;
  color: white;
  border-radius: 30px;
  padding: 10px;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 450px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_icon {
  background: white;
  color: #e74c3c;
}

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  text-decoration: none;
}
.short-starts-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.shortener-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-left: 10px;
}

.shortener-stats__url {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.shortener-stats__url-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.shortener-stats__stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 0px;
}

.shortener-stats__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-right: 10px;
  padding: 10px;
}

.shortener-stats__stat-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.shortener-stats__stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
</style>
