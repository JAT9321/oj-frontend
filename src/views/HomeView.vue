<template>
  <div id="home">
    <md-editor :value="Mdvalue" :handle-change="MdonChange" />
    {{ Mdvalue }}
    <code-editor :value="Codevalue" :handle-change="CodeonChange" />
    {{ Codevalue }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const Mdvalue = ref();
const MdonChange = (v: string) => {
  Mdvalue.value = v;
};

const Codevalue = ref();
const CodeonChange = (v: string) => {
  Codevalue.value = v;
};
</script>
