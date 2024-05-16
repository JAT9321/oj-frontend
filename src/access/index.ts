import store from "@/store";
import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  //之前没有登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  // 再次获取
  loginUser = store.state.user.loginUser;
  //页面需要的权限
  const needAccess = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess != ACCESS_ENUM.NOT_LOGIN) {
    //如果没有登录，跳转到登录界面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
  }
  //如果已经登录了，但权限还是不满足访问页面，跳转到无权限提示页面
  if (!checkAccess(loginUser, needAccess as string)) {
    next("/noAuth");
    return;
  }

  next();
});
