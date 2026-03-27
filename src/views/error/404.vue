<script setup lang="ts">
import { computed } from 'vue'

const message = computed(() => {
  return '找不到网页！'
})
</script>

<template>
  <div class="wscn-http404-container flex items-center justify-center min-h-screen">
    <div class="wscn-http404 w-full max-w-[1200px] px-4 md:px-8 flex flex-col md:flex-row items-center justify-center">
      <!-- 404 图片区域 -->
      <div class="pic-404 relative w-full md:w-[600px] overflow-hidden mb-8 md:mb-0">
        <img class="pic-404__parent w-full" src="@/assets/404_images/404.png" alt="404">
        <img class="pic-404__child left absolute w-20" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid absolute w-11" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right absolute w-15" src="@/assets/404_images/404_cloud.png" alt="404">
      </div>
      <!-- 文字区域 -->
      <div class="bullshit w-full md:w-[300px] overflow-hidden text-center md:text-left">
        <div class="bullshit__oops text-2xl font-bold text-[#1482f0] mb-5">
          404错误!
        </div>
        <div class="bullshit__headline text-lg font-bold text-gray-800 mb-2">
          {{ message }}
        </div>
        <div class="bullshit__info text-sm text-gray-500 mb-8 leading-relaxed">
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        </div>
        <div class="flex justify-center md:justify-start">
          <router-link to="/index" class="bullshit__return-home block w-[110px] h-9 bg-[#1482f0] rounded-full text-center text-white text-sm leading-9 cursor-pointer">
            返回首页
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wscn-http404-container {
  // 去掉绝对定位，改用 flex 居中，适配所有屏幕
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wscn-http404 {
  // 最大宽度 1200px，小屏幕自动适配
  max-width: 1200px;
  width: 100%;
}

.pic-404 {
  &__child {
    opacity: 0;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-duration: 2s;

    &.left {
      top: 17px;
      left: 220px;
      animation-name: cloudLeft;
      animation-delay: 1s;
    }

    &.mid {
      top: 10px;
      left: 420px;
      animation-name: cloudMid;
      animation-delay: 1.2s;
    }

    &.right {
      top: 100px;
      left: 500px;
      animation-name: cloudRight;
      animation-delay: 1s;
    }
  }
}

@keyframes cloudLeft {
  0% { top: 17px; left: 220px; opacity: 0; }
  20% { top: 33px; left: 188px; opacity: 1; }
  80% { top: 81px; left: 92px; opacity: 1; }
  100% { top: 97px; left: 60px; opacity: 0; }
}

@keyframes cloudMid {
  0% { top: 10px; left: 420px; opacity: 0; }
  20% { top: 40px; left: 360px; opacity: 1; }
  70% { top: 130px; left: 180px; opacity: 1; }
  100% { top: 160px; left: 120px; opacity: 0; }
}

@keyframes cloudRight {
  0% { top: 100px; left: 500px; opacity: 0; }
  20% { top: 120px; left: 460px; opacity: 1; }
  80% { top: 180px; left: 340px; opacity: 1; }
  100% { top: 200px; left: 300px; opacity: 0; }
}

.bullshit {
  &__oops,
  &__headline,
  &__info,
  &__return-home {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  &__oops { animation-delay: 0s; }
  &__headline { animation-delay: 0.1s; }
  &__info { animation-delay: 0.2s; }
  &__return-home { animation-delay: 0.3s; }
}

@keyframes slideUp {
  0% { transform: translateY(60px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>