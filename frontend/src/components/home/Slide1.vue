<template>
  <article
    id="panel-1"
    class="panel full-screen"
    style="background-color: #baced1"
  >
    <v-container fill-height>
      <v-row justify="center">
        <div class="searchBox">
          <input
            class="searchInput"
            :style="pauseInput"
            type="text"
            name=""
            :placeholder="text"
            v-model="keyword"
            @click="clickInput"
            @keyup.enter="enterSearch"
          />
          <!-- btn Color : #d1ebd9-->
          <v-btn
            class="searchButton"
            color="white"
            depressed
            fab
            x-large
            @click="setQuery"
            :to="{ name: 'BasicSearch' }"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </article>
</template>

<script>
export default {
  data() {
    return {
      text: "음악을 검색 (버튼 클릭!) ==>",
      keyword: "",
      pauseInput: ""
    };
  },
  methods: {
    enterSearch() {
      const payload = {
        settingName: "initialSearchQuery",
        settingValue: this.keyword
      };
      this.$store.dispatch("albumStore/UPDATE_SETTINGS", payload);

      this.$router.push({
        name: "BasicSearch"
      });
    },
    setQuery() {
      this.$store.state.albumStore.settings.initialSearchQuery = this.keyword;
    },
    clickInput() {
      this.pauseInput = "width: 440px; padding: 0 6px;";
      console.log(this.pauseInput);
    }
  }
};
</script>

<style scoped>
.description {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 50%);
}
.searchBox {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: #2f3640;
  height: 90px;
  border-radius: 40px;
  padding: 10px;
}

.searchBox:hover > .searchInput {
  width: 440px;
  padding: 0 6px;
}

.searchBox:hover > .searchBtton {
  background: white;
  color: #d1ebd9;
}

.searchButton {
  float: right;
  background: #d1ebd9;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  float: left;
  color: white;
  font-size: 1.5em;
  transition: 0.4s;
  line-height: 70px;
  width: 0px;
  transform: translateX(20px);
}

@media screen and (max-width: 1250px) {
  .searchBox:hover > .searchInput {
    width: 300px;
    padding: 0 6px;
  }
}
</style>
