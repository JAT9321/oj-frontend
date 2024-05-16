/**
 * 权限校验
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @return boolean 是否满足权限
 */
import ACCESS_ENUM from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户具有的权限， 如果没有loginUser，则为未登录状态
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  //需要的用户权限为未登录，直接返回
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  //需要的权限是用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //用户未登录，无权限，返回false
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  //需要的是管理员的权限才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  return true;
};
export default checkAccess;
