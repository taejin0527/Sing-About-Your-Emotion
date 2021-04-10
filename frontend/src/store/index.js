import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

import albumStore from "./modules/albumStore";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    // storage 에 넣어준당
    createPersistedState()
  ],
  modules: {
    albumStore
  },
  state: {
    // social
    isLogin: false,
    uId: null,
    uName: null,
    uImage: null,
    // youtube playlist
    asidePlaylist: [],
    videoId: "",
    playMusic: null,
    playType: "",
    playShow: false,
    // Spotify API Token
    spotifyToken: null
  },
  getters: {
    videoId(state) {
      return state.videoId;
    },
    playType(state) {
      return state.playType;
    },
    playlist(state) {
      return state.asidePlaylist;
    }
  },
  mutations: {
    SET_USER_AUTH_DATA(state, payload) {
      state.isLogin = true;
      state.uId = payload["uNo"];
      state.uName = payload["uNickname"];
      if (!payload["uImage"]) {
        state.uImage =
          "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg";
      } else {
        state.uImage = payload["uImage"];
      }
      // console.log(state.uSalt)
    },
    SET_USER_AUTH_DATA_LOGOUT(state) {
      state.isLogin = false;
      state.uId = null;
      state.uName = null;
      state.uImage = null;
      state.playMusic = null;
      state.asidePlaylist = [];
      state.albumStore.bookmarkAlbums.length = 0;
    },
    SET_USER_ID(state, uId) {
      state.uId = uId;
    },
    SET_USER_NAME(state, uName) {
      state.uName = uName;
    },
    SET_USER_IMAGE(state, uImage) {
      state.uImage = uImage;
    },
    /*=========================================================================================================== */

    setVideoId(state, payload) {
      state.videoId = payload.videoId;
    },
    setPlayMusic(state, payload) {
      state.playMusic = payload.music;
    },
    setPlayType(state, payload) {
      state.playType = payload.playType;
    },
    addMusicToPlaylist(state, payload) {
      const alist = state.asidePlaylist;
      let flag = false;
      for (let m of alist) {
        if (m.mId == payload.music.mId) {
          console.log("already in playlist");
          flag = true;
        }
      }

      if (!flag) {
        state.asidePlaylist.push(payload.music);
      }

      // console.log(state.asidePlaylist);
    },
    delMusicFromPlaylist(state, payload) {
      const target = state.asidePlaylist.find(
        ele => ele.mId == payload.music.mId
      );
      const idx = state.asidePlaylist.indexOf(target);
      if (idx > -1) state.asidePlaylist.splice(idx, 1);
      console.log(idx);
    },
    /*=========================================================================================================== */
    SET_SPOTIFY_TOKEN(state, payload) {
      state.spotifyToken = payload.accessToken;
    }
  },
  actions: {
    LOGIN(context, user) {
      context.commit("SET_USER_ID", user.uId);
      context.commit("SET_USER_NAME", user.uName);
    },
    LOGOUT(context) {
      context.commit("SET_USER_AUTH_DATA_LOGOUT");
      localStorage.removeItem("auth-token");
    },
    DELETE_ACCOUNT(context) {
      context.commit("SET_USER_AUTH_DATA_LOGOUT");
      localStorage.removeItem("auth-token");
    },
    /*=========================================================================================================== */

    setVideoId({ commit }, videoId) {
      commit("setVideoId", { videoId });
    },
    setPlayMusic({ commit }, music) {
      // play cnt 증가
      axios.get(`${process.env.VUE_APP_SPRING_URL}/music/cnt?mNo=${music.mNo}`);
      commit("setPlayMusic", { music });
      commit("addMusicToPlaylist", { music });
    },
    setPlayType({ commit }, playType) {
      commit("setPlayType", { playType });
    },
    addToPlaylist({ commit }, music) {
      commit("addMusicToPlaylist", { music });
    },
    delMusicFromPlaylist({ commit }, music) {
      commit("delMusicFromPlaylist", { music });
    },
    /*=========================================================================================================== */
    UPDATE_SPOTIFY_TOKEN({ commit }, accessToken) {
      commit("SET_SPOTIFY_TOKEN", { accessToken });
    }
  }
});

export default store;
