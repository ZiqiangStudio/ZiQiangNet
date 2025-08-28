<template>
  <div class="main-container">
    <!-- 顶部标题与主文案 -->
    <div class="studio-title">自强网络文化工作室</div>

    <!-- 视觉素材：五线谱背景、左上线条、色块背景、右下箭头、尾页元素 -->
    <img class="staff-bg" src="/img/joinus/五线谱背景.png" alt="五线谱背景" />
    <img class="left-lines" src="/img/joinus/左上线条.png" alt="左上线条" />
    <img class="color-block" src="/img/joinus/文字色块背景.png" alt="色块背景" />
    <img class="tail-info" src="/img/joinus/尾页丢丢.png" alt="尾页信息" />
    <img class="qr" src="/img/products/join/join.png" alt="二维码" />

    <!-- 文案 -->
    <div class="qr-copy">
      <div class="line1">扫描左侧二维码</div>
      <div class="line2">加入我们吧！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此页面纯静态呈现素材与文字，无需运行时脚本
</script>

<style scoped>

.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 右上角工作室标题 */
.studio-title {
  position: absolute;
  top: 14vh;
  right: 40px;
  color: transparent;
  background: linear-gradient(90deg, #ba7bff 0%, #5ab6ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

/* 素材定位 */
.staff-bg {
  position: absolute;
  top: 20vh;
  width: 100%;
  opacity: 0.85;
  z-index: 1;
}

.left-lines {
  position: absolute;
  top: 11vh;
  left: 0;
  width: 90%;
  height: auto;
  z-index: 2;
  opacity: 0.9;
}

.color-block {
  position: absolute;
  top: 20vh;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 2;
  opacity: 0.95;
}

.tail-info {
  position: absolute;
  left: 48vw;
  top: 14vh;
  transform: translateX(-50%);
  width: 36vw;
  height: auto;
  z-index: 4;
}
.qr{
  position: absolute;
  bottom: 3vh;
  left: 1vw;
  width: 10vw;
}

.qr-copy{
  position: absolute;
  left: 14vw;
  bottom: 7vh;
  color: transparent;
}
.qr-copy .line1{
  font-size: 2.2vw;
  font-weight: 800;
  background: linear-gradient(90deg, #b58dff 0%, #4cc2ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 2px rgba(0,0,0,0.05);
}
.qr-copy .line2{
  margin-top: 0.6vh;
  font-size: 2vw;
  font-weight: 700;
  background: linear-gradient(90deg, #b58dff 0%, #4cc2ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 2px rgba(0,0,0,0.05);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-title {
    font-size: 80px;
    left: 40px;
  }
  
  .subtitle {
    font-size: 36px;
    right: 40px;
  }
}
</style>