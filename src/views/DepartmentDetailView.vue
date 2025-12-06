<template>
  <div class="department-detail-page">
    <!-- 导航栏 -->
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <!-- 主要内容区域 -->
    <div v-else-if="currentDepartment" class="main-content">
      <!-- 上半部分：左右分栏 -->
      <div class="content-section" :class="{ 'reverse-layout': activeCard === 'hope' || activeCard === 'recruitment' }">
        <!-- 左侧信息面板 -->
        <div class="left-panel">
          <div class="back-button" @click="goBack">
            <span class="back-text"><img src="/svg/aboutback.svg" alt="" style="width: 1vw;"> 返回</span>
          </div>
          
          <div class="department-title">
            <h1>{{ currentDepartment.name }}</h1>
          </div>
          
          <div class="department-description">
            <p>{{ currentDepartment.summary }}</p>
          </div>
        </div>
        
        <!-- 右侧照片区域 -->
        <div class="right-panel">
          <div class="photo-container">
            <img :src="currentImage" alt="部门照片" class="department-photo" />
          </div>
        </div>
      </div>
      
      <!-- 底部卡片区域 -->
      <div class="cards-container">
        <!-- 我们的成果卡片 -->
        <div 
          class="card achievements-card" 
          :class="{ 'expanded': activeCard === 'achievements' }"
          @click="toggleCard('achievements')"
        >
          <div class="card-header">
            <h3>我们的成果</h3>
            <div class="expand-icon" :class="{ 'expanded': activeCard === 'achievements' }">
              <span></span>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(achievement, index) in currentDepartment.fruit" :key="index">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 我们的日常卡片 -->
        <div 
          class="card daily-card" 
          :class="{ 'expanded': activeCard === 'daily' }"
          @click="toggleCard('daily')"
        >
          <div class="card-header">
            <h3>我们的日常</h3>
            <div class="expand-icon" :class="{ 'expanded': activeCard === 'daily' }">
              <span></span>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(daily, index) in currentDepartment.daily" :key="index">
                {{ daily }}
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 我们希望你卡片 -->
        <div 
          class="card hope-card" 
          :class="{ 'expanded': activeCard === 'hope' }"
          @click="toggleCard('hope')"
        >
          <div class="card-header">
            <h3>我们希望你</h3>
            <div class="expand-icon" :class="{ 'expanded': activeCard === 'hope' }">
              <span></span>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(hope, index) in currentDepartment.hope" :key="index">
                {{ hope }}
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 招募岗位介绍卡片 -->
        <div 
          class="card recruitment-card" 
          :class="{ 'expanded': activeCard === 'recruitment' }"
          @click="toggleCard('recruitment')"
        >
          <div class="card-header">
            <h3>招募岗位介绍</h3>
            <div class="expand-icon" :class="{ 'expanded': activeCard === 'recruitment' }">
              <span></span>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(job, index) in currentDepartment.job" :key="index">
                {{ job }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 错误状态 -->
    <div v-else class="error-container">
      <h2>部门信息未找到</h2>
      <p>抱歉，您访问的部门信息不存在。</p>
      <button @click="goBack" class="back-btn">返回上一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import productsData from '../productsData'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const activeCard = ref('') // 默认展开第一个卡片

// 从路由参数获取部门信息
const departmentName = computed(() => route.params.departmentName)
const centerName = computed(() => route.params.centerName)

// 查找当前部门数据
const currentDepartment = computed(() => {
  const center = productsData.department.find(c => c.name === decodeURIComponent(centerName.value))
  if (!center) return null
  
  const department = center.include.find(d => d.name === decodeURIComponent(departmentName.value))
  return department || null
})

// 根据当前激活的卡片返回对应的图片
const currentImage = computed(() => {
  if (!currentDepartment.value || !currentDepartment.value.image) return ''
  
  // 根据激活的卡片返回不同的图片
  const imageIndex = {
    'achievements': 0,
    'daily': 1,
    'hope': 2,
    'recruitment': 3
  }[activeCard.value] || 0
  
  // 如果图片数组长度不够，循环使用
  return currentDepartment.value.image[imageIndex % currentDepartment.value.image.length] || currentDepartment.value.image[0]
})

// 切换卡片
const toggleCard = (cardType) => {
  if (activeCard.value === cardType) {
    activeCard.value = null // 如果点击的是当前激活的卡片，则收起
  } else {
    activeCard.value = cardType // 否则激活新卡片
  }
}

// 返回首页部门区块，避免历史与滚动异常
const goBack = () => {
  // router.push({ name: 'all-in-one', hash: '#department' })
  router.back()
}

// 页面加载时的处理
onMounted(() => {
  console.log('Department Detail Page Mounted')
  console.log('Center Name:', centerName.value)
  console.log('Department Name:', departmentName.value)
  console.log('Current Department:', currentDepartment.value)
  
  // 模拟加载时间
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.department-detail-page {
  min-height: 100vh;
  background: #2BA8EF;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow-y: hidden;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding-top: 8vh; /* 为导航栏留出空间 */
  overflow-y: hidden;
}

/* 上半部分：左右分栏 */
.content-section {
  display: flex;
  flex: 1;
  align-items: stretch;
  gap: 0;
  padding: 0;
}

.content-section.reverse-layout {
  flex-direction: row-reverse;
}

.content-section.reverse-layout .right-panel::before {
  background: linear-gradient(to left, #2BA8EF 0%, rgba(43,168,239,0.9) 10%, rgba(43,168,239,0.65) 18%, rgba(43,168,239,0.25) 25%, rgba(43,168,239,0) 32%);
}

/* 左侧信息面板 */
.left-panel {
  flex: 0 0 38%;
  background: transparent;
  padding: 56px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  color: white;
  z-index: 2;
  align-items: center;
}

.back-button {
  position: fixed;
  top: 13vh;
  left: 2vw;
  cursor: pointer;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-text {
  color: white;
  font-size: 18px;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.back-text:hover {
  opacity: 0.8;
}

.department-title h1 {
  font-size: 2.5em;
  color: white;
  margin: 0;
  font-weight: 900;
  letter-spacing: 3px;
}

.department-description p {
  font-size: 1.125em;
  line-height: 2;
  color: white;
  margin: 0;
  text-align: left;
}

/* 右侧照片区域 */
.right-panel {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
  height: 92vh;
}

/* 左向蓝色渐变遮罩，营造与左侧衔接的效果 */
.right-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #2BA8EF 0%, rgba(43,168,239,0.9) 10%, rgba(43,168,239,0.65) 18%, rgba(43,168,239,0.25) 25%, rgba(43,168,239,0) 32%);
  pointer-events: none;
  z-index: 1;
}

.photo-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;
}

.department-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
}

/* 底部卡片区域 */
.cards-container {
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 30px 10px 30px;
  z-index: 20;
  overflow: visible;
}

.card {
  width: 25vw;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18), inset 0 0 60px rgba(255,255,255,0.18);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.847);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  transform: translateY(65%) rotate(-8deg);
  color: #ffffff;
}

.card:nth-child(2) {
  transform: translateY(65%) rotate(3deg);
}

.card:nth-child(3) {
  transform: translateY(65%) rotate(-2deg);
}

.card:nth-child(4) {
  transform: translateY(65%) rotate(-8deg);
}

.card:hover {
  transform: translateY(55%) rotate(0deg);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.22), inset 0 0 60px rgba(255,255,255,0.22);
}

