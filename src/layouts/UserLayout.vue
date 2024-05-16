<template>
  <div id="userLayout">
    <div class="video-box">
      <video
        class="video-background"
        preload="auto"
        loop
        playsinline
        autoplay
        src="https://cdn.jsdelivr.net/gh/cxy-sky/jat-blog-img/Netty01.mp4"
        tabindex="-1"
        muted="muted"
      ></video>
      <a-layout style="min-height: 100vh">
        <div style="margin-top: 10%">
          <a-layout-header class="header">
            <a-space>
              <img src="../assets/oj-logo2.png" class="logo" />
              <div><h1>GT OJ</h1></div>
            </a-space>
          </a-layout-header>
          <a-layout-content class="content">
            <router-view />
          </a-layout-content>
        </div>
        <a-layout-footer class="footer">
          <a href="https://zgtsky.top"> 个人博客 by sky </a>
        </a-layout-footer>
      </a-layout>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#userLayout {
  text-align: center;
  /*background: url("https://cdn.jsdelivr.net/gh/cxy-sky/jat-blog-img/Netty22.webp")*/
  /*  0% 0% / 100% 100%;*/
}

.video-box {
  position: relative;
  height: 100vh;
  /*background-color: #c1cff7;*/
  /*进行视频裁剪*/
  overflow: hidden;
}

.video-box .video-background {
  position: absolute;
  left: 50%;
  top: 50%;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  min-height: 800px;
  z-index: -1;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script></script>
