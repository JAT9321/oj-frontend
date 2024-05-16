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
    async getLoginUser({ commit, state }, payload) {
      //从后端获取用户登录状态信息
      const res = await UserControllerService.getLoginUserUsingGet();
      console.log(res);
      if (res.code === 0) {
        //登录成功
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }

      console.log(payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
