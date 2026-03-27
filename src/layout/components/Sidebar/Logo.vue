<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import logo from '@/assets/logo/logo.png'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
</script>

<template>
  <div class="flex items-center justify-center w-[200px] h-[50px] bg-[#1a1f2e]">
    <img :src="logo" class="w-[30px] h-[30px] mr-[12px] align-middle" alt="" />
    <h1 v-if="!isCollapse" class="text-white text-[14px] font-semibold font-[Avenir,Helvetica Neue,Arial,Helvetica,sans-serif]">若依管理系统</h1>
    <h1 v-else class="text-white text-[14px] font-semibold font-[Avenir,Helvetica Neue,Arial,Helvetica,sans-serif]">RY</h1>
  </div>
</template>

<style lang="scss" scoped></style>