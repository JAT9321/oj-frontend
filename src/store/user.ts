import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      // userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  // getters,
  actions: {
    async getLoginUser({ commit, state }) {
      //从后端获取用户登录状态信息
      const tokenUser = window.localStorage.getItem("tokenUser");
      const res = await UserControllerService.getLoginUserUsingGet(tokenUser);
      console.log("用户信息", res);
      if (res.code === 0) {
        //登录成功
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
    async logoutUser({ commit }) {
      window.localStorage.removeItem("tokenUser");
      commit("updateUser", {
        userName: "未登录",
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
