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
    <div class="about2">
        <!-- 历史时间线页面 -->
        <div class="history-timeline">
            <!-- 背景装饰 -->
            <div class="history-bg">
                <div class="bg-shapes">
                    <div class="shape shape-1"></div>
                    <div class="shape shape-2"></div>
                    <div class="shape shape-3"></div>
                    <div class="shape shape-4"></div>
                    <div class="shape shape-5"></div>
                </div>
                <!-- 大字背景装饰 -->
                <div class="history-bg-text history-bg-text-hist"><img src="/svg/history/左上.svg" alt=""></div>
                <div class="history-bg-text history-bg-text-ory"><img src="/svg/history/右下.svg" alt=""></div>
                <div class="history-bg-text history-bg-text-love"><img src="/svg/history/爱心.svg" alt="" style="height: 20vh;"></div>
            </div>

            <!-- 虚线时间线 -->
            <div class="timeline-line">
                <img src="/svg/history/虚线.svg" alt="时间线" class="dashed-line">
            </div>

            <!-- 时间节点 -->
            <div class="timeline-nodes">
                <!-- 2000年节点 -->
                <div class="timeline-node node-2000">
                    <div class="content">
                        <p>自强学堂网站创立,网站以"服务学生生活,记录学校发展"为宗旨,并作为武汉大学思想政治教育进网络的阵地,为广大师生提供新闻资讯、电影、音乐、视频、思政教育、无线服务等一系列网络资源。
                        </p>
                    </div>
                    <div class="year">2000</div>
                    <img src="/svg/history/年份标记.svg" alt="年份标记" class="heart-icon">

                    <div class="icon">
                        <img src="/svg/history/鱼群1.svg" alt="鱼群" class="fish-icon">
                    </div>
                </div>

                <!-- 2009年节点 -->
                <div class="timeline-node node-2009" style="display: flex;flex-direction: row;gap: 20px;">
                    <div class="icon" style="display: flex;flex-direction: column;">
                        <img src="/svg/history/年份标记.svg" alt="年份标记" class="heart-icon">
                        <div class="year">2009 </div>   
                    </div>
                    <div class="content">
                        <p>针对校园无线服务平台,自强Studio 推出"掌上武大"产品,作为自强网八 大子网之一,并横跨飞信短信推送到微信公众平台,致力于成为武大学子提供最贴心的信息服务。</p>
                    </div>
                </div>

                <!-- 2013年节点 -->
                <div class="timeline-node node-2013">
                    <div class="content" style="width: 27vw;">
                        <p>掌上武大APP安卓版正式上线,涵盖课表查询、无线WIFI服务、新闻推送功能、校车定位服务以及空闲教室查询等功能,一经上线,下载量迅速突破1万大关。此后掌上武大全面转型公众号运营,和此后孵化而成的WHU自强淘课啦、吃乎公众号并列成为运营中心三大拳头产品。
                        </p>
                    </div>

                    <div class="icon">
                        <img src="/svg/history/年份标记.svg" alt="年份标记" class="heart-icon" style="transform: translate(-2vw,1vh);">
                        <div class="year">2013</div>


                    </div>
                </div>

                <!-- 2023年节点 -->
                <div class="timeline-node node-2023">
                    <div class="icon">
                        <img src="/svg/history/年份标记.svg" alt="年份标记" class="heart-icon">
                        <img src="/svg/history/帆船.svg" alt="帆船" class="ship-icon" style="transform: translate(10vh,0);">
                    </div>
                    <div class="year">2023</div>
                    <div class="content">
                        <p>掌上武大关注量首次突破10W+,淘课啦社群蓬勃发展,日活跃人数达3000+,自强线下品牌活动进一步拓展,参与人数平均超过1000+,自强 Studio正以昂扬的姿态蓬勃发展。</p>
                    </div>
                    
                </div>
            </div>

            <!-- 装饰元素 -->
            <div class="decorative-elements">
                <div class="small-shape small-shape-1"></div>
                <div class="small-shape small-shape-2"></div>
                <div class="small-shape small-shape-3"></div>
                <div class="small-shape small-shape-4"></div>
                <div class="small-shape small-shape-5"></div>
                <div class="small-shape small-shape-6"></div>
            </div>
        </div>
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

