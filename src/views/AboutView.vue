<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()

const selectedIndex = ref(0)
const selectedItem = ref({})

// 模拟部门数据
const department = ref([
    { id: 0, name: "部门1" },
    { id: 1, name: "部门2" },
    { id: 2, name: "部门3" }
])

function itemClicked(departmentItems) {
    selectedIndex.value = departmentItems.id;
    selectedItem.value = departmentItems;
    console.log(selectedItem.value)
}

const groupDetail = (id) => {
    console.log(id)
    router.push(`/about/${id}`)
}
onMounted(() => {
    selectedIndex.value = 0;
    selectedItem.value = department.value[0];
})
</script>
<template>
    <div class="about1">
        <!-- 大字背景装饰 -->
        <div class="about-bg-text about-bg-text-about">ABOUT</div>
        <div class="about-bg-text about-bg-text-us">US</div>
        <section class="about-part1">
            <div class="part1-title-box">
                <p class="part1-title">创立于2000</p>
                <p class="part1-title">始创于自强网站</p>
                <img src="/svg/blueline.svg" alt="">
            </div>
            <div class="part1-content-box">
                <!-- <img src="/svg/aboutrtline.svg" alt="" class="bgline1"> -->
                <div class="content-box">
                    <div class="little-title-bg">
                        <span class="little-title-text">曾获得</span>
                    </div>
                    <ul>
                        <li class="content">全国高校百佳网站评选位列<span>前十</span></li>
                        <li class="content">十佳思政类网站</li>
                        <li class="content">十佳高校共建网站</li>
                        <li class="content">旗下受众<span>10w+</span></li>
                    </ul>

                </div>
                <div class="content-box">
                    <div class="little-title-bg">
                        <span class="little-title-text">共设有</span>
                    </div>
                    <ul>
                        <li class="content"><span>5</span>大中心</li>
                        <li class="content"><span>16</span>部门</li>
                    </ul>
                </div>
                <div class="content-box">
                    <div class="little-title-bg">
                        <span class="little-title-text">直属于</span>
                    </div>
                    <ul>
                        <li class="content">武汉大学<span>党委学生工作部</span>的<span>校级</span>学生组织</li>
                    </ul>
                </div>
                <!-- <img src="/svg/aboutlbline.svg" alt="" class="bgline2"> -->
            </div>
        </section>

    </div>
</template>
<style scoped lang="less">
.about1 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    // 大字背景装饰
    .about-bg-text {
        position: absolute;
        color: #2BA8EF33;
        opacity: 0.7;
        font-weight: 900;
        font-family: 'Arial Black', Arial, sans-serif;
        pointer-events: none;
        user-select: none;
        z-index: 0;
        line-height: 1;
        white-space: nowrap;
    }

    .about-bg-text-about {
        top: 2vh;
        left: 0;
        font-size: 18vw;
        letter-spacing: 0.05em;
    }

    .about-bg-text-us {
        bottom: 0;
        right: 2vw;
        font-size: 18vw;
        letter-spacing: 0.1em;
    }

    .about-part1 {
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        z-index: 1;

        .part1-title-box {
            width: 100%;
            margin-top: 10vh;

            .part1-title {
                color: rgb(0, 0, 0);
                font-weight: 400;
                font-size: 2.8rem;
                text-align: center;
                line-height: 1.2;
            }

            img {
                width: 100%;
                position: absolute;
                top: 0;
                margin-top: 14vh;
            }
        }

        .part1-content-box {
            margin-top: 6vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
            transform: translateX(-3vw);
            flex-wrap: wrap;
            z-index: 2;

            .bgline1 {
                width: 30%;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateY(-6vh);
            }

            .bgline2 {
                position: absolute;
                bottom: 0;
                left: 0;
                transform: translate(8vw, 4vh);
            }

            .content-box {
                max-width: 25vw;
                min-width: 220px;
                padding-left: 6vw;
                display: flex;
                flex-direction: row;
                margin-bottom: 2vh;

                .little-title-bg {
                    background-color: #00BCFA;
                    height: 8em;
                    width: 3em;
                    position: relative;
                    margin-right: 1em;
                    border-radius: 0.5em;
                    display: flex;
                }

                .little-title-text {
                    writing-mode: vertical-rl;
                    color: rgb(0, 0, 0);
                    font-size: 2rem;
                    letter-spacing: 6px;
                    position: absolute;
                    right: -0.26em;
                    bottom: -0.4em;
                    background: transparent;
                    padding: 0;
                    line-height: 1;
                    white-space: nowrap;
                }

                ul {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: rgb(0, 0, 0);
                    font-size: 1.5rem;

                    li {
                        margin-bottom: 1vh;
                        transition: all 0.4s ease;
                    }

                    li:hover {
                        scale: 1.1;
                        color: #00BCFA;
                    }

                    span {
                        font-size: 2rem;
                        color: #EF8D8D;
                    }
                }
            }
        }
    }

    // 响应式优化
    @media (max-width: 900px) {

        :root,
        html {
            font-size: 15px;
        }

        .about-bg-text-about {
            font-size: 24vw;
        }

        .about-bg-text-us {
            font-size: 18vw;
        }

        .about-part1 .part1-title-box .part1-title {
            font-size: 2.1rem;
        }

        .about-part1 .part1-content-box {
            flex-direction: column;
            align-items: center;
            transform: none;
        }

        .about-part1 .part1-content-box .content-box {
            max-width: 90vw;
            padding-left: 0;
            margin-bottom: 3vh;
        }

        .about-part1 .part1-content-box .content-box .little-title {
            font-size: 1.4rem;
            height: 6em;
        }

        .about-part1 .part1-content-box .content-box ul {
            font-size: 1.2rem;
        }

        .about-part1 .part1-content-box .content-box ul span {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 600px) {

        :root,
        html {
            font-size: 13px;
        }

        .about-bg-text-about {
            font-size: 32vw;
            top: 1vh;
        }

        .about-bg-text-us {
            font-size: 24vw;
            right: 0;
        }

        .about-part1 .part1-title-box .part1-title {
            font-size: 1.5rem;
        }

        .about-part1 .part1-content-box .content-box {
            min-width: 0;
            font-size: 1em;
        }

        .about-part1 .part1-content-box .content-box .little-title {
            font-size: 1.1rem;
            height: 4em;
        }

        .about-part1 .part1-content-box .content-box ul {
            font-size: 1rem;
        }

        .about-part1 .part1-content-box .content-box ul span {
            font-size: 1.2rem;
        }
    }
}
</style>