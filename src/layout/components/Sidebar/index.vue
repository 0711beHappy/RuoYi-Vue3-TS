<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)
const routes = computed(() => appStore.routes)
</script>

<template>
  <div class="sidebar-container" :class="[isCollapse ? 'w-16' : 'w-[200px]']">
    <Logo />
    <div class="sidebar-menu mt-4 overflow-y-auto h-[calc(100vh-50px)]">
      <SidebarItem :routes="routes" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1f2937;
  color: white;
  transition: width 0.3s ease;
}
</style>