<template>
  <div class="dept-page">
    <!-- 使用部门装饰图片 -->
    <img class="decor-left l1" src="/img/department/左3.png" alt="" />
    <img class="decor-left l2" src="/img/department/左2.png" alt="" />
    <img class="decor-left l3" src="/img/department/左1.png" alt="" />
    <img class="decor-right r1" src="/img/department/右3.png" alt="" />
    <img class="decor-right r2" src="/img/department/右2.png" alt="" />
    <!-- <img class="decor-right r3" src="/img/department/右1.png" alt="" /> -->

    <div class="content">
      <!-- 左侧组织架构（数据驱动） -->
      <div class="left-nav">
        <div
          v-for="(center, i) in centers"
          :key="center.name"
          class="nav-item"
          :class="{ active: i === selectedCenterIndex }"
          @click="selectCenter(i)"
        >
          <div class="bar"></div>
          <div class="label" :data-text="center.name">{{ center.name }}</div>
          <div class="label2" :data-text="center.name" v-if="i === selectedCenterIndex">{{ center.name }}</div>
        </div>
      </div>

      <!-- 中央斜向英文大字 -->
      <div class="center-hero">
        <div class="hero-word" :class="{ 'animate-out': isAnimating }">{{ heroWord }}</div>
        <div class="word-bg">thisisaheroWord1111</div>
      </div>

      <!-- 右侧部门标签与简介 -->
      <div class="right-panel">
        <!-- 添加第一段描述 -->
        <div class="subtitle" v-if="currentSummary && currentSummary[0] && showContent" :class="{ 'fade-in': showContent }">
          {{ currentSummary[0] }}
        </div>
        
        <div class="tags" v-if="showContent" :class="{ 'fade-in': showContent }">
          <div 
            class="sticker" 
            v-for="inc in currentIncludes" 
            :key="inc.name"
            @click="goToDepartmentDetail(inc.name)"
          >
            {{ inc.name }} >
          </div>
        </div>
        
          <div v-if="currentSummary && currentSummary[1] && showContent" class="subtitle" :class="{ 'fade-in': showContent }">
            {{ currentSummary[1] }}
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import productsData from '../productsData'

const router = useRouter()

const centers = productsData.department
const selectedCenterIndex = ref(0)
const isAnimating = ref(false)
const showContent = ref(true)

const currentCenter = computed(() => centers[selectedCenterIndex.value] || {})
const currentIncludes = computed(() => (currentCenter.value.include || []).slice(0, 4))
const currentSummary = computed(() => currentCenter.value.summary || [])

function selectCenter(i) {
  if (i === selectedCenterIndex.value || isAnimating.value) return
  
  isAnimating.value = true
  showContent.value = false
  
  // 先让当前文字移出
  setTimeout(() => {
    selectedCenterIndex.value = i
    // 新文字移入
    setTimeout(() => {
      showContent.value = true
      setTimeout(() => {
        isAnimating.value = false
      }, 300)
    }, 100)
  }, 300)
}

function pickHeroWord(en) {
  if (!en) return ''
  const first = en.split(' ').filter(Boolean)[0] || ''
  const map = { Technology: 'TECHNOLOGY', Brand: 'BRAND', News: 'NEWS', Station: 'STATION' }
  return map[first] || first.toUpperCase()
}

const heroWord = computed(() => pickHeroWord(currentCenter.value.name_en))

// 跳转到部门详情页
function goToDepartmentDetail(departmentName) {
  const centerName = currentCenter.value.name
  router.push(`/department/${encodeURIComponent(centerName)}/${encodeURIComponent(departmentName)}`)
}
</script>

<style scoped>
.dept-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: white;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

/* 装饰图片布局（按照提供的department资源） */
.decor-left,
.decor-right {
  position: absolute;
  pointer-events: none;
  user-select: none;
  opacity: 0.9;
  z-index: 1;
}

.decor-left.l1 { left: 0; top: 0; height:90vh }
.decor-left.l2 { left: 0; top: 0; height:70vh }
.decor-left.l3 { left: 0; top: 0; height:55vh }

.decor-right.r1 { right: 8vw; bottom: 0; height:100%;width: 58vw;  }
.decor-right.r2 { right: 2vw; bottom: 0; height:100%; width: 62vw; }
.decor-right.r3 { right: -4vw; bottom: 0; height:100%;width: 60vw;  }

.content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}

/* 左侧列表 */
.left-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8vh;
  padding-left: 3vw;
}

