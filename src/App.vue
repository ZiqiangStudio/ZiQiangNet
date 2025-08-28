<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import HomeView from './views/HomeView.vue'
import Header from './components/Header.vue'

const isTooNarrow = ref(false)
const NARROW_THRESHOLD = 1024

function updateNarrowFlag() {
  isTooNarrow.value = window.innerWidth < NARROW_THRESHOLD
}

onMounted(() => {
  updateNarrowFlag()
  window.addEventListener('resize', updateNarrowFlag)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNarrowFlag)
})
</script>

<template>
  <Header />
  <div class="snap-root">
    <RouterView />
  </div>
  <div v-if="isTooNarrow" class="narrow-overlay" role="dialog" aria-live="polite">
    <div class="narrow-card">
      <div class="title">屏幕过窄</div>
      <div class="desc">为获得最佳体验，请使用电脑全屏浏览</div>
    </div>
  </div>
</template>

<style scoped>
.body{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  overflow-x: hidden; /* 禁止水平滚动条 */
  font-size: 1vw;
}
</style>
<style scoped>
.snap-root{
  scroll-snap-type: y proximity;
}

.narrow-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.narrow-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  text-align: center;
  max-width: 86vw;
}

.narrow-card .title {
  color: #2BA8EF;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
}

.narrow-card .desc {
  color: #333333;
  font-size: 14px;
}
</style>
<style>
html, body{
  height: 100%;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 0;
}
body{
  margin: 0;
  overflow-x: hidden;
}

/* Reusable scroll-snap helpers for any route/component */
.snap-container{
  scroll-snap-type: y mandatory;
}
.snap-section{
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
