<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
</script>

<template>
  <div class="flex items-center justify-center w-[200px] h-[50px] bg-gray-800">
    <h2 v-if="!isCollapse" class="text-white text-lg font-bold">若依管理系统</h2>
    <h2 v-else class="text-white text-lg font-bold">RY</h2>
  </div>
</template>

<style lang="scss" scoped></style>