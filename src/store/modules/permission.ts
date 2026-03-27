import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'

interface PermissionState {
  routes: any[]
  addRoutes: any[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routes: [], //（侧边栏的所有路由）
    addRoutes: []
  }),

  actions: {
    // 生成路由
    async generateRoutes() {
      this.routes = constantRoutes // 目前先把静态路由直接赋值（后面再加权限过滤）
      this.addRoutes = constantRoutes
      return constantRoutes
    }
  }
})