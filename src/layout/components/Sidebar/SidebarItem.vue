<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  routes: RouteRecordRaw[]
}>()
</script>

<template>
  <div>
    <div
      v-for="item in routes"
      :key="item.path"
      class="p-2 rounded hover:bg-blue-50 cursor-pointer"
    >
      {{ item.meta?.title || '菜单' }}
    </div>
  </div>
</template>