<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const username = ref('admin')
const password = ref('123456')

const login = () => {
  ElMessage.success('登录成功')
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="w-96 rounded-lg bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold">若依后台管理</h2>
      <el-input v-model="username" placeholder="用户名" class="mb-4" />
      <el-input v-model="password" placeholder="密码" type="password" class="mb-6" />
      <el-button type="primary" round block @click="login">登录</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

