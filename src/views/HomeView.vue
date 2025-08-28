<script setup lang="ts">
</script>

<template>
  <div class="home-view">
    <img src="/img/homeView/left.png" alt="home-bg" class="home-bg1">
    <img src="/img/homeView/right.png" alt="home-bg" class="home-bg2">

    <!-- 右侧文案与标识叠层 -->
    <div class="hero-right">

      <div class="slogan">
        <div class="top">
          <div class="slogan1">
            <div class="line big">自从有你</div>
            <div class="line big">我们更强</div>
          </div>
          <div class="slogan2">
            <div class="line sub">服务学生生活</div>
            <div class="line sub">记录学校发展</div>
          </div>
        </div>
        <div class="line sub">做有趣有品质的互联网产品</div>
        <div class="org">自强网络文化工作室</div>

        <div class="divider"></div>
      <div class="studio">studio</div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.home-view {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}

.home-bg1 {
  position: absolute;
  top: -5vh;
  left: 0;
  width: 60%;
}

.home-bg2 {
  position: absolute;
  right: 0;
  height: 100%;
}

/* 右侧文案层 */
.hero-right {
  position: absolute;
  right: 0;
  top: 15vh;
  height: 100%;
  display: flex;
  padding: 0 3vw;
  color: #fff;
}


.slogan {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  text-align: left;
  align-items: flex-end;
}

.top {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.line.big {
  font-size: clamp(28px, 3.2vw, 56px);
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 8px 24px rgba(0, 0, 0, .18);
  padding: 0 5px 0 0;
}

.line.sub {
  font-size: 1.4em;
  opacity: .95;
  padding-left: 10px;
}

.divider {
  width: 100%;
  height: 2px;
  margin: 1.2vh 0;
  background: rgba(255, 255, 255, .75);
}

.org {
  font-size: clamp(20px, 2.2vw, 36px);
  font-weight: 800;
  letter-spacing: 2px;
}

/* studio 小字 */
.studio {

  padding-right: 3vw;
  letter-spacing: 1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .9);
  font-weight: 800;

  font-size: clamp(1.2em, 1vw, 1.4em);
}

/* 响应式 */
@media (max-width: 1024px) {
  .home-bg1 {
    width: 70%;
  }

  .hero-right {
    width: 58vw;
  }

  .z-logo {
    width: 34vw;
    right: 4vw;
  }
}

@media (max-width: 768px) {
  .home-bg1 {
    width: 100%;
    top: 0;
  }

  .home-bg2 {
    opacity: .85;
  }

  .hero-right {
    width: 100vw;
    padding: 0 6vw;
    align-items: flex-start;
  }

  .z-logo {
    width: 54vw;
    right: -4vw;
    top: 6vh;
    opacity: .18;
  }

  .slogan {
    margin-top: 14vh;
  }

  .divider {
    width: 60%;
  }

  .studio {
    right: 6vw;
  }
}
</style>