.about2 {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #2BA8EF 0%, #1E88C5 100%);
    overflow: hidden;

    .history-timeline {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .history-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;

            .bg-shapes {
                position: absolute;
                width: 100%;
                height: 100%;

                .shape {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    filter: blur(20px);
                }

                .shape-1 {
                    width: 300px;
                    height: 300px;
                    top: 10%;
                    left: 10%;
                    animation: float 6s ease-in-out infinite;
                }

                .shape-2 {
                    width: 200px;
                    height: 200px;
                    top: 60%;
                    right: 15%;
                    animation: float 8s ease-in-out infinite reverse;
                }

                .shape-3 {
                    width: 250px;
                    height: 250px;
                    bottom: 20%;
                    left: 20%;
                    animation: float 7s ease-in-out infinite;
                }

                .shape-4 {
                    width: 180px;
                    height: 180px;
                    top: 30%;
                    right: 30%;
                    animation: float 9s ease-in-out infinite reverse;
                }

                .shape-5 {
                    width: 220px;
                    height: 220px;
                    bottom: 40%;
                    right: 5%;
                    animation: float 5s ease-in-out infinite;
                }
            }

            .history-bg-text {
                position: absolute;

                img {
                    width: 42vw;
                    height: 100%;
                }
            }

            .history-bg-text-hist {
                top: 0;
                left: 0;
                transform: translate(-3%, -4%);
            }

            .history-bg-text-ory {
                bottom: 0;
                right: 0;
                transform: translate(3%, 6.4%);

            }
            .history-bg-text-love {
                top: 23vh;
                left: 4vw;
                transform: translate(3%, 6.4%);

            }
        }

        .timeline-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;

            .dashed-line {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .timeline-nodes {
            position: relative;
            z-index: 3;
            width: 100%;
            height: 100%;

            .timeline-node {
                position: absolute;
                opacity: 0;
                transform: translateY(50px);
                animation: fadeInUp 1s ease-out forwards;

                .year {
                    display: inline-block;
                    font-size: 3.5rem;
                    font-weight: 500;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                    margin-bottom: 1vh;
                    line-height: 1.2;
                    margin-left: 5%;
                }

                .content {
                    width: 20vw;
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 1vh 1vw;
                    border: 1px solid rgba(255, 255, 255, 0.2);

                    p {
                        color: white;
                        font-size: 1.1em;
                        line-height: 1.6;
                        margin: 0;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                    }
                }

                .icon {
                    margin-left: 2vw;
                    transition: all 0.3s ease;

                    img {
                        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
                    }
                    .fish-icon{
                        transform: translateX(50%);
                    }


                }
            }

            .node-2000 {
                animation-delay: 0.2s;
                bottom: 0%;
                left: 2%;

                .icon {
                    top: -30px;
                    right: -30px;
                }
            }

            .node-2009 {
                animation-delay: 0.4s;
                bottom: 10%;
                left: 30%;

                .icon {
                    top: -25px;
                    left: -25px;
                }
            }

            .node-2013 {
                animation-delay: 0.6s;
                top: 12%;
                left: 35%;

                .icon {
                    bottom: -30px;
                    right: -30px;
                }
            }

            .node-2023 {
                animation-delay: 0.8s;
                top: 20%;
                right: 5%;

                .icon {
                    bottom: -25px;
                    left: -25px;
                }
            }
        }

        .decorative-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;

            .small-shape {
                position: absolute;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                animation: float 4s ease-in-out infinite;
            }

            .small-shape-1 {
                width: 20px;
                height: 20px;
                top: 20%;
                left: 30%;
                animation-delay: 0s;
            }

            .small-shape-2 {
                width: 15px;
                height: 15px;
                top: 40%;
                right: 25%;
                animation-delay: 1s;
            }

            .small-shape-3 {
                width: 25px;
                height: 25px;
                bottom: 30%;
                left: 40%;
                animation-delay: 2s;
            }

            .small-shape-4 {
                width: 18px;
                height: 18px;
                top: 70%;
                left: 60%;
                animation-delay: 3s;
            }

            .small-shape-5 {
                width: 22px;
                height: 22px;
                bottom: 60%;
                right: 40%;
                animation-delay: 4s;
            }

            .small-shape-6 {
                width: 16px;
                height: 16px;
                top: 50%;
                left: 20%;
                animation-delay: 5s;
            }
        }
    }

    // 动画定义
    @keyframes float {

        0%,
        100% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    // 响应式设计
    @media (max-width: 768px) {
        .history-timeline {
            .timeline-nodes {
                .timeline-node {
                    .year {
                        font-size: 2.5rem;
                    }

                    .content {
                        max-width: 300px;
                        padding: 1.5vh 1.5vw;

                        p {
                            font-size: 0.9rem;
                        }
                    }

                    .icon img {
                        width: 40px;
                        height: 40px;
                    }
                }

                .node-2000 {
                    bottom: 10%;
                    left: 5%;
                }

                .node-2009 {
                    bottom: 40%;
                    right: 5%;
                }

                .node-2013 {
                    top: 30%;
                    left: 10%;
                }

                .node-2023 {
                    top: 10%;
                    right: 5%;
                }
            }
        }
    }

    @media (max-width: 480px) {
        .history-timeline {
            .timeline-nodes {
                .timeline-node {
                    .year {
                        font-size: 2rem;
                    }

                    .content {
                        max-width: 250px;
                        padding: 1vh 1vw;

                        p {
                            font-size: 0.8rem;
                        }
                    }

                    .icon img {
                        width: 35px;
                        height: 35px;
                    }
                }

                .node-2000 {
                    bottom: 8%;
                    left: 3%;
                }

                .node-2009 {
                    bottom: 35%;
                    right: 3%;
                }

                .node-2013 {
                    top: 25%;
                    left: 5%;
                }

                .node-2023 {
                    top: 8%;
                    right: 3%;
                }
            }
        }
    }
}
</style>