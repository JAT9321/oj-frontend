<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
      column-resizable
      :bordered="{ cell: true }"
      size="large"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #status="{ record }">
        <a-tag
          v-if="record.judgeInfo.message === 'Accepted'"
          :color="'#7bc616'"
        >
          Accepted
        </a-tag>
        <a-tag v-else-if="record.judgeInfo.message == null" :color="'#86909c'">
          未知错误
        </a-tag>
        <a-tag v-else :color="'#f53f3f'">
          {{ record.judgeInfo.message }}
        </a-tag>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
    width: 80,
    minWidth: 30,
    align: "center",
  },
  {
    title: "语言",
    dataIndex: "language",
    width: 50,
    minWidth: 50,
    align: "center",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
    width: 400,
    minWidth: 50,
    align: "center",
  },
  {
    title: "判题状态",
    slotName: "status",
    width: 80,
    minWidth: 50,
    align: "center",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
    width: 80,
    minWidth: 50,
    align: "center",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
    width: 150,
    minWidth: 50,
    align: "center",
  },
  {
    title: "提交时间",
    slotName: "createTime",
    width: 100,
    minWidth: 50,
    align: "center",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
