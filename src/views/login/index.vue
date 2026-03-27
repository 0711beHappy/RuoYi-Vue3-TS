<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const title = import.meta.env.VITE_APP_TITLE || '若依管理系统'
const route = useRoute()
const router = useRouter()

interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
  code: string
  uuid: string
}

const loginForm = ref<LoginForm>({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})

const loginFormRef = ref<FormInstance>()

const loginRules = reactive<FormRules<LoginForm>>({
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
})

const loading = ref(false)
const redirect = ref('')
const captchaCode = ref('')

// 生成随机验证码（纯前端，不用接口）
const generateCaptcha = () => {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTWXYZabcdefhijkmnprstwxyz'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = code
}

watch(
  () => route.query,
  (val) => {
    redirect.value = (val?.redirect as string) || '/'
  },
  { immediate: true }
)

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (!valid) return

    loading.value = true

    if (loginForm.value.rememberMe) {
      Cookies.set('username', loginForm.value.username, { expires: 30 })
      Cookies.set('password', loginForm.value.password, { expires: 30 })
      Cookies.set('rememberMe', loginForm.value.rememberMe.toString(), { expires: 30 })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      ElMessage.success('登录成功')
      router.push({ path: redirect.value || '/index' })
    } catch (error) {
      ElMessage.error('登录失败')
    } finally {
      loading.value = false
      generateCaptcha()
    }
  })
}

const getCookie = () => {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')

  loginForm.value = {
    ...loginForm.value,
    username: username ?? loginForm.value.username,
    password: password ?? loginForm.value.password,
    rememberMe: rememberMe ? Boolean(rememberMe) : false
  }
}

onMounted(() => {
  getCookie()
  generateCaptcha()
})
</script>

<template>
  <div class="login-page min-h-screen flex items-center justify-center bg-cover bg-center relative">
    <!-- 登录卡片 -->
    <div class="w-[400px] bg-white rounded-md p-6 z-10 shadow-md">
      <h3 class="text-center text-[#555] text-lg font-medium mb-6">{{ title }}</h3>

      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="username" class="mb-4">
          <el-input
            v-model="loginForm.username"
            size="large"
            placeholder="账号"
            class="!h-9 !w-[350px]"
          >
            <template #prefix>
              <el-icon class="el-input__icon ml-1 text-gray-400"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password" class="mb-4">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            placeholder="密码"
            class="!h-9 !w-[350px]"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon class="el-input__icon ml-1 text-gray-400"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code" class="mb-4">
          <div class="flex w-[350px] gap-2">
            <div class="w-[220px]">
              <el-input
                v-model="loginForm.code"
                size="large"
                placeholder="验证码"
                class="!h-9 !w-full"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <el-icon class="el-input__icon ml-1 text-gray-400"><Shield /></el-icon>
                </template>
              </el-input>
            </div>
            <div 
              class="w-[128px] h-9 flex items-center justify-center bg-[#f5f5f5] border border-gray-300 cursor-pointer text-sm font-bold tracking-wider text-blue-800"
              @click="generateCaptcha"
            >
              {{ captchaCode }}
            </div>
          </div>
        </el-form-item>

        <!-- 记住我 -->
        <div class="mb-6 text-sm text-[#606266] flex items-center">
          <el-checkbox v-model="loginForm.rememberMe" class="!mr-2"></el-checkbox>
          <span class="pl-2">记住密码</span>
        </div>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            block
            :loading="loading"
            @click="handleLogin"
            class="!h-9 !w-[350px] text-base font-medium bg-[#1890FF] border-[#1890FF]"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部版权 -->
    <div class="fixed bottom-0 w-full h-10 leading-10 text-center text-white text-xs tracking-wider font-['Arial']">
      <span>Copyright © 2018-2026 RuoYi. All Rights Reserved.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-image: url('../../assets/images/login-background.jpg');
  background-size: cover;
  background-position: center;
}

/* 强制覆盖 Element Plus 输入框 wrapper 宽度，确保总宽度 350px */
:deep(.el-input__wrapper) {
  width: 350px !important;
  height: 36px !important;
  padding: 1px 15px !important;
}
</style>