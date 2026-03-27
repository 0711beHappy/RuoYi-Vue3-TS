// src/permission.ts
import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usePermissionStore } from '@/store/modules/permission'
// import { useAppStore } from '@/store/modules/app'

// 配置进度条
NProgress.configure({ showSpinner: false })

// 免登录白名单
const whiteList = ['/login', '/404']

// 路径匹配（简单实现，后续再写 validate.ts）
const isPathMatch = (pattern: string, path: string): boolean => {
  return path === pattern
}

const isWhiteList = (path: string): boolean => {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

// 临时模拟 getToken（后续再写 @/utils/auth.ts）
const getToken = (): string | undefined => {
  return localStorage.getItem('token') || undefined
}

// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  const hasToken = getToken()
  // const appStore = useAppStore()
  const permissionStore = usePermissionStore()

  if (hasToken) {
    // 设置页面标题
    if (typeof to.meta.title === 'string') {
      document.title = `${to.meta.title} - 若依管理系统`
    }

    if (to.path === '/login') {
      // 已登录访问登录页 → 重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else if (isWhiteList(to.path)) {
      // 白名单页面直接放行
      next()
    } else {
      // 检查是否已加载路由
      if (permissionStore.routes.length === 0) {
        try {
          // 生成路由（后续这里会先调用 userStore.getInfo()）
          await permissionStore.generateRoutes()
          // 动态添加路由
          permissionStore.addRoutes.forEach(route => {
            router.addRoute(route)
          })
          // hack 确保路由添加完成
          next({ ...to, replace: true })
        } catch (err: any) {
          // 后续替换为 userStore.logOut()
          localStorage.removeItem('token')
          ElMessage.error(err.message || '获取路由失败')
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    // 未登录
    if (isWhiteList(to.path)) {
      next()
    } else {
      // 重定向到登录页，并携带原路径
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
})