.card.expanded {
  bottom: 0;
  transform: translateY(0) rotate(0deg);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 28px 60px rgba(43, 168, 239, 0.25), inset 0 0 80px rgba(255,255,255,0.25);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 24px 10px 24px;
  background: transparent;
  color: #ffffff;
}

.card-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 1px;
}

.expand-icon {
  width: 20px;
  height: 20px;
  position: relative;
  transition: transform 0.3s ease;
}

.expand-icon span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 2px;
  background: white;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.expand-icon span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 2px;
  background: white;
  transform: rotate(90deg);
  transition: all 0.3s ease;
}

.expand-icon.expanded span::before {
  transform: rotate(0deg);
}

.card-content {
  padding: 10px 24px 24px 24px;
  background: transparent;
}

.card-content ul {
  margin: 0;
  padding-left: 18px;
}

.card-content li {
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 8px;
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 80px;
  background: #2BA8EF;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: white;
  font-size: 18px;
  font-weight: 500;
}

/* 错误状态样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 80px;
  text-align: center;
  background: #2BA8EF;
  color: white;
}

.error-container h2 {
  color: white;
  font-size: 28px;
  margin-bottom: 15px;
}

.error-container p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-bottom: 30px;
}

.back-btn {
  background: white;
  color: #2BA8EF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-section { flex-direction: column; padding: 0; }
  .left-panel { flex: 1; order: 2; padding: 32px 16px; }
  .department-title h1 { font-size: 2.5em; }
  .department-description p { font-size: 1em; }
  .right-panel { order: 1; min-height: 360px; }
  .photo-container { border-radius: 0; }
  
  .cards-container {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .card {
    width: 100%;
    max-width: 300px;
    transform: rotate(0deg);
  }
  
  .card:nth-child(2),
  .card:nth-child(3),
  .card:nth-child(4) {
    transform: rotate(0deg);
  }
  
  .card.expanded {
    transform: translateY(-150px) rotate(0deg);
  }
}

@media (max-width: 768px) {
  .left-panel {
    padding: 20px;
  }
  
  .department-title h1 { font-size: 2em; }
  .department-description p { font-size: 0.875em; line-height: 1.8; }
  .right-panel { min-height: 280px; }
  
  .card-header {
    padding: 15px;
  }
  
  .card-header h3 {
    font-size: 16px;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .card.expanded {
    transform: translateY(-100px) rotate(0deg);
  }
}
</style>

