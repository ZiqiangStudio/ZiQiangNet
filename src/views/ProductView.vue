<template>
    <div id="app">
        <!-- 背景大字 PRODUCTS（参考图2样式） -->
        <div class="products-bg-text1" aria-hidden="true">PRODUCTS</div>
        <div class="products-bg-text2" aria-hidden="true">PRODUCTS</div>
        <!-- 顶部应用图标 -->
        <div class="top-apps">
            <div class="app-icon" v-for="(product, idx) in productsData.operationProducts" :key="product.name"
                :class="{ active: idx === selectedIdx }" @click="selectProduct(idx)">
                <img :src="fixImg(product.image)" class="app-icon-img" alt="" />
            </div>
        </div>
        <div class="container">
            <!-- 左侧内容 -->
            <div class="left-section">
                <div class="logo-section">
                    <h1 class="logo-title">{{ selectedProduct.name }}</h1>
                </div>
                <div class="description-text">
                    {{ selectedProduct.introduction }}
                </div>
                <div class="qr-section">
                    <div class="qr-item" v-for="(qr, i) in selectedProduct.QR" :key="i">
                        <div class="qr-code">
                            <img v-if="qr" :src="fixImg(qr)" style="width:100%;height:100%;object-fit:contain;" />
                        </div>
                        <!-- <div class="qr-label">{{ selectedProduct.name }}二维码</div> -->
                    </div>
                </div>
            </div>
            <!-- 右侧新闻区 -->
            <div class="line1"><img src="/img/products/line1.png" alt=""></div>
            <div class="right-section">
                <div class="search-window">
                    <div class="window-header">
                        <div class="header-tabs">
                            <img src="/svg/products/ziqiang.svg" alt="">
                            <div class="vertical"></div>
                            <div class="tab">自强网络文化工作室
                                <img src="/svg/products/close.svg" alt="">
                            </div>
                            <div class="tab active">{{ selectedProduct.name }}
                                <img src="/svg/products/close.svg" alt="">
                            </div>
                        </div>
                        <div class="window-controls">
                            <div class="control-btn minimize"><img src="/svg/products/zoomout.svg" alt="">
                            </div>
                            <div class="control-btn maximize"><img src="/svg/products/enlarge.svg" alt="">
                            </div>
                            <div class="control-btn close"><img src="/svg/products/close.svg" alt=""></div>
                        </div>
                    </div>
                    <div class="search-bar">
                        <div class="search-icon">🔍</div>
                        <input type="text" class="search-input" v-model="searchQuery" :placeholder="selectedProduct.name" />
                        <div class="clear-btn">✕</div>
                    </div>
                    <div class="search-results">
                        <template v-if="(selectedProduct.news && selectedProduct.news.length)">
                            <div class="result-item" v-for="item in filteredNews" :key="item.title" @click="openNews(item)">
                                <div class="result-image"
                                    :style="{ background: 'url(' + fixImg(item.url) + ') center/cover' }"></div>
                                <div class="result-title">{{ item.title }}</div>
                            </div>
                        </template>
                        <div v-else class="no-news">
                            <img src="/img/products/join/自强JOIN.png" alt="自强Join" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="line2"><img src="/img/products/line2.png" alt=""></div>

        </div>

        <!-- 新增的滚动卡片页面 -->
        <div class="product-page">
            <!-- 左侧滚动卡片区域 -->
             <div class="bg"><img src="/img/activity/activitybg.png" alt=""></div>
            <div class="left-section-new">
                <div class="background-text1">ACTIVITIES</div>
                <div class="cards-container" ref="cardsContainer">
                    <div v-for="(product, index) in productsData.technologyProducts" :key="product.name"
                        class="product-card" :class="{ active: selectedIndex === index }"
                        @click="selectProductNew(index)">
                            <img :src="fixImg(firstImg(product.image))" :alt="product.name" />
                    </div>
                </div>
                <div class="background-text2">ACTIVITIES</div>

            </div>

            <!-- 右侧内容展示区域 -->
            <div class="right-section-new">
                <div class="content-wrapper">
                    <!-- 主标题 -->
                    <h1 class="main-title">{{ selectedProductNew.name }}</h1>

                    <!-- 描述文本：蓝色说明段落 -->
                    <div class="description-text-new rich">
                        {{ selectedProductNew.introduction }}
                    </div>

                    <!-- 相机展示区域 -->
                    <div class="camera-area">
                        <div class="camera-mockup">
                            <div class="camera-screen" :style="{ backgroundImage: 'url(' + fixImg(secondImg(selectedProductNew.image) || firstImg(selectedProductNew.image)) + ')' }"></div>
                            <img class="camera-frame" src="/img/activity/camera.png" alt="camera frame" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import productsData from '../productsData';

