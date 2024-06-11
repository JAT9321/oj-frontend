<template>
  <div id="manageQuestionView">
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
    >
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 50,
    minWidth: 50,
    align: "center",
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 100,
    minWidth: 100,
    align: "center",
  },
  {
    title: "内容",
    dataIndex: "content",
    minWidth: 100,
    align: "center",
  },
  {
    title: "标签",
    dataIndex: "tags",
    width: 200,
    minWidth: 100,
    align: "center",
  },
  {
    title: "答案",
    dataIndex: "answer",
    width: 100,
    minWidth: 100,
    align: "center",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 100,
    minWidth: 50,
    align: "center",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 100,
    minWidth: 100,
    align: "center",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    width: 250,
    minWidth: 100,
    align: "center",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    minWidth: 100,
    align: "center",
  },
  {
    title: "用户id",
    dataIndex: "userId",
    width: 100,
    minWidth: 50,
    align: "center",
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "createTime",
  //   width: 200,
  //   minWidth: 100,
  //   align: "center",
  // },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
    width: 200,
    minWidth: 100,
  },
  {
    title: "操作",
    slotName: "optional",
    minWidth: 100,
    align: "center",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
