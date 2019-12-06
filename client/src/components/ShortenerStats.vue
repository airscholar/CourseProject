<template>
  <div>
    <!-- create view for url statistics -->
    <div class="shortener-stats">
      <div class="shortener-stats__stat">
        <span class="shortener-stats__stat-label"> Total clicks: </span>
        <span class="shortener-stats__stat-value">
          {{ short_url.total_visit_count }}
        </span>
      </div>
      <h4>Browsers Stats</h4>
      <div class="shortener-stats-main">
        <div class="row">
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Chrome: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_chrome || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Edge: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_edge || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Safari: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_safari || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Firefox: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_firefox || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> IE: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_ie || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Others: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.visit_count_other || 0 }}
            </span>
          </div>
        </div>
      </div>
      <h4>OS Stats</h4>
      <div class="shortener-stats-main">
        <div class="row">
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Windows: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_windows || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Linux: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_linux || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Mac: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_macos || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Android: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_android || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> iOS: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_ios || 0 }}
            </span>
          </div>
          <div class="shortener-stats__stat">
            <span class="shortener-stats__stat-label"> Others: </span>
            <span class="shortener-stats__stat-value">
              {{ short_url.os_other || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ short_url }} -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StatsModal",
  props: ["short_url", "url_data"],
  methods: {},
  mount() {
    axios
      .get(`http://localhost:4000/api/statistics/${this.short_url}`)
      .then(response => {
        console.log(response);
        // this.short_url = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
/* style for url view */
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
