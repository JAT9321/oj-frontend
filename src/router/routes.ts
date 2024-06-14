import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AdminView from "@/views/AdminView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hide: true,
    },
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hide: true,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hide: true,
    },
  },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionSubmitView,
    meta: {
      access: ACCESS_ENUM.USER,
      hide: false,
    },
  },
  {
    path: "/hide",
    name: "隐藏",
    component: HomeView,
    meta: {
      hide: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hide: true,
    },
  },
  {
    path: "/admin",
    name: "管理员",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hide: true,
    },
  },
  {
    path: "/about",
    name: "关于作者",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
