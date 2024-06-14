<template>
  <div id="about">
    <a-watermark
      content="zgtsky.top"
      v-bind="{
        font: { fontSize: 30, fontWeight: `bold` },
      }"
      style="z-index: 1"
    >
      <a-row id="about-row">
        <a-col :span="16">
          <div id="about-viewer">
            <Viewer :plugins="plugins" :value="aboutMe" />
          </div>
        </a-col>
        <a-col :span="8">
          <div id="about-gif">
            <img src="../assets/3a57dcdb1eed0016050bd9a1e0bda799.gif" />
          </div>
        </a-col>
      </a-row>
    </a-watermark>
  </div>
</template>
<script setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { ref } from "vue";

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

const aboutMe = ref("");
aboutMe.value =
  "# 🍀 介绍\n" +
  "\n" +
  "欢迎光临我的博客，记录回忆的地方🎉\n" +
  "\n" +
  "热爱生活，对一切新的事物充满好奇😄\n" +
  "\n" +
  "目前在读研究生，研究方向多模态视频跟踪。🌍\n" +
  "\n" +
  "# 💻 技能\n" +
  "\n" +
  "🤧🤧🤧学习过的一些技术，项目练习ing🤖🤖🤖\n" +
  "\n" +
  "语言：Java、python、 C++、 JavaScript\n" +
  "\n" +
  "后端：Spring、SpringMVC、Springboot、SpringSecurity、Mybatis\n" +
  "\n" +
  "前端：Vue、ajax、axios、html、css\n" +
  "\n" +
  "三方：Nginx、Dubbo、RabbitMQ、Redis、ZooKeeper、ElasticSearch、RocketMQ\n" +
  "\n" +
  "其他：Liunx、Docker、MySQL、Git\n" +
  "\n" +
  "人工智能：Pytorch框架、RGBT多模态跟踪、图像视频方向\n" +
  "\n" +
  "理论知识：设计模式、 JVM、JUC\n" +
  "\n" +
  "# 🎮 游戏\n" +
  "\n" +
  "PC端：CFHD、英雄联盟、CSGO、无畏契约、QQ飞车、植物大战僵尸\n" +
  "\n" +
  "手游端：王者荣耀、和平精英、荒野乱斗、节奏大师\n" +
  "\n" +
  "# 🌀 博客\n" +
  "\n" +
  "开发技术讨论技巧分享、一起成长\n" +
  "\n" +
  "不定时更新：[zgtsky](https://zgtsky.top/) [CSDN](https://blog.csdn.net/qq_44802369) [博客园](https://www.cnblogs.com/cxy-sky/)\n" +
  "\n";
</script>

<style scoped>
#about {
  margin-left: 10%;
  margin-right: 10%;
  border: 1px ridge;
  border-radius: 3px;
  border-color: #444444;
  width: 80%;
  z-index: 2;
}

#about-row {
  margin: 1%;
}

#about-viewer {
  margin: 1%;
  width: 60%;
}

#about-gif {
  margin-left: 60%;
  margin-top: 90%;
  z-index: 3;
}
</style>