// 原有功能的状态
const selectedIdx = ref(0);
const searchQuery = ref('');
const selectedProduct = computed(() => productsData.operationProducts[selectedIdx.value]);

// 新增功能的状态
const selectedIndex = ref(0);
const cardsContainer = ref(null);
let autoScrollInterval = null;

const selectedProductNew = computed(() => productsData.technologyProducts[selectedIndex.value]);

// 原有功能的方法
function selectProduct(idx) {
    selectedIdx.value = idx;
    searchQuery.value = '';
}

function fixImg(path) {
    // 兼容 ../../img/xxx.png 和 /img/xxx.png
    if (!path) return '';
    if (path.startsWith('/')) return path;
    return path.replace(/^\.\.\//, '/');
}

// 处理图片字段可能为数组的情况
function firstImg(img) {
    if (Array.isArray(img)) return img[0] || '';
    return img || '';
}

function secondImg(img) {
    if (Array.isArray(img)) return img[1] || '';
    return '';
}

const filteredNews = computed(() => {
    const news = selectedProduct.value.news || [];
    if (!searchQuery.value) return news;
    return news.filter(item => item.title.includes(searchQuery.value));
});

function openNews(item) {
    if (item.link) window.open(item.link, '_blank');
}

// 新增功能的方法
function selectProductNew(index) {
    selectedIndex.value = index;
}

// 自动滚动功能
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (cardsContainer.value) {
            const container = cardsContainer.value;
            if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
                container.scrollTop = 0;
            } else {
                container.scrollTop += 1;
            }
        }
    }, 50);
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// 鼠标滚轮控制
function handleWheel(event) {
    if (cardsContainer.value) {
        event.preventDefault();
        const container = cardsContainer.value;
        container.scrollTop += event.deltaY;
    }
}

onMounted(() => {
    startAutoScroll();
    if (cardsContainer.value) {
        cardsContainer.value.addEventListener('wheel', handleWheel);
    }
});

onUnmounted(() => {
    stopAutoScroll();
    if (cardsContainer.value) {
        cardsContainer.value.removeEventListener('wheel', handleWheel);
    }
});
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body,
#app {
    font-family: 'Microsoft YaHei', Arial, sans-serif;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.container {
    display: flex;
    min-height: 100vh;
    position: relative;
    z-index: 1;
}

.products-bg-text1{
    position: absolute;
    top: 6vh;
    left: 60%;
    transform: translateX(-30%);
    font-size: 10em;
    font-weight: 900;
    letter-spacing: 0;
    color: rgba(43,168,239,0.12);
    white-space: nowrap;
    line-height: 1;
    z-index: 0;
    user-select: none;
    pointer-events: none;
}
.products-bg-text2{
    position: absolute;
    top: 70vh;
    left: 10%;
    transform: translateX(-30%);
    font-size: 10em;
    font-weight: 900;
    letter-spacing: 0;
    color: rgba(43,168,239,0.12);
    white-space: nowrap;
    line-height: 1;
    z-index: 0;
    user-select: none;
    pointer-events: none;
}
.top-apps {
    position: absolute;
    top: 12vh;
    left: 5vw;
    display: flex;
    gap: 4vw;
    z-index: 10;
}

.app-icon {
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 6px 6px 40px 0px #2BA8EFE5;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.app-icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.app-icon.active {
    scale: 1.3;
}

.app-icon img {
    width: 5vw;
    height: 5vw;
    object-fit: contain;
}

/* 错落效果：每个按钮高度不同 */
.app-icon:nth-child(1) {
    transform: translateY(5px);
}

.app-icon:nth-child(2) {
    transform: translateY(0);
}

.app-icon:nth-child(3) {
    transform: translateY(30px);
}

.app-icon:nth-child(4) {
    transform: translateY(6px);
}

.app-icon:nth-child(5) {
    transform: translateY(27px);
}

