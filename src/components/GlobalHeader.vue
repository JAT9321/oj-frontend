<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClock"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo2.png" />
            <div class="title">GT OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="userName == null || userName === '未登录'">
        <a-tag
          checkable
          color="arcoblue"
          :default-checked="true"
          @click="toLogin"
          >点击登录
        </a-tag>
      </div>
      <div v-else>
        <a-dropdown-button>
          <div>{{ userName }}</div>
          <template #content>
            <a-doption disabled>个人信息</a-doption>
            <a-doption @click="toLogout">退出</a-doption>
          </template>
        </a-dropdown-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();

const userName = ref();

onMounted(async () => {
  await store.dispatch("user/getLoginUser");
  userName.value = store.state.user?.loginUser?.userName;
  console.log("onMounted", userName.value);
});

//默认主页
const selectedKeys = ref(["/"]);
// const loginUser = store.state.user.loginUser;
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    // console.log("routes -- ", item, "index -- ", index);
    //当前页面不予展示
    if (item.meta?.hide) {
      return false;
    }
    const needAccess = item?.meta?.access as string;
    if (needAccess === ACCESS_ENUM.USER) return true;
    if (!checkAccess(store.state.user.loginUser, needAccess)) {
      //判断菜单需要的权限
      return false;
    }
    return true;
  });
});
// console.log("login - >", router.currentRoute.value.fullPath);
const toLogin = () => {
  router.push({
    path: `/user/login?redirect=${router.currentRoute.value.fullPath}`,
  });
};

const toLogout = async () => {
  const data = await UserControllerService.userLogoutUsingPost();
  await store.dispatch("user/logoutUser");
  userName.value = null;
  if (data.code == 0) {
    message.success("退出成功");
  }
};

//路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClock = (key: string) => {
  router.push({
    path: key,
  });
};

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "GT",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
