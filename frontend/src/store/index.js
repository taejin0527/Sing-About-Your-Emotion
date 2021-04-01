import Vue from "vue";
import Vuex from "vuex";
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
    playlist: [],
    asidePlaylist: [],
    videoId: "",
    playMusic: null,
    playType: "",
    playShow: false
  },
  getters: {
    playlist(state) {
      return state.playlist;
    },
    videoId(state) {
      return state.videoId;
    },
    playType(state) {
      return state.playType;
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
      state.playlist.length = 0;
      state.asidePlaylist = [];
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
    setPlaylist(state, payload) {
      state.playlist = payload.playlist;
    },
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
    setPlaylist({ commit }, playlist) {
      commit("setPlaylist", { playlist });
    },
    setVideoId({ commit }, videoId) {
      commit("setVideoId", { videoId });
    },
    setPlayMusic({ commit }, music) {
      commit("setPlayMusic", { music });
    },
    setPlayType({ commit }, playType) {
      commit("setPlayType", { playType });
    },
    addToPlaylist({ commit }, music) {
      commit("addMusicToPlaylist", { music });
    }
  }
});

export default store;
