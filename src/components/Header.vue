<script setup lang="ts">
import { ref,watch,computed,onMounted,onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const isOnAllInOne = ref(route.path === '/');
const activeHash = ref(route.hash || '#home');

const isBlack = computed(()=>{
    return isOnAllInOne.value;
})

watch(
  () => route.fullPath,
  () => {
    isOnAllInOne.value = route.path === '/';
    activeHash.value = route.hash || '#home';
  }
);

function navigateTo(hash: string){
  // Suppress auto hash updates briefly to avoid fighting with observers
  ;(window as any).__hashSuppressUntil = Date.now() + 1200
  if(route.path !== '/'){
    router.push({ path: '/', hash });
  }else{
    router.push({ hash });
  }
}

function onClickScroll(hash: string){
  // Also set suppression here in case of early returns
  ;(window as any).__hashSuppressUntil = Date.now() + 1200
  // If already on '/', and clicking the same hash, manually scroll
  if(route.path === '/' && route.hash === hash){
    const el = document.querySelector(hash)
    if(el){
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }
  navigateTo(hash);
}

</script>

<template>
    <nav class="homepage-navbar">
        <div class="logo">
            <div class="logo-item">
                <img src="/svg/ziqiang.svg" alt="" class="ziqiangsvg">
            </div>
           

        </div>
        <ul class="header">
            <li>
                <a @click.prevent="onClickScroll('#home')" :class="{ 'active': isOnAllInOne && activeHash === '#home' }" class="header-item" href="#home">首页</a>
            </li>
            <li>
                <a @click.prevent="onClickScroll('#about')" :class="{ 'active': isOnAllInOne && activeHash === '#about' }" class="header-item" href="#about">关于自强</a>
            </li>
            <li>
                <a @click.prevent="onClickScroll('#product')" :class="{ 'active': isOnAllInOne && activeHash === '#product' }" class="header-item" href="#product">产品活动</a>
            </li>
            <li>
                <a @click.prevent="onClickScroll('#department')" :class="{ 'active': isOnAllInOne && activeHash === '#department' }" class="header-item" href="#department">组织介绍</a>
            </li>
            <li>
                <a @click.prevent="onClickScroll('#join')" :class="{ 'active': isOnAllInOne && activeHash === '#join' }" class="header-item" href="#join">加入我们</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="less">

nav {
    width: 100%;
    position: fixed;
    background-color: #ffffffb8;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    .logo{
        height: 10vh;
        display: flex;
        align-items: center;
        margin-left: 3vw;
        .ziqiangsvg{
            height: 4vh;
            margin: 1.5vh;
        }
        .br1{
            height: 0;
            width: 50vw;
            border: solid 1px #37a7e8;
        }
    }

    .header {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        list-style: none;
        height: 7vh;
        width: 40vw;
        align-items: center;
        margin-right: 2vw;
        .header-item {
            cursor: pointer;
            color: #2BA8EF;
            font-size: 1.3em;
            font-weight: 400;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .header-item:hover {
            color: #37a7e8;
            font-weight: bold;
        }

        .active {
            font-weight: bold;
            color: #37a7e8;

            
            &::before {
                content: '「';
                color: #37a7e8;
                font-weight: bold;
            }
            
            &::after {
                content: '」';
                color: #37a7e8;
                font-weight: bold;
            }
        }
        
    }
}
</style>