.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform .2s ease, opacity .2s ease;
  font-family: Jump-YouthDayGB;
  position: relative;
}
.nav-item:nth-child(1){
  transform: translatex(13vw);
  &:hover{
    transform: translatex(14vw);
  }
}
.nav-item:nth-child(2){
  transform: translatex(9vw);
  &:hover{
    transform: translatex(10vw);
  }
}
.nav-item:nth-child(3){
  transform: translatex(5vw);
  &:hover{
    transform: translatex(6vw);
  }
}
.nav-item:nth-child(4){
  transform: translatex(1vw);
  &:hover{
    transform: translatex(2vw);
  }
}

.nav-item.active { opacity: 1; }

.bar {
  width: 6px;
  height: 64px;
  background: #0ea5e9;
  border-radius: 3px;
  margin-right: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scaleY(0);
}

.nav-item.active .bar {
  opacity: 1;
  transform: scaleY(1);
}

.label {
  font-size: 48px;
  color: #58CAFF;
  letter-spacing: 3px;
  font-weight: 900;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item.active .label {
  color: #2BA8EF;
}
.label2{
  font-size: 4em;
  color: #cfeeff;
  letter-spacing: 3px;
  font-weight: 900;
  white-space: nowrap;
  transform: translate(-70%,-15%);
  z-index: -1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInScale 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate(-70%,-15%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-70%,-15%) scale(1);
  }
}

/* 中央 HERO 英文斜体 */
.center-hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-word {
  position: absolute;
  top: 50vh;
  left: 58vw;
  font-size: 120px;
  font-weight: 900;
  line-height: 1;
  color: #ffffff;
  transform: rotate(-60deg) translate(-50%,-50%);
  transform-origin: top left;
  white-space: nowrap;
  text-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
.word-bg{
  position: absolute;
  top: 50vh;
  left: 58vw;
  height: 100%;
  font-size: 120px;
  font-weight: 900;
  background-color: #2BA8EF;
  color: #2BA8EF;
  transform: rotate(-60deg) translate(-50%,45px);
  transform-origin: top left;
  white-space: nowrap;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-word.animate-out {
  transform: rotate(-60deg) translate(-50%,-50%) translateY(50%);
  opacity: 0;
}

.subtitle, .tags {
  transition: all 0.4s ease-out;
  opacity: 0;
  transform: translateY(20px);
}

.subtitle.fade-in, .tags.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 右侧标签与简介 */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 32px;
  z-index: 10;
}

.subtitle {
  color: #ffffff;
  font-size: 1.2em;
  line-height: 1.5;
  text-align: left;
  margin-top: 1vh;
  margin-bottom: 24px;
  font-weight: 400;
  opacity: 0.9;
}
.subtitle:nth-child(1){
  max-width: 20vw;
}
.subtitle:nth-child(2){
  max-width: 30vw;
}

.tags {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 20px;
}

.sticker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(120px, 14vw, 180px);
  aspect-ratio: 560 / 160;
  background-image: url('/img/department/group.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  color: #2BA8EF;
  font-weight: 800;
  font-size: clamp(16px, 2.2vw, 22px);
  letter-spacing: 1px;
  line-height: 1;
  filter: none;
  box-shadow: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.sticker:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* 调整标签位置，前两个在上方，第三个在下方居中，第四个在右侧 */
.tags .sticker:nth-child(1) { 
  transform: rotate(-8deg) translateX(-10px); 
  grid-column: 1;
}
.tags .sticker:nth-child(2) { 
  transform: rotate(3deg) translateX(0); 
  grid-column: 2;
}
.tags .sticker:nth-child(3) { 
  transform: rotate(-2deg) translateX(-18px); 
  grid-column: 1;
  margin-top: 10px;
}
.tags .sticker:nth-child(4) { 
  transform: rotate(-8deg) translateX(8px); 
  grid-column: 2;
  margin-top: 10px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .label { font-size: 34px; }
  .hero-word { font-size: 92px; }
  .subtitle { font-size: 13px; max-width: 350px; }
}

@media (max-width: 900px) {
  .content { flex-direction: column; padding: 4vh 4vw; gap: 24px; }
  .left-nav { flex: none; gap: 24px; padding-left: 0; }
  .label { font-size: 28px; }
  .hero-word { transform: rotate(0deg); font-size: 64px; color: #d0ecff; }
  .right-panel { align-items: center; padding-right: 0; }
  .subtitle { font-size: 12px; max-width: 100%; text-align: center; }
  .tags { grid-template-columns: 1fr; gap: 15px; }
  .sticker { width: clamp(200px, 60vw, 300px); font-size: clamp(18px, 4vw, 24px); }
}
</style>