.app-icon:nth-child(6) {
    transform: translateY(0);
}

.app-icon:nth-child(7) {
    transform: translateY(-8px);
}

.app-icon:nth-child(8) {
    transform: translateY(10px);
}

.app-icon:nth-child(9) {
    transform: translateY(24px);
}

.app-icon:nth-child(10) {
    transform: translateY(0);
}

.left-section {
    flex: 1;
    padding: 25vh 4vw 4vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.logo-section {
    margin-bottom: 2vh;
}

.logo-title {
    font-size: 48px;
    font-weight: bold;
    color: #2BA8EF;
    margin-bottom: 20px;
    position: relative;
}

.logo-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #1976d2, #42a5f5);
    border-radius: 2px;
}

.description-text {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    max-width: 500px;
    margin-bottom: 50px;
    /* 超出固定高度时滚动 */
    max-height: 30vh;
    overflow-y: auto;
    padding-right: 8px; /* 预留滚动条空间，避免挤压文字 */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(43, 168, 239, 0.4) transparent; /* Firefox */
    word-break: break-word;
}

.description-text::-webkit-scrollbar {
    width: 6px;
}

.description-text::-webkit-scrollbar-thumb {
    background: rgba(43, 168, 239, 0.4);
    border-radius: 3px;
}

.description-text::-webkit-scrollbar-track {
    background: transparent;
}

.qr-section {
    display: flex;
    gap: 40px;
}

.qr-item {
    text-align: center;
}

.qr-code {
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative;
}

.qr-code::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    background-size: 10px 10px;
    background-position: 0 0, 0 0;
}

