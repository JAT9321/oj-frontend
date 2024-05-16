<template>
  <div class="home">
    <md-editor :value="value" :handle-change="onChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const value = ref();
const onChange = (v: string) => {
  value.value = v;
};
</script>
