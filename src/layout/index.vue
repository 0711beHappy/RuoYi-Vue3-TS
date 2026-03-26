<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'

const appStore = useAppStore() // 先声明 appStore
const isCollapse = computed(() => appStore.isCollapse) // 再用 appStore
</script>

<template>
  <div class="flex h-screen">
    <!-- 侧边栏 -->
    <div :class="[isCollapse ? 'w-16' : 'w-56', 'bg-white shadow-md transition-all']">
      <Sidebar /> 
    </div>

    <!-- 主内容 -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>