.qr-label {
    font-size: 14px;
    color: #1976d2;
    font-weight: 500;
}
.line1{
    position: absolute;
    left: 24vw;
    img{
        width: 22vw;

    }
}
.line2{
    position: absolute;
    right: 1vw;
    bottom: 8vh;
    img{
        width: 5vw;
    }
}
.right-section {
    flex: 1;
    padding: 30vh 4vw 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.search-window {
    width: 48vw;
    flex: 1;
    background: white;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    max-height: 80vh;
}

.window-header {
    background: #3DB9E8;
    color: white;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.header-tabs {
    display: flex;
    gap: 0;
}
.vertical{
    border: solid 0.5px;
    margin: 0 1vw 0 1vw;
}

.tab {
    color: #ffffff;
    padding: 8px 16px;
    font-size: 13px;
    transition: all 0.3s ease;
    border-radius: 8px 8px 0 0;
    position: relative;
    width: 13vw;
    display: flex;
    justify-content: space-between;
    /* ProductView.vue */
    img {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;   /* 防止被拉伸/收缩 */
    object-fit: contain;
}
}


.tab.active {
    background: #79CCEA;
    color: #ffffff;
    z-index: 2;
}


.window-controls {
    display: flex;
    width: 6vw;
    justify-content: space-between;
    align-items: center;    
}

.control-btn {
    display: flex;
    align-items: center;
}

.search-bar {
    padding: 20px;
    background: white;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.search-icon {
    font-size: 18px;
    color: #666;
}

.search-input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
    background: #f8f9fa;
}

.search-input:focus {
    border-color: #3DB9E8;
    background: white;
}

.clear-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    transition: background 0.3s ease;
}

.clear-btn:hover {
    background: #ccc;
}

.search-results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 20px;
    max-height: 48vh;
    overflow-y: auto;
    background: white;
    border: solid #16ACE2;
    border-radius: 10px;
    border-width: 0 12px 12px 12px;
}
/* 右侧搜索结果滚动条为蓝色 */
.search-results::-webkit-scrollbar { width: 8px; }
.search-results::-webkit-scrollbar-thumb { background: #2BA8EF; border-radius: 4px; }
.search-results::-webkit-scrollbar-track { background: rgba(43,168,239,0.12); }
.search-results { scrollbar-width: thin; scrollbar-color: #2BA8EF rgba(43,168,239,0.12); }

/* 无新闻占位图样式 */
.no-news {
    grid-column: 1 / -1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-news img {
    width: 100%;
    object-fit: contain;
    border-radius: 12px;
    background: #f8fbff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.result-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.result-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.result-image {
    width: 100%;
    height: 100px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.result-title {
    padding: 12px;
    font-size: 13px;
    color: #333;
    line-height: 1.4;
    min-height: 60px;
    display: flex;
    align-items: center;
}



/* 新增的滚动卡片页面样式 */
.product-page {
    display: flex;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fbff 0%, #ffffff 100%);
}
.bg{
    position: absolute;
    top: 10vh;
    z-index: 2;
    img{
        width: 100vw;
    }
}

/* 左侧区域 */
.left-section-new {
    flex: 0 0 55%;
    position: relative;
    background: #CFEEFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: center;
}

.background-text1 {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 120px;
    font-weight: bolder;
    color: rgb(255, 255, 255);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    letter-spacing: 20px;
    line-height: 1;
    z-index: 1;
}
.background-text2 {
    position: absolute;
    top: 50%;
    left: 45vw;
    transform: translateY(-50%);
    font-size: 120px;
    font-weight: bolder;
    color: rgb(255, 255, 255);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    letter-spacing: 20px;
    line-height: 1;
    z-index: 1;
}


.cards-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    z-index: 3;
    position: relative;
}

.cards-container::-webkit-scrollbar {
    display: none;
}

.product-card {
    background: white;
    border-radius: 20px;
    margin-bottom: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(43, 168, 239, 0.15);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    width: 55%;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(43, 168, 239, 0.25);
}

.product-card.active {
    border-color: #2BA8EF;
    background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
    box-shadow: 0 15px 35px rgba(43, 168, 239, 0.3);
}

/* 左右错落效果 */
.product-card:nth-child(odd) {
    margin-left: 10%;
    margin-right: auto;
}

.product-card:nth-child(even) {
    margin-left: auto;
    margin-right: 5%;
}

.card-image {
    width: 100%;
    height: 30vh;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.product-card:hover .card-image img {
    transform: scale(1.05);
}

.card-title {
    font-size: 16px;
    font-weight: 600;
    color: #2BA8EF;
    text-align: center;
    line-height: 1.4;
}

/* 右侧区域 */
.right-section-new {
    flex: 1;
    padding: 14vh 3vw 10vh;
    display: block;
    position: relative; 
    z-index: 2;

}

.content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
align-items: center;
    position: static; 
}

.main-title {
    font-size: 2.3em;
    font-weight: 800;
    color: #2BA8EF;
    margin-bottom: 5vh;
    margin-top: 2vh;
    line-height: 1.2;
    position: relative;
}

.description-text-new {
    font-size: 16px;
    line-height: 1.8;
    color: #2BA8EF;
    margin-bottom: 24px;
    text-align: justify;
    max-width: 600px;
    max-height: 32vh;
    overflow: auto;
    padding-right: 10px;
}
/* 描述区域滚动条为蓝色 */
.description-text-new::-webkit-scrollbar { width: 8px; }
.description-text-new::-webkit-scrollbar-thumb { background: #2BA8EF; border-radius: 4px; }
.description-text-new::-webkit-scrollbar-track { background: rgba(43,168,239,0.12); }
.description-text-new { scrollbar-width: thin; scrollbar-color: #2BA8EF rgba(43,168,239,0.12); }

.description-text-new.rich {
    font-size: 18px;
}


/* 相机样式 */
.camera-area {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40vh;
    z-index: 0;
    pointer-events: none; /* 防止遮挡文字选择/点击 */
}

.camera-mockup {
    position: absolute;
    right: 2vw;
    bottom: -10vh;
    width: 40vw;
    height: 40vh;
    transform: rotate(-4deg);
    filter: drop-shadow(0 16px 30px rgba(0,0,0,0.25));
}

.camera-screen {
    position: absolute;
    /* 根据相机边框透明区域调整以下数值以适配屏幕区域 */
    top: 10px;
    width: 80%;
    height: 80%;
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    z-index: 1;
}

.camera-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    z-index: 2;
}

/* 装饰性曲线 */
.curved-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
}

.curve {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(43, 168, 239, 0.1), rgba(100, 181, 246, 0.1));
}

.curve-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    right: 15%;
    animation: float 6s ease-in-out infinite;
}

.curve-2 {
    width: 200px;
    height: 200px;
    bottom: 20%;
    right: 5%;
    animation: float 8s ease-in-out infinite reverse;
}

.curve-3 {
    width: 150px;
    height: 150px;
    top: 60%;
    left: 10%;
    animation: float 7s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

</style>