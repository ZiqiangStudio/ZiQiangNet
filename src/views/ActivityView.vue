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
<template>
    <!-- 新增的滚动卡片页面 -->
    <div class="product-page">
        <!-- 左侧滚动卡片区域 -->
        <div class="bg"><img src="/img/activity/activitybg.png" alt=""></div>
        <div class="left-section-new">
            <div class="background-text1">ACTIVITIES</div>
            <div class="cards-container" ref="cardsContainer">
                <div v-for="(product, index) in productsData.technologyProducts" :key="product.name"
                    class="product-card" :class="{ active: selectedIndex === index }" @click="selectProductNew(index)">
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
                        <div class="camera-screen"
                            :style="{ backgroundImage: 'url(' + fixImg(secondImg(selectedProductNew.image) || firstImg(selectedProductNew.image)) + ')' }">
                        </div>
                        <img class="camera-frame" src="/img/activity/camera.png" alt="camera frame" />
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<style lang="less" scoped>
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
    bottom: -7vh;
    width: 40vw;
    height: 40vh;
    transform: rotate(-4deg);
}

.camera-screen {
    position: absolute;
    top: 0;
    left: 0;
    /* 与相机边框左上角对齐，尺寸一致 */
    width: 80%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    z-index: 1;
}

.camera-frame